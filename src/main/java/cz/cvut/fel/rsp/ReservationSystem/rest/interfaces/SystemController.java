package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.Feedback;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationSystemDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;

import java.util.List;

public interface SystemController {
    public List<ReservationSystemDTO> getReservationSystems();

    public ReservationSystemDTO getById(Integer reservationSystemId);

    public List<SourceDTO> getSources(Integer reservationSystemId);

    public List<Feedback> getFeedback(Integer reservationSystemId);
}
