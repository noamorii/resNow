package cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.time.Duration;

@Entity
@Getter @Setter @NoArgsConstructor
public class FixedLengthCustomTime extends CustomTime{

    @NotNull
    private Duration fixedLength;
}
