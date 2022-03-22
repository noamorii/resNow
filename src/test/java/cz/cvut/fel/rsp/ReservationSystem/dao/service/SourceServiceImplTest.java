package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.ReservationSystemRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.SourceRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.testutil.Generator;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.SourceServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class SourceServiceImplTest {
    @Autowired
    private SourceServiceImpl sourceService;

    @Autowired
    private SourceRepository sourceRepository;

    @Test
    void createSource_createRegularSource_sourceCreated() {
        Source source = new Source();
        source.setActive(true);
        source.setName("try");

        ReservationSystem reservationSystem = Generator.generateReservationSystem(null, null);

        sourceService.createSource(source, reservationSystem);

        Source result = sourceRepository.findById(source.getId()).get();
        Assertions.assertNotNull(result);
        Assertions.assertTrue(result.isActive());
        Assertions.assertEquals(result.getName(), "try");
    }

    @Test
    void createSource_createRegularSource_sourceHasOneCategory() {
        Source source = new Source();
        source.setActive(true);
        source.setName("try");

        ReservationSystem reservationSystem = Generator.generateReservationSystem(null, null);

        sourceService.createSource(source, reservationSystem);

        Source result = sourceRepository.findById(source.getId()).get();
        Assertions.assertEquals(result.getCategories().size(), 1);
    }
}
