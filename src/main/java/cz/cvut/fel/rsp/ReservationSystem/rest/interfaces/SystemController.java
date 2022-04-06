package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.Feedback;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationSystemDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SystemController {
    public List<ReservationSystemDTO> getReservationSystems();

    public ReservationSystemDTO getById(Integer systemId);

    public List<SourceDTO> getSources(Integer systemId);

    public List<Feedback> getFeedback(Integer systemId);

    public ResponseEntity<Void> createFeedback(Integer systemId, Feedback feedback);
}
