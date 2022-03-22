package cz.cvut.fel.rsp.ReservationSystem.model.reservation.events;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationService;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.time.Duration;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CustomTimeEvent extends Event{

    @NotNull
    private Duration minimalReservationTime;

    @Override
    public void visit(ReservationSlotService reservationSlotService) {
        reservationSlotService.generateReservationSlots(this);
    }
}
