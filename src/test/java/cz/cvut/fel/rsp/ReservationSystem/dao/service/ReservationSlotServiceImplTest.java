package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.CategoryRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.EventRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.SeatRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.testutil.Generator;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.EventServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.ReservationSlotServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.EventService;
import org.junit.jupiter.api.Assertions;
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
    private EventService eventService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Test
    void generateTimeSlots_seatEventWithoutRepetition_seatsGenerated() {
        Category category = Generator.generateCategory();
        categoryRepository.save(category);

        SeatEvent seatEvent = Generator.generateSeatEventWithoutRepetition();
        seatEvent.setSeatAmount(15);

        eventService.createEvent(seatEvent, category); // <- reservationSlotService.generateTimeSlots(seatEvent) in it

        Assertions.assertEquals(15, seatRepository.findAll().size());
        Assertions.assertEquals(seatEvent.getStartDate(), seatRepository.findAll().get(0).getDate());
    }
}
