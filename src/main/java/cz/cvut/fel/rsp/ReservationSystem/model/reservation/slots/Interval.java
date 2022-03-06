package cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots;

import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.LocalTime;

@Entity
public class Interval extends ReservationSlot{

    @NotNull
    @Column(name = "start_time")
    private LocalTime start;

    @NotNull
    @Column(name = "end_time")
    private LocalTime end;

    public LocalTime getEnd() {
        return end;
    }

    public void setEnd(LocalTime end) {
        this.end = end;
    }

    public LocalTime getStart() {
        return start;
    }

    public void setStart(LocalTime start) {
        this.start = start;
    }
}
