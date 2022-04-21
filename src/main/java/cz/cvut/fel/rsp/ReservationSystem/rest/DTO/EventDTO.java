package cz.cvut.fel.rsp.ReservationSystem.rest.DTO;

import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class EventDTO {

    private String name;

    private LocalTime fromTime;

    private LocalTime toTime;

    private LocalDate startDate;

    private LocalDate repeatUntil;

    private DayOfWeek day;

    private Repetition repetition;

    private Integer categoryId;

    // varibles below might be null, because Event is an abstract class
    private Duration minimalReservationTime;

    private Duration intervalDuration;

    private Duration timeBetweenIntervals;

    private Integer seatAmount;
}
