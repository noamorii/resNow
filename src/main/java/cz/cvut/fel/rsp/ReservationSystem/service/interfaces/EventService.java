package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;

public interface EventService {
    public void createEvent(Event event, Category category);

    public void remove(Event event);

    public void update(Event event);
}
