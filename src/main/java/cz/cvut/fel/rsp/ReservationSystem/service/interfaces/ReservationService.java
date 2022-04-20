package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;

import java.util.List;

public interface ReservationService{

    void createReservation(User user, ReservationSlot reservationSlot);

    void cancelReservation(Reservation reservation);

   List<Reservation> findAllReservations(User user);

   List<Reservation> findAllUnpaidReservations(User user);
}
