package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.EventRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.ReservationSlotServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class ReservationSlotServiceImplTest {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ReservationSlotServiceImpl reservationSlotService;

    @Test
    void generateTimeSlots_seatEventWithoutRepetition_seatsGenerated() {
        SeatEvent seatEvent = new SeatEvent();
        seatEvent.setSeatAmount(100);
        seatEvent.setCategory(Mockito.mock(Category.class)); // mocking here might cause problems
        seatEvent.setFromTime(LocalTime.NOON);
        seatEvent.setToTime(LocalTime.MIDNIGHT);
        seatEvent.setStartDate(LocalDate.of(2025, 10, 10));
        seatEvent.setRepetition(Repetition.NONE);
        seatEvent.setName("Ellen Allien balcony");
        seatEvent.setDay(DayOfWeek.FRIDAY);
        eventRepository.save(seatEvent);

        reservationSlotService.generateTimeSlots(seatEvent);

        throw new UnsupportedOperationException(); // TODO finish test
    }
}
