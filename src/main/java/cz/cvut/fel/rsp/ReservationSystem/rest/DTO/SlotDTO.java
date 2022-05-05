package cz.cvut.fel.rsp.ReservationSystem.rest.DTO;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SlotDTO {

    private Integer id, price, eventId;
    private LocalDate date;

    public SlotDTO(ReservationSlot slot) {
        this.id = slot.getId();
        this.price = slot.getPrice();
        this.eventId = slot.getEvent().getId();
        this.date = slot.getDate();
    }
}
