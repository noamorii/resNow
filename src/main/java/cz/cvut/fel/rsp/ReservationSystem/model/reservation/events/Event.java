package cz.cvut.fel.rsp.ReservationSystem.model.reservation.events;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.EventService;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter @Setter
public abstract class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "course_participant_generator")
    @SequenceGenerator(name = "course_participant_generator",sequenceName = "course_participant_id_seq")
    private Integer id;

    @NotNull
    private String name;

    // Time on the clock, when the event is starting.
    @NotNull
    @Column(name = "from_time")
    private LocalTime fromTime;

    // Time on the clock, when the event is ending.
    @NotNull
    @Column(name = "to_time")
    private LocalTime toTime;

    // Date, when the event takes place for the first time.
    @NotNull
    private LocalDate startDate;

    // Date, until which, the timeslots should be generated.
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

    public abstract void visit(ReservationSlotService reservationSlotService, LocalDate date);

    public abstract void visit(EventService eventService);
}
