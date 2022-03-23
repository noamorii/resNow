package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;

public interface CategoryService{
    public void createCategory(Category category, Source source);

    public void addEventToCategory(Event event, Category category);

    public void removeEventFromCategory(Event event, Category category);

    public void update(Category category);

    public void remove(Category toRemove, Category moveEventsTo);
}
