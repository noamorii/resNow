package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.TimeslotDTO;

import java.util.List;

public interface EventsController {
    public EventDTO getById(Integer eventId);

    public List<TimeslotDTO> getTimeSlots(Integer eventId, Integer fromTimestamp, Integer toTimestamp);

    public List<ReservationDTO> getReservations(Integer eventId, Integer fromTimestamp, Integer toTimestramp, boolean canceled);
}
