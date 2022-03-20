package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.*;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.UserType;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.*;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.Interval;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.CategoryService;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.SystemInitializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class SystemInitializerImpl implements SystemInitializer {

    private final ReservationSystemServiceImpl reservationSystemService;
    private final CategoryRepository catDao;
    private final EventRepository eventDao;
    private final SourceRepository sourceDao;
    private final IntervalRepository intervalDao;
    private final ReservationRepository reservationDao;

    @Autowired
    public SystemInitializerImpl(ReservationSystemServiceImpl reservationSystemService,
                                 CategoryRepository catDao, EventRepository eventDao, SourceRepository sourceDao, IntervalRepository intervalDao, ReservationRepository reservationDao) {
        this.reservationSystemService = reservationSystemService;
        this.catDao = catDao;
        this.eventDao = eventDao;
        this.sourceDao = sourceDao;
        this.intervalDao = intervalDao;
        this.reservationDao = reservationDao;
    }

    // change as soon as services appear

    @Override
    public void initSystem() {

        ReservationSystem reservationSystem = new ReservationSystem();
        reservationSystem.setName("ReserveNow");

        User owner = new User();
        owner.setUsername("Owner");
        owner.setFirstName("Name");
        owner.setLastName("LastName");
        owner.setPassword("owner");
        owner.setEmail("owner@reservationSystem.cz");
        owner.setUserType(UserType.SYSTEM_OWNER);
        owner.setPaymentDetails(createPaymentDetails(owner, "OwnerCreditCardNumber"));

        reservationSystemService.createReservationSystem(owner, reservationSystem);

        User employee = new User();
        employee.setUsername("Employee");
        employee.setFirstName("E_Name");
        employee.setLastName("E_LastName");
        employee.setPassword("employee");
        employee.setEmail("employee@reservationSystem.cz");
        employee.setUserType(UserType.SYSTEM_EMPLOYEE);
        employee.setPaymentDetails(createPaymentDetails(employee, "EmployeeCreditCardNumber"));

        reservationSystemService.addManager(employee, reservationSystem);

        User regular = new User();
        regular.setUsername("Regular");
        regular.setFirstName("R_Name");
        regular.setLastName("R_LastName");
        regular.setPassword("regular");
        regular.setEmail("regular@reservationSystem.cz");
        regular.setUserType(UserType.REGULAR_USER);
        regular.setPaymentDetails(createPaymentDetails(regular, "RegularCreditCardNumber"));


        Category category = new Category();
        category.setName("Category");
        catDao.save(category);

        Address address = new Address();
        address.setCity("city");
        address.setStreet("street");
        address.setHouseNumber("house");
        address.setHouseNumber("postalNumber");

        Source source = new Source();
        source.setName("Source");
        source.setDescription("sourceDescription");
        source.setAddress(address);
        source.setActive(true);
        source.setReservationSystem(reservationSystem);
        source.setCategories(Collections.singletonList(category));
        sourceDao.save(source);

        Event event = new Event();
        event.setName("Event");
        event.setFrom(LocalTime.now());
        event.setTo(LocalTime.MAX);
        event.setRepeatUntil(LocalDate.MAX);
        event.setDay(DayOfWeek.of(1));
        event.setRepetition(Repetition.NONE);
        event.setCategory(category);
        eventDao.save(event);

        Interval interval = new Interval();
        interval.setPrice(1337);
        interval.setStart(LocalTime.now());
        interval.setEnd(LocalTime.MAX);
        intervalDao.save(interval);

        Reservation reservation = new Reservation();
        reservation.setUser(regular);
        reservation.setReservationSlot(interval);
        reservation.setCancelled(false);
        reservation.setAdditionalInfo("additionalInfo");
        reservationDao.save(reservation);

    }

    private PaymentDetails createPaymentDetails(User user, String cardNumber) {
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setUser(user);
        paymentDetails.setCreditCardNumber(cardNumber);
        return paymentDetails;
    }
}
