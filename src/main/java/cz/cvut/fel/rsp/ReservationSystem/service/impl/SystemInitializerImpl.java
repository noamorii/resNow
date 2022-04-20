package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import com.github.javafaker.Faker;
import cz.cvut.fel.rsp.ReservationSystem.dao.UserRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.UserType;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.CustomTimeEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.IntervalEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationService;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.SystemInitializer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
@Slf4j
public class SystemInitializerImpl implements SystemInitializer {

    private final ReservationSystemServiceImpl reservationSystemService;

    private final ReservationSlotServiceImpl reservationSlotService;

    private final ReservationServiceImpl reservationService;

    private final SourceServiceImpl sourceService;

    private final EventServiceImpl eventService;

    private final UserRepository userRepository; // TODO change for user service later

    private final Environment environment;

    private final Random random = new Random();

    @Autowired(required = false) // Required = false because of tests
    PasswordEncoder encoder;

    @Override
    @PostConstruct
    public void initSystem() {
        if (Arrays.asList(environment.getActiveProfiles()).contains("testprofile")) {
            return;
        }

        User admin = generateAdmin();
        List<User> systemOwners = generateUsers(10, UserType.ROLE_SYSTEM_OWNER);
        List<User> users = generateUsers(50, UserType.ROLE_REGULAR_USER);
        List<User> employees = generateUsers(20, UserType.ROLE_SYSTEM_EMPLOYEE);
        List<ReservationSystem> reservationSystems = generateReservationSystems(systemOwners);
        List<Source> sources = generateSources(reservationSystems);
        List<Event> events = generateEvents(sources);
        generateReservations(users, events);

        //Event seatEvent = generateSeatEvent(source);
    }
    // TODO
    private void generateReservations(List<User> users, List<Event> events) {
        log.info("Generating reservations.");
        List<Reservation> reservations = new ArrayList<>();
        for (User user : users) {
            int amount = random.nextInt(3);
            for (int i = 0; i < amount; i++) {
                Event event = events.get(0);
                List<ReservationSlot> eventSlots = reservationSlotService.findAllFree(event);
                if (eventSlots.size() == 0) continue;
                reservationService.createReservation(user, eventSlots.get(random.nextInt(eventSlots.size())));
            }
        }
    }

    private List<Event> generateEvents(List<Source> sources) {
        log.info("Generating events.");
        List<LocalDate> dateRange = generateDates();
        List<Event> events = new ArrayList<>();
        Integer counter = 1;
        for (Source source : sources) {
            int amount = random.nextInt(6);
            for (int i = 0; i < amount + 1; i++) {
                int systemType = random.nextInt(3);
                // 1 - seatEvent, 2 - intervalEvent, default - customTimeEvent
                switch (systemType) {
                    case 1:
                        SeatEvent seatEvent = new SeatEvent();
                        seatEvent.setName("Event " + counter.toString());
                        counter++;
                        seatEvent.setStartDate(dateRange.get(random.nextInt(dateRange.size())));
                        seatEvent.setDay(seatEvent.getStartDate().getDayOfWeek());
                        seatEvent.setRepetition(Repetition.NONE);
                        seatEvent.setFromTime(LocalTime.of(8 + random.nextInt(4), 0));
                        seatEvent.setToTime(LocalTime.of(16 + random.nextInt(5), 0));
                        seatEvent.setSeatAmount(100);
                        eventService.createEvent(seatEvent, source.getCategories().get(0));
                        events.add(seatEvent);
                        break;
                    case 2:
                        IntervalEvent intervalEvent = new IntervalEvent();
                        intervalEvent.setName("Event" + counter.toString());
                        counter++;
                        intervalEvent.setStartDate(dateRange.get(random.nextInt(dateRange.size())));
                        intervalEvent.setDay(intervalEvent.getStartDate().getDayOfWeek());
                        intervalEvent.setRepetition(Repetition.NONE);
                        intervalEvent.setFromTime(LocalTime.of(8 + random.nextInt(4), 0));
                        intervalEvent.setToTime(LocalTime.of(16 + random.nextInt(5), 0));
                        intervalEvent.setIntervalDuration(Duration.ofHours(1));
                        intervalEvent.setTimeBetweenIntervals(Duration.ZERO);
                        eventService.createEvent(intervalEvent, source.getCategories().get(0));
                        events.add(intervalEvent);
                        break;
                    default:
                        CustomTimeEvent customTimeEvent = new CustomTimeEvent();
                        customTimeEvent.setName("Event" + counter.toString());
                        counter++;
                        customTimeEvent.setStartDate(dateRange.get(random.nextInt(dateRange.size())));
                        customTimeEvent.setDay(customTimeEvent.getStartDate().getDayOfWeek());
                        customTimeEvent.setRepetition(Repetition.NONE);
                        customTimeEvent.setFromTime(LocalTime.of(8 + random.nextInt(4), 0));
                        customTimeEvent.setToTime(LocalTime.of(16 + random.nextInt(5), 0));
                        customTimeEvent.setMinimalReservationTime(Duration.ofMinutes(30));
                        eventService.createEvent(customTimeEvent, source.getCategories().get(0));
                        events.add(customTimeEvent);
                        break;
                }
            }
        }
        return events;
    }

