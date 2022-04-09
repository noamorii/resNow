package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public interface ReservationService{



    public void createReservation(User user, ReservationSlot reservationSlot);

    public void cancelReservation(Reservation reservation);

    public List<Reservation> findAllCanceled(ReservationSystem reservationSystem, LocalTime from, LocalTime to);

    public List<Reservation> findAllCanceled(Source source, LocalTime from, LocalTime to);
}
