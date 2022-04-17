package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.CategoryDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SourcesController {
    // /sources/{source_id}
    public SourceDTO getById(Integer sourceId);

    // /sources/{source_id}/events
    public List<EventDTO> getEvents(Integer sourceId, Integer fromTimestamp, Integer toTimeStamp);

    // /sources/{source_id}/categories
    public List<CategoryDTO> getCategories(Integer sourceId);

    // /sources/{source_id}
    public ResponseEntity<Void> createCategory(Integer sourceId, CategoryDTO categoryDTO);
}
