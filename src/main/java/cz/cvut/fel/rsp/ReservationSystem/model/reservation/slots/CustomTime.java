package cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots;

import com.sun.istack.NotNull;

import javax.persistence.Entity;
import java.time.Duration;
import java.time.LocalTime;

@Entity
public class CustomTime extends ReservationSlot{

    @NotNull
    private Duration timeBetweenReservations;

    @NotNull
    private LocalTime start;

    @NotNull
    private LocalTime end;

    public Duration getTimeBetweenReservations() {
        return timeBetweenReservations;
    }

    public void setTimeBetweenReservations(Duration timeBetweenReservations) {
        this.timeBetweenReservations = timeBetweenReservations;
    }

    public LocalTime getStart() {
        return start;
    }

    public void setStart(LocalTime start) {
        this.start = start;
    }

    public LocalTime getEnd() {
        return end;
    }

    public void setEnd(LocalTime end) {
        this.end = end;
    }
}
