package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.*;
import cz.cvut.fel.rsp.ReservationSystem.exception.ReservationException;
import cz.cvut.fel.rsp.ReservationSystem.exception.ReservationSystemException;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;

    private final EventServiceImpl eventServiceImpl;

    @Override
    public void createReservation(User user, ReservationSlot reservationSlot) {
        Reservation reservation = new Reservation();
        if (user == null) {
            throw new ReservationException("Reservation has to have its user to be created.");
        }
        if (reservationSlot == null) {
            throw new ReservationException("Slot ");
        }
        Reservation helper = reservationRepository.findNotCancelledReservationForReservationSlot(reservationSlot.getId());
        if (helper != null && !helper.isCancelled()){
            throw new ReservationSystemException("Slot already has reservation");
        }
        reservation.setUser(user);
        reservation.setReservationSlot(reservationSlot);
        reservationRepository.save(reservation);
    }

    @Override
    public void cancelReservation(Reservation reservation) {
        if (reservation == null) {
            throw new ReservationException("Reservation has to be mentioned to cancel.");
        }
        Reservation tmp = reservationRepository.findReservationById(reservation.getId());
        tmp.setCancelled(true);
        reservationRepository.save(tmp);
    }

    @Override
    public List<Reservation> findAllReservations(User user) {
        return reservationRepository.findAllUsersReservations(user);
    }

    @Override
    public List<Reservation> findAllReservations(User user, LocalDate fromDate, LocalDate toDate) {
        List<Reservation> allReservations = reservationRepository.findAllUsersReservations(user);
        return this.filterReservations(allReservations, fromDate, toDate);
    }

    @Override
    public List<Reservation> findAllUnpaidReservations(User user) {
        return reservationRepository.findAllUsersUnpaidReservations(user.getId());
    }

    @Override
    public List<Reservation> findAllReservations(ReservationSystem reservationSystem) {
        return reservationRepository.findAllReservationsForReservationSystem(reservationSystem.getId());
    }

    @Override
    public List<Reservation> findAllReservations(ReservationSystem reservationSystem, LocalDate from, LocalDate to) {
        List<Reservation> allReservations = this.findAllReservations(reservationSystem);
        return filterReservations(allReservations, from, to);
    }

    /**
     * @param reservations
     * @param fromDate
     * @param toDate
     * @return new list of reservations which are between the given dates (inclusive)
     */
    private List<Reservation> filterReservations(List<Reservation> reservations, LocalDate fromDate, LocalDate toDate){
        List<Reservation> filtered = reservations.stream().
                filter(e -> (e.getReservationSlot().getDate().isEqual(fromDate) || e.getReservationSlot().getDate().isAfter(fromDate))
                        && (e.getReservationSlot().getDate().isEqual(toDate) || e.getReservationSlot().getDate().isBefore(toDate)) )
                .collect(Collectors.toList());

        return filtered;
    }
}
