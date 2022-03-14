package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Event;

public interface ReservationSlotService {
    public void generateReservationSlots(Event event);
}
