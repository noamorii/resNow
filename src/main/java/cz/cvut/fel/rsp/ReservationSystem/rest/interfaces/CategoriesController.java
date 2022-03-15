package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.CategoryDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;

import java.util.List;

public interface CategoriesController {
    public CategoryDTO getById(Integer categoryId);

    public List<EventDTO> getEvents(Integer categoryId, Integer fromTimestamp, Integer toTimestamp);
}
