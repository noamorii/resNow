package cz.cvut.fel.rsp.ReservationSystem.rest.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.CategoryDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.interfaces.SourcesController;
import cz.cvut.fel.rsp.ReservationSystem.rest.util.RestUtil;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.SourceServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/v1/")
@Slf4j
@RequiredArgsConstructor
public class SourcesControllerImpl implements SourcesController {

    private final SourceServiceImpl sourceService;

    @Override
    @GetMapping(value = "/sources/{sourceId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SourceDTO getById(@PathVariable Integer sourceId) {
        return new SourceDTO(sourceService.find(sourceId));
    }

    @Override
    public List<EventDTO> getEvents(Integer sourceId, Integer fromTimestamp, Integer toTimeStamp) {
        return null;
    }

    @Override
    @GetMapping(value = "/sources/{sourceId}/categories", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CategoryDTO> getCategories(@PathVariable Integer sourceId) {
        Source source = sourceService.find(sourceId);
        return source.getCategories().stream()
                .map(CategoryDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @PostMapping(value = "/sources/{sourceId}")
    public ResponseEntity<Void> createCategory(@PathVariable Integer sourceId, @RequestBody CategoryDTO categoryDTO) {
       return null;
    }
}
