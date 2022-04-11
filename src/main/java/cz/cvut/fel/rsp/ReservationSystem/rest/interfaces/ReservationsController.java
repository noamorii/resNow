package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.PaymentDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationDTO;

import java.time.LocalDate;
import java.util.List;

public interface ReservationsController {
    public ReservationDTO getById(Integer reservationId);

    public PaymentDTO getPayment(Integer reservationId);

    public List<ReservationDTO> getAllToday();

    public List<ReservationDTO> getAllForDay(Integer year, Integer month, Integer day);

}
