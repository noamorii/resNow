package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.CategoryRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.EventRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.testutil.Generator;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Event;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.EventServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class EventServiceImplTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventServiceImpl eventService;

    @Test
    void createEvent_createNoRepetitionEventWithIntervals_eventCreated() {
        Category category = Generator.generateCategory();
        categoryRepository.save(category);
        Event event = Generator.generateEventWithoutRepetition(Generator.generateCategory());

        eventService.createEvent(event, category);

        Assertions.assertNotNull(eventRepository.findById(event.getId()).get());
    }
}
