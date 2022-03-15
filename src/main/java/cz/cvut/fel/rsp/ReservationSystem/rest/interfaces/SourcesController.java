package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.CategoryDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;

import java.util.List;

public interface SourcesController {
    public SourceDTO getById(Integer sourceId);

    public List<EventDTO> getEvents(Integer sourceId, Integer fromTimestamp, Integer toTimeStamp);

    public List<CategoryDTO> getCategories(Integer sourceId);
}
