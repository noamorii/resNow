package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter @Setter @NoArgsConstructor
public class Event extends AbstractEntity {

    @NotNull
    private String name;

    @NotNull
    @Column(name = "from_time")
    private LocalTime from;

    @NotNull
    @Column(name = "to_time")
    private LocalTime to;

    @NotNull
    private LocalDate repeatUntil;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    private DayOfWeek day;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    private Repetition repetition;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
