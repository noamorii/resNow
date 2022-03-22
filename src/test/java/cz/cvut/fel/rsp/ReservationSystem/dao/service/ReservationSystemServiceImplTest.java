package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.ReservationSystemRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.testutil.Generator;
import cz.cvut.fel.rsp.ReservationSystem.exception.ReservationSystemException;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.ReservationSystemServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class ReservationSystemServiceImplTest {

    @Autowired
    private ReservationSystemServiceImpl reservationSystemService;

    @Autowired
    private ReservationSystemRepository reservationSystemRepository;

    private User owner, employee;
    private ReservationSystem reservationSystem;

    @BeforeEach
    public void init() {
        owner = Generator.generateSystemOwner();
        employee = Generator.generateEmployeeUser();
        reservationSystem = new ReservationSystem();
        reservationSystem.setName("Test system");
    }

    @Test
    public void createReservationSystem_createCorrectSystem_systemCreated() {
        reservationSystemService.createReservationSystem(owner, reservationSystem);
        ReservationSystem result = reservationSystemRepository.findById(reservationSystem.getId()).orElse(null);

        Assertions.assertNotNull(result);
    }

    @Test
    public void createReservationSystem_createCorrectSystem_systemHasOneManager() {
        reservationSystemService.createReservationSystem(owner, reservationSystem);
        ReservationSystem result = reservationSystemRepository.findById(reservationSystem.getId()).orElse(null);

        Assertions.assertNotNull(result);
        Assertions.assertTrue(result.getManagers().contains(owner));
    }

    @Test
    public void createReservationSystem_createSystemByEmployeeUser_exceptionThrown() {
        Assertions.assertThrows(ReservationSystemException.class,
                () -> reservationSystemService.createReservationSystem(employee, reservationSystem));
    }

    @Test
    public void addManager_addEmployeeUser_employeeAdded() {
        reservationSystemService.createReservationSystem(owner, reservationSystem);
        reservationSystemService.addManager(employee, reservationSystem);

        ReservationSystem system = reservationSystemRepository.findById(reservationSystem.getId()).orElse(null);

        Assertions.assertNotNull(system);
        Assertions.assertTrue(system.getManagers().contains(employee));
        Assertions.assertTrue(system.getManagers().contains(owner));
    }

    @Test
    public void addManager_addEmployeeTwice_exceptionThrown() {
        reservationSystemService.createReservationSystem(owner, reservationSystem);
        reservationSystemService.addManager(employee, reservationSystem);

        Assertions.assertThrows(ReservationSystemException.class,
                () -> reservationSystemService.addManager(employee, reservationSystem));
    }
}
