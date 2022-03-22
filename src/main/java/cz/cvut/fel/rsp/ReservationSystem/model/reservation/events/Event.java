package cz.cvut.fel.rsp.ReservationSystem.model.reservation.events;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationService;
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

    public abstract void visit(ReservationSlotService reservationSlotService);
}
