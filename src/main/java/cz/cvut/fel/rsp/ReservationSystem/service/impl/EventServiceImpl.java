package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.EventRepository;
import cz.cvut.fel.rsp.ReservationSystem.exception.EventException;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    private final ReservationSlotServiceImpl reservationSlotService;

    @Override
    @Transactional
    public void createEvent(Event event, Category category) {
        validateEventCreation(event);
        event.setCategory(category);

        if (Objects.isNull(category.getEvents())) {
            category.setEvents(Arrays.asList(event));
        }
        else{
            category.getEvents().add(event);
        }

        eventRepository.save(event);
        reservationSlotService.generateReservationSlots(event);
    }


    public void validateEventCreation(Event event){
        if (!event.getRepetition().equals(Repetition.NONE)){
            if (Objects.isNull(event.getRepeatUntil())){
                throw new EventException("The ending date has to be specified, if the event repeats.");
            }

            if (event.getStartDate().isAfter(event.getRepeatUntil())){
                throw new EventException("The starting date is after the day the event ends");
            }
        }

        if (event.getFromTime().isAfter(event.getToTime())){
            throw new EventException("The starting time of the event is after the ending time");
        }

        if (event.getName().length() == 0){
            throw new EventException("The event name cannot be an empty string");
        }
    }

    @Override
    public void remove(Event event) {

    }

    @Override
    public void update(Event event) {

    }
}
