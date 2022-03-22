package cz.cvut.fel.rsp.ReservationSystem.model.reservation.events;

import com.sun.istack.NotNull;
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
public class IntervalEvent extends Event{
    @NotNull
    private Duration intervalDuration;

    @NotNull
    private Duration timeBetweenIntervals;

    @Override
    public void visit(ReservationSlotService reservationSlotService) {
        reservationSlotService.generateReservationSlots(this);
    }
}
