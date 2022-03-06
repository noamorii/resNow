package cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots;

import com.sun.istack.NotNull;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.time.LocalTime;

@Entity
public class Interval extends ReservationSlot{

    @NotNull
    @Temporal(TemporalType.TIME)
    private LocalTime start;

    @NotNull
    @Temporal(TemporalType.TIME)
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
