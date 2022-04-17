package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.EventDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SlotDTO;

import java.util.List;

public interface EventsController {
    // GET /events/{event_id}
    public EventDTO getById(Integer eventId);

    // GET /events/{event_id}/slots?from=""&to=""
    public List<SlotDTO> getTimeSlots(Integer eventId, Integer fromTimestamp, Integer toTimestamp);

    // GET /events/{event_id}/reservations?from=""&to""
    public List<ReservationDTO> getReservations(Integer eventId, Integer fromTimestamp, Integer toTimestamp, boolean canceled);
}
