package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;

public interface ReservationSystemService {
    public void createReservationSystem(User user, String name);

    public void addSource(ReservationSystem reservationSystem, Source source);
}
