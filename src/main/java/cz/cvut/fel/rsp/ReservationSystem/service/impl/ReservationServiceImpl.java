package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.*;
import cz.cvut.fel.rsp.ReservationSystem.exception.ReservationException;
import cz.cvut.fel.rsp.ReservationSystem.exception.ReservationSystemException;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository dao;
    private final ReservationSlotRepository reservationSlotDao;
    private final ReservationSystemRepository reservationSystemDao;
    private final UserRepository userDao;
    private final SourceRepository sourceDao;

    @Autowired
    public ReservationServiceImpl(ReservationRepository dao,
                                  ReservationSlotRepository reservationSlotDao,
                                  ReservationSystemRepository reservationSystemDao,
                                  UserRepository userDao,
                                  SourceRepository sourceDao) {
        this.dao = dao;
        this.reservationSlotDao = reservationSlotDao;
        this.reservationSystemDao = reservationSystemDao;
        this.userDao = userDao;
        this.sourceDao = sourceDao;
    }

    @Override
    public void createReservation(User user, ReservationSlot reservationSlot) {
        Reservation reservation = new Reservation();
        if (user == null) {
            throw new ReservationException("Reservation has to have its user to be created.");
        }
        if (reservationSlot == null) {
            throw new ReservationException("Slot ");
        }
        Reservation helper = dao.findNotCancelledReservationForReservationSlot(reservationSlot.getId());
        if (helper != null && !helper.isCancelled()){
            throw new ReservationSystemException("Slot already has reservation");
        }
        reservation.setUser(user);
        reservation.setReservationSlot(reservationSlot);
        dao.save(reservation);
    }

    @Override
    public void cancelReservation(Reservation reservation) {
        if (reservation == null) {
            throw new ReservationException("Reservation has to be mentioned to cancel.");
        }
        Reservation tmp = dao.findReservationById(reservation.getId());
        tmp.setCancelled(true);
        dao.save(tmp);
    }

    @Override
    public List<Reservation> findAllReservations(User user) {
        return dao.findAllUsersReservations(user);
    }

    @Override
    public List<Reservation> findAllUnpaidReservations(User user) {
        return dao.findAllUsersUnpaidReservations(user.getId());
    }
}
