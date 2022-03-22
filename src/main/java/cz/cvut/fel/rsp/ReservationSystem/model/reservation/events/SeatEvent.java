package cz.cvut.fel.rsp.ReservationSystem.model.reservation.events;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class SeatEvent extends Event{
    @NotNull
    private Integer seatAmount;

    @Override
    public void visit(ReservationSlotService reservationSlotService) {
        reservationSlotService.generateReservationSlots(this);
    }
}
