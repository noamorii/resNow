package cz.cvut.fel.rsp.ReservationSystem.rest.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.CustomTimeEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.IntervalEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.CategoryDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.interfaces.CategoriesController;
import cz.cvut.fel.rsp.ReservationSystem.rest.util.RestUtil;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.CategoryServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.EventServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/v1")
@Slf4j
@RequiredArgsConstructor
public class CategoriesControllerImpl implements CategoriesController {

    private final CategoryServiceImpl categoryService;

    private final EventServiceImpl eventService;

    @Override
    @GetMapping(value = "/categories/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CategoryDTO getById(@PathVariable Integer categoryId) {
        return new CategoryDTO(categoryService.find(categoryId));
    }

    @Override
    @GetMapping(value = "/categories/{categoryName}/events", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EventDTO> getEventsByCategoryName(String categoryName) {
        return eventService.getEventsByCategoryName(categoryName).stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @PostMapping(value = "/categories/{categoryId}/events")
    public ResponseEntity<Void> createEvent(@PathVariable Integer categoryId, @RequestBody EventDTO eventDTO) {
        Category category = categoryService.find(eventDTO.getCategoryId());
        Event event;
        if (eventDTO.getSeatAmount() != null)
            event = new SeatEvent(eventDTO);
        else if (eventDTO.getMinimalReservationTime() != null)
            event = new CustomTimeEvent(eventDTO);
        else
            event = new IntervalEvent(eventDTO);
        eventService.createEvent(event, category);
        log.info("Created Event {} for category with id {}", event, categoryId);
        final HttpHeaders headers = RestUtil.createLocationHeaderNewUri("events/{eventId}", event.getId());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }
}
