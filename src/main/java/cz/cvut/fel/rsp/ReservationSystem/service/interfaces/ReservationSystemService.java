package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;

public interface ReservationSystemService{
    public void createReservationSystem(User user, ReservationSystem reservationSystem);

    public void addManager(User user, ReservationSystem reservationSystem);
}
