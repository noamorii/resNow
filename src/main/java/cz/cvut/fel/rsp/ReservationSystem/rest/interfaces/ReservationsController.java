package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.PaymentDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationDTO;

public interface ReservationsController {
    public ReservationDTO getById(Integer reservationId);

    public PaymentDTO getPayment(Integer reservationId);
}
