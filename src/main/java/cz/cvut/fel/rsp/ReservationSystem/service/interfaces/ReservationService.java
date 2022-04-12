package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface ReservationService{



    public void createReservation(User user, ReservationSlot reservationSlot);

    public void cancelReservation(Reservation reservation);

    List<Reservation> findAllReservations(User user);

    List<Reservation> findAllUnpaidReservations(User user);
}
