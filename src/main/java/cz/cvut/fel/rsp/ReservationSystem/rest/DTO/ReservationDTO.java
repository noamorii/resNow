package cz.cvut.fel.rsp.ReservationSystem.rest.DTO;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.payment.Payment;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Getter
@Setter
public class ReservationDTO {
    private Integer userId;

    private Integer paymentId; // null if not paid

    private Integer reservationSlotId;

    private boolean cancelled;

    private String additionalInfo;

    public ReservationDTO(Reservation reservation) {
        this.userId = reservation.getUser().getId();
        this.paymentId = reservation.getPayment() != null ? reservation.getPayment().getId() : null;
        this.reservationSlotId = reservation.getReservationSlot().getId();
        this.cancelled = reservation.isCancelled();
        this.additionalInfo = reservation.getAdditionalInfo();
    }
}
