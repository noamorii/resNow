package cz.cvut.fel.rsp.ReservationSystem.rest.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.Feedback;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationSystemDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.interfaces.SystemController;
import cz.cvut.fel.rsp.ReservationSystem.rest.util.RestUtil;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.*;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/v1/")
@Slf4j
@RequiredArgsConstructor
public class SystemControllerImpl implements SystemController {

    private final ReservationSystemServiceImpl reservationSystemService;

    private final ReservationServiceImpl reservationService;

    private final FeedbackServiceImpl feedbackService;

    private final SourceServiceImpl sourceService;

    private final EventServiceImpl eventService;

    @Override
    @GetMapping(value = "/systems", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ReservationSystemDTO> getReservationSystems() {
        return reservationSystemService.findAll().stream()
                .map(ReservationSystemDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @GetMapping(value = "/systems/{systemId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ReservationSystemDTO getById(@PathVariable Integer systemId) {
        return new ReservationSystemDTO(reservationSystemService.find(systemId));
    }

    @Override
    @GetMapping(value = "/systems/{systemId}/sources", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SourceDTO> getSources(@PathVariable Integer systemId) {
        ReservationSystem reservationSystem = reservationSystemService.find(systemId);

        return reservationSystemService.getSources(reservationSystem).stream()
                .map(SourceDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @GetMapping(value = "/systems/{systemId}/feedback", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Feedback> getFeedback(@PathVariable Integer systemId) {
        List<Feedback> feedbackList = reservationSystemService.find(systemId).getFeedback();

        return Objects.isNull(feedbackList) ? new ArrayList<>() : feedbackList;
    }

    @Override
    @PostMapping(value = "/systems/{systemId}/feedback")
    public ResponseEntity<Void> createFeedback(@PathVariable Integer systemId, @RequestBody Feedback feedback) {
        ReservationSystem reservationSystem = reservationSystemService.find(systemId);
        feedbackService.createFeedback(feedback, reservationSystem);
        log.info("Created feedback for system with id {} with following message: {}", systemId, feedback.getMessage());
        final HttpHeaders headers = RestUtil.createLocationHeaderFromCurrentUri("/{feedbackId}", feedback.getId());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @Override
    @PostMapping(value = "/systems/{systemId}/sources")
    public ResponseEntity<Void> createSource(@PathVariable Integer systemId, @RequestBody SourceDTO sourceDTO) {
        ReservationSystem reservationSystem = reservationSystemService.find(systemId);
        Source source = new Source(sourceDTO);
        sourceService.createSource(source, reservationSystem);
        log.info("Created source {} for system with id {}.", source, systemId);
        final HttpHeaders headers = RestUtil.createLocationHeaderNewUri("/sources/{sourceId}", source.getId());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @Override
    @GetMapping(value = "/systems/{systemId}/reservations")
    public List<ReservationDTO> getAllReservationsFromTo(@PathVariable Integer systemId,
                                                         @RequestParam(name = "fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
                                                         @RequestParam(name = "toDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate toDate) {
        ReservationSystem reservationSystem = reservationSystemService.find(systemId);
        List<Reservation> reservations = reservationService.findAllReservations(reservationSystem, fromDate, toDate);
        return reservations.stream().map(ReservationDTO::new).collect(Collectors.toList());
    }

    @GetMapping(value = "/systems/{systemId}/events")
    public List<EventDTO> getAllEventsFromTo(@PathVariable Integer systemId,
                                                   @RequestParam(name = "fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
                                                   @RequestParam(name = "toDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate toDate) {
        ReservationSystem reservationSystem = reservationSystemService.find(systemId);
        List<Event> events = eventService.findAllEvents(reservationSystem);
        return events.stream().map(EventDTO::new).collect(Collectors.toList());
    }
}
