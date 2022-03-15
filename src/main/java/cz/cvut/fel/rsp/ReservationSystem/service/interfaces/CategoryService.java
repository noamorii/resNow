package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;

import java.util.List;

public interface CategoryService{
    public void createCategory(String categoryName, Source source);

    public void removeCategory(Category category);

    public void addEventToCategory(Event event, Category category);

    public void removeEventFromCategory(Event event, Category category);

    public void update(Category category);

    public void remove(Category toRemove, Category moveEventsTo);
}
