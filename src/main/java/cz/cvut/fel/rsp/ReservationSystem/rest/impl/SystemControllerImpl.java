package cz.cvut.fel.rsp.ReservationSystem.rest.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.Feedback;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationSystemDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.interfaces.SystemController;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.ReservationSystemServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.SourceServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    private final SourceServiceImpl sourceService;

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

        return sourceService.findSources(reservationSystem).stream()
                .map(SourceDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @GetMapping(value = "/systems/{systemId}/feedback", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Feedback> getFeedback(@PathVariable Integer systemId) {
        List<Feedback> feedbackList = reservationSystemService.find(systemId).getFeedback();

        return Objects.isNull(feedbackList) ? new ArrayList<>() : feedbackList;
    }
}
