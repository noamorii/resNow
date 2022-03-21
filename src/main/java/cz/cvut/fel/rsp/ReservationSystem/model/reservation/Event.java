package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.EventType;
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
    private LocalTime fromTime;

    @NotNull
    @Column(name = "to_time")
    private LocalTime toTime;

    @NotNull
    private LocalDate startDate;

    private LocalDate repeatUntil;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    @Column(name = "dayName")
    private DayOfWeek day;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    private Repetition repetition;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Enumerated(value = EnumType.STRING)
    @NotNull
    private EventType eventType;
}
