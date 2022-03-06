package cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots;

import com.sun.istack.NotNull;

import javax.persistence.Entity;
import java.time.Duration;

@Entity
public class FixedLengthCustomTime extends CustomTime{

    @NotNull
    private Duration fixedLength;

    public Duration getFixedLength() {
        return fixedLength;
    }

    public void setFixedLength(Duration fixedLength) {
        this.fixedLength = fixedLength;
    }
}
