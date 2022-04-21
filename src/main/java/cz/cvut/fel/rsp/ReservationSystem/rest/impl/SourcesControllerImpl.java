package cz.cvut.fel.rsp.ReservationSystem.rest.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.CategoryDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.interfaces.SourcesController;
import cz.cvut.fel.rsp.ReservationSystem.rest.util.RestUtil;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.CategoryServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.SourceServiceImpl;
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
@RequestMapping("/rest/v1/")
@Slf4j
@RequiredArgsConstructor
public class SourcesControllerImpl implements SourcesController {

    private final SourceServiceImpl sourceService;

    private final CategoryServiceImpl categoryService;

    @Override
    @GetMapping(value = "/sources/{sourceId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SourceDTO getById(@PathVariable Integer sourceId) {
        return new SourceDTO(sourceService.find(sourceId));
    }

    @Override
    public List<EventDTO> getEvents(Integer sourceId, Integer fromTimestamp, Integer toTimeStamp) {
        // TODO: skipped on @belkapre's request
        return new ArrayList<>();
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
    @PostMapping(value = "/sources/{sourceId}/categories")
    public ResponseEntity<Void> createCategory(@PathVariable Integer sourceId, @RequestBody CategoryDTO categoryDTO) {
        Category category = new Category(categoryDTO);
        categoryService.createCategory(category,sourceService.find(sourceId));
        log.info("Created category {} for source with id {}", category, sourceId);
        final HttpHeaders headers = RestUtil.createLocationHeaderNewUri("/categories/{categoryId}", category.getId());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }
}
