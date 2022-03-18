package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.ReservationSystemRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.testutil.Generator;
import cz.cvut.fel.rsp.ReservationSystem.exception.ReservationSystemException;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.ReservationSystemServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class ReservationSystemServiceImplTest {
    @Autowired
    private ReservationSystemServiceImpl reservationSystemService;

    @Autowired
    private ReservationSystemRepository reservationSystemRepository;

    @PersistenceContext
    private EntityManager em;

    @Test
    public void createReservationSystem_createCorrectSystem_systemCreated(){
        User user = Generator.generateSystemOwner();
        ReservationSystem reservationSystem = new ReservationSystem();
        reservationSystem.setName("Test system");

        reservationSystemService.createReservationSystem(user, reservationSystem);

        ReservationSystem result = reservationSystemRepository.findById(reservationSystem.getId()).get();
        Assertions.assertNotNull(result);
    }

    @Test
    public void createReservationSystem_createCorrectSystem_systemHasOneManager(){
        User user = Generator.generateSystemOwner();
        ReservationSystem reservationSystem = new ReservationSystem();
        reservationSystem.setName("Test system");

        reservationSystemService.createReservationSystem(user, reservationSystem);

        ReservationSystem result = reservationSystemRepository.findById(reservationSystem.getId()).get();
        Assertions.assertTrue(result.getManagers().contains(user));
    }

    @Test
    public void createReservationSystem_createSystemByRegularUser_exceptionThrown(){
        User user = Generator.generateRegularUser();
        ReservationSystem reservationSystem = new ReservationSystem();
        reservationSystem.setName("Test system");


        Assertions.assertThrows(ReservationSystemException.class,
                () -> reservationSystemService.createReservationSystem(user, reservationSystem));
    }

    @Test
    public void addManager_addEmployeUser_employeeAdded(){
        User owner = Generator.generateSystemOwner();
        User employee = Generator.generateEmployeeUser();
        ReservationSystem reservationSystem = new ReservationSystem();
        reservationSystem.setName("Test system");
        reservationSystemService.createReservationSystem(owner, reservationSystem);

        reservationSystemService.addManager(employee, reservationSystem);

        List<User> result = reservationSystemRepository.findById(reservationSystem.getId()).get().getManagers();
        Assertions.assertTrue(result.contains(employee));
        Assertions.assertTrue(result.contains(owner));
    }

    @Test
    public void addManager_addEmployeeTwice_exceptionThrown(){
        User owner = Generator.generateSystemOwner();
        User employee = Generator.generateEmployeeUser();
        ReservationSystem reservationSystem = new ReservationSystem();
        reservationSystem.setName("Test system");
        reservationSystemService.createReservationSystem(owner, reservationSystem);

        reservationSystemService.addManager(employee, reservationSystem);

        Assertions.assertThrows(ReservationSystemException.class,
                () -> reservationSystemService.addManager(employee, reservationSystem));
    }
}
