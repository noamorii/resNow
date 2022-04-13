package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.UserRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.UserType;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.SystemInitializer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class SystemInitializerImpl implements SystemInitializer {

    private final ReservationSystemServiceImpl reservationSystemService;

    private final SourceServiceImpl sourceService;

    private final EventServiceImpl eventService;

    private final UserRepository userRepository; // TODO change for user service later

    private final Environment environment;

    @Autowired //Pro hashovani hesla
    PasswordEncoder encoder;

    @Override
    @PostConstruct
    public void initSystem() {
        if (Arrays.asList(environment.getActiveProfiles()).contains("testprofile")) {
            return;
        }

        User systemOwner = generateOwner();
        User regularUser = generateRegularUser();
        User admin = generateAdmin();
        User systemEmployee = generateEmployee();
        ReservationSystem reservationSystem = generateReservationSystem(systemOwner);
        Source source = generateSource(reservationSystem);
        Event seatEvent = generateSeatEvent(source);
    }

    private Event generateSeatEvent(Source source){
        SeatEvent event = new SeatEvent();
        event.setName("Freies Bier");
        event.setDay(DayOfWeek.FRIDAY);
        event.setRepetition(Repetition.NONE);
        event.setFromTime(LocalTime.of(10, 0));
        event.setToTime(LocalTime.of(20, 0));
        event.setStartDate(LocalDate.now());
        event.setSeatAmount(100);

        eventService.createEvent(event, source.getCategories().get(0));

        return event;
    }

    private Source generateSource(ReservationSystem reservationSystem){
        Source source = new Source();
        source.setActive(true);
        source.setName("Berliner Laden");
        source.setDescription("Laden bei Kotti");

        sourceService.createSource(source, reservationSystem);

        return source;
    }

    private ReservationSystem generateReservationSystem(User owner){
        ReservationSystem reservationSystem = new ReservationSystem();
        reservationSystem.setName("Aldi");

        reservationSystemService.createReservationSystem(owner, reservationSystem);

        return reservationSystem;
    }

    private User generateOwner(){
        User user = new User();
        user.setEmail("owner@rynary.com");
        user.setUsername("BertHert");
        user.setFirstName("Herbert");
        user.setLastName("Adenauer");
        user.setUserType(UserType.SYSTEM_OWNER);
        user.setPassword(encoder.encode("123456"));

        userRepository.save(user);

        return user;
    }

    private User generateRegularUser(){
        User user = new User();
        user.setEmail("user@user.com");
        user.setUsername("Lojza");
        user.setFirstName("Lojza");
        user.setLastName("Spojitá");
        user.setUserType(UserType.REGULAR_USER);
        user.setPassword(encoder.encode("123456"));

        userRepository.save(user);

        return user;
    }

    private User generateAdmin(){
        User user = new User();
        user.setEmail("admin@admin.com");
        user.setUsername("admin");
        user.setFirstName("admin");
        user.setLastName("admin");
        user.setUserType(UserType.ADMIN);
        user.setPassword(encoder.encode("123456"));

        userRepository.save(user);

        return user;
    }

    private User generateEmployee(){
        User user = new User();
        user.setEmail("employee@employee.com");
        user.setUsername("dikybohu");
        user.setFirstName("Bohuslav");
        user.setLastName("Trpký");
        user.setUserType(UserType.SYSTEM_EMPLOYEE);
        user.setPassword(encoder.encode("123456"));

        userRepository.save(user);

        return user;
    }
}