    private List<LocalDate> generateDates() {
        LocalDate start = LocalDate.of(2022, 4, 4);
        LocalDate end = LocalDate.of(2022, 5, 8);
        int days = (int) start.until(end, ChronoUnit.DAYS);
        return Stream.iterate(start, d -> d.plusDays(1)).limit(days).collect(Collectors.toList());
    }

    private Event generateSeatEvent(Source source) {
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

    private List<Source> generateSources(List<ReservationSystem> reservationSystems) {
        log.info("Generating sources.");
        Faker faker = new Faker();
        List<Source> sources = new ArrayList<>();
        for (ReservationSystem system : reservationSystems) {
            int amount = random.nextInt(5);
            for (int i = 0; i < Math.min(2, amount); i++) {
                Source source = new Source();
                source.setActive(true);
                source.setName(faker.funnyName().name());
                String description = faker.rickAndMorty().quote();
                source.setDescription(description.substring(0, Math.min(description.length(), 200)));
                sourceService.createSource(source, system);
                sources.add(source);
            }
        }
        return sources;
    }

    private List<ReservationSystem> generateReservationSystems(List<User> systemOwners) {
        log.info("Generating " + systemOwners.size() + " reservation system.");
        Faker faker = new Faker();
        List<ReservationSystem> systems = new ArrayList<>();
        for (User systemOwner : systemOwners) {
            ReservationSystem reservationSystem = new ReservationSystem();
            reservationSystem.setName(faker.company().name());
            reservationSystemService.createReservationSystem(systemOwner, reservationSystem);
            systems.add(reservationSystem);
        }
        return systems;
    }

    private List<User> generateUsers(int amount, UserType userType) {
        log.info("Generating " + amount + " " + userType.toString());
        Faker faker = new Faker();
        List<User> users = new ArrayList<>();
        for (int i = 0; i < amount; i++) {
            User user = new User();
            user.setFirstName(faker.name().firstName());
            user.setLastName(faker.name().lastName());
            user.setUsername(user.getFirstName().toLowerCase() + i + "." + user.getLastName().toLowerCase());
            if (userType == UserType.ROLE_SYSTEM_OWNER)
                user.setEmail(user.getFirstName() + i + "@owner.com");
            else if (userType == UserType.ROLE_SYSTEM_EMPLOYEE)
                user.setEmail(user.getFirstName() + i + "@employee.com");
            else
                user.setEmail(user.getFirstName() + i + "@user.com");
            user.setUserType(userType);
            user.setPassword(encoder.encode("123456"));
            userRepository.save(user);
            users.add(user);
        }
        return users;
    }

    private User generateAdmin() {
        User user = new User();
        String admin = "admin";
        user.setEmail("admin@admin.com");
        user.setUsername(admin);
        user.setFirstName(admin);
        user.setLastName(admin);
        user.setUserType(UserType.ROLE_ADMIN);
        user.setPassword(encoder.encode("123456"));

        userRepository.save(user);

        return user;
    }
}
