package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.CustomTimeEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.IntervalEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;

import java.util.List;

public interface EventService {
    public void createEvent(Event event, Category category);

    public void remove(Event event);

    public void update(Event event);

    public void validateSpecificEvent(CustomTimeEvent customTimeEvent);

    public void validateSpecificEvent(IntervalEvent intervalEvent);

    public void validateSpecificEvent(SeatEvent seatEvent);

    public List<Event> getAllEvents(Source source);
}
