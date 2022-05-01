package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.*;
import cz.cvut.fel.rsp.ReservationSystem.dao.testutil.Generator;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.CategoryServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.EventServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.ReservationSystemServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.SourceServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class CriticalTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SourceRepository sourceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReservationSystemRepository reservationSystemRepository;

    @Autowired
    private CategoryServiceImpl categoryService;

    @Autowired
    private EventServiceImpl eventService;

    @Autowired
    private SourceServiceImpl sourceService;

    @Autowired
    private ReservationSystemServiceImpl reservationSystemService;


    private User owner1, owner2;

    private ReservationSystem reservationSystem1, reservationSystem2;

    private Category newCategory;

    @BeforeEach
    public void init() {
        owner1 = Generator.generateSystemOwner();
        owner2 = Generator.generateSystemOwner();
        userRepository.save(owner1);
        userRepository.save(owner2);

        reservationSystem1 = new ReservationSystem();
        reservationSystem1.setName("Test system1");
        reservationSystem2 = new ReservationSystem();
        reservationSystem2.setName("Test system2");

        reservationSystemService.createReservationSystem(owner1, reservationSystem1);
        reservationSystemService.createReservationSystem(owner2, reservationSystem2);

        newCategory = Generator.generateCategory();

    }

    @Test
    public void repairingColissionProblem_2SystemWithSameCategoryName_EventsIsConnectedWithCorrectSystem() {
        Source source1 = new Source();
        source1.setActive(true);
        source1.setName("test source 1");
        sourceService.createSource(source1, reservationSystem1);

        Source source2 = new Source();
        source2.setActive(true);
        source2.setName("test source 2");
        sourceService.createSource(source2, reservationSystem2);

        categoryService.createCategory(newCategory, source1);
        // TODO simulace upravy prichozich dat z DTO
        Category newCategory2 = new Category();
        newCategory2.setName(newCategory.getName());
        categoryService.createCategory(newCategory2, source2);

        ReservationSystem resultResSys1 = reservationSystemService.find(reservationSystem1.getId());
        ReservationSystem resultResSys2 = reservationSystemService.find(reservationSystem2.getId());
        List<Source> resSources1 = sourceRepository.findAllSourcesOfReservationSystem(resultResSys1);
        List<Source> resSources2 = sourceRepository.findAllSourcesOfReservationSystem(resultResSys2);

        Assertions.assertEquals(1, resSources1.size());
        Assertions.assertEquals(1, resSources2.size());

        Source resSource1 = resSources1.get(0);
        Source resSource2 = resSources2.get(0);

        Assertions.assertNotEquals(resSource1, resSource2);

        Assertions.assertEquals(2, resSource1.getCategories().size());
        Assertions.assertEquals(2, resSource2.getCategories().size());

        Category cat1 =  resSource1.getCategories().get(1);
        Category cat2 =  resSource2.getCategories().get(1);

        Assertions.assertNotEquals(cat1, cat2);

        Event event1 = Generator.generateIntervalEventWithoutRepetition();
        Event event2 = Generator.generateIntervalEventWithoutRepetition();
        eventService.createEvent(event1, cat1);
        eventService.createEvent(event2, cat2);

        Assertions.assertEquals(2, resSource1.getCategories().size());
        Assertions.assertEquals(2, resSource2.getCategories().size());

        cat1 =  resSource1.getCategories().get(1);
        cat2 =  resSource2.getCategories().get(1);

        Assertions.assertEquals(1, cat1.getEvents().size());
        Assertions.assertEquals(1, cat2.getEvents().size());

        Assertions.assertEquals(event1, cat1.getEvents().get(0));
        Assertions.assertEquals(event2, cat2.getEvents().get(0));


    }
}
