package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import com.github.javafaker.Faker;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import cz.cvut.fel.rsp.ReservationSystem.dao.AddressRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.UserRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.UserType;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.*;
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
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
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

    private final AddressRepository addressRepository;

    private final CategoryServiceImpl categoryService;

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

        List<String[]> userRecords = readCsvData("src/main/resources/generatorCSVs/users.csv");
        List<String[]> systemRecords = readCsvData("src/main/resources/generatorCSVs/reservation_systems.csv");
        List<String[]> addressRecords = readCsvData("src/main/resources/generatorCSVs/addresses.csv");
        List<String[]> sourceRecords = readCsvData("src/main/resources/generatorCSVs/sources.csv");
        List<String[]> seatEventRecords = readCsvData("src/main/resources/generatorCSVs/seatEvents.csv");
        List<String[]> customTimeEventRecords = readCsvData("src/main/resources/generatorCSVs/customTimeEvents.csv");
        List<String[]> intervalEventRecords = readCsvData("src/main/resources/generatorCSVs/intervalEvents.csv");

        List<User> users = generateUsers(userRecords);
        List<ReservationSystem> systems = generateReservationSystems(systemRecords, users);
        List<Address> addresses = generateAddresses(addressRecords);
        List<Source> sources = generateSources(sourceRecords, addresses, systems);
        List<Event> events = generateEvents(seatEventRecords, customTimeEventRecords, intervalEventRecords, sources);

        //List<Event> events = generateEvents(sources);
        //generateReservations(users, events);
    }

    private List<String[]> readCsvData(String path) {
        log.info("Reading CSV data from " + path);
        List<String[]> csvData;
        try (
                Reader reader = Files.newBufferedReader(Paths.get(path));
                CSVReader csvReader = new CSVReader(reader);
        ) {
            csvData = csvReader.readAll();
        } catch (IOException | CsvException e) {
            throw new RuntimeException(e);
        }
        return csvData;
    }

    private List<User> generateUsers(List<String[]> userRecords) {
        log.info("Generating users");
        List<User> users = new ArrayList<>();
        for (String[] userData : userRecords) {
            User user = new User();
            user.setFirstName(userData[1]);
            user.setLastName(userData[2]);
            user.setUsername(userData[4]);
            switch (userData[5]) {
                case "ROLE_ADMIN":
                    user.setUserType(UserType.ROLE_ADMIN);
                    break;
                case "ROLE_SYSTEM_OWNER":
                    user.setUserType(UserType.ROLE_SYSTEM_OWNER);
                    break;
                case "ROLE_SYSTEM_EMPLOYEE":
                    user.setUserType(UserType.ROLE_SYSTEM_EMPLOYEE);
                    break;
                default:
                    user.setUserType(UserType.ROLE_REGULAR_USER);
                    break;
            }
            user.setEmail(userData[0]);
            user.setPassword(encoder.encode(userData[3]));
            userRepository.save(user);
            users.add(user);
        }
        return users;
    }

    private List<ReservationSystem> generateReservationSystems(List<String[]> systemRecords, List<User> users) {
        log.info("Generating reservation systems");
        int counter = 0;
        List<ReservationSystem> systems = new ArrayList<>();
        for (User user : users) {
            if (user.getUserType() == UserType.ROLE_SYSTEM_OWNER) {
                ReservationSystem reservationSystem = new ReservationSystem();
                reservationSystem.setName(systemRecords.get(counter++)[0]);
                reservationSystemService.createReservationSystem(user, reservationSystem);
                systems.add(reservationSystem);
            }
        }
        return systems;
    }

    private List<Address> generateAddresses(List<String[]> addressRecords) {
        log.info("Generating addresses");
        List<Address> addresses = new ArrayList<>();
        for (String[] addressData : addressRecords) {
            Address address = new Address();
            address.setCity(addressData[0]);
            address.setStreet(addressData[3]);
            address.setHouseNumber(addressData[1]);
            address.setPostalCode(addressData[2]);
            addressRepository.save(address);
            addresses.add(address);
        }
        return addresses;
    }

    private List<Source> generateSources(List<String[]> sourceRecords, List<Address> addresses, List<ReservationSystem> systems) {
        log.info("Generating sources");
        List<Source> sources = new ArrayList<>();
        int[] values = {3, 1, 4, 4, 3, 4, 4, 2, 3, 2};
        int counter = 0;
        for (int i = 0; i < sourceRecords.size(); i++) {
            Source source = new Source();
            source.setActive(true);
            source.setAddress(addresses.get(i));
            source.setName(sourceRecords.get(i)[1]);
            source.setDescription(sourceRecords.get(i)[0]);
            sources.add(source);
        }
        for (int i = 0; i < values.length; i++) {
            for (int j = 0; j < values[i]; j++) {
                sourceService.createSource(sources.get(counter++), systems.get(i));
            }
        }
        return sources;
    }

    private List<Event> generateEvents(List<String[]> seatEventRecords, List<String[]> customTimeEventRecords, List<String[]> intervalEventRecords, List<Source> sources) {
        log.info("Generating events");
        List<Event> events = new ArrayList<>();
        for (String[] seatEventData : seatEventRecords) {
            SeatEvent seatEvent = new SeatEvent();
            seatEvent.setName(seatEventData[3]);
            seatEvent.setStartDate(LocalDate.parse(seatEventData[6]));
            seatEvent.setDay(seatEvent.getStartDate().getDayOfWeek());
            seatEvent.setRepetition(Repetition.NONE);
            seatEvent.setFromTime(LocalTime.parse(seatEventData[2]));
            seatEvent.setToTime(LocalTime.parse(seatEventData[7]));
            seatEvent.setSeatAmount(Integer.valueOf(seatEventData[9]));
            eventService.createEvent(seatEvent, sources.get(Integer.parseInt(seatEventData[8]) - 1).getCategories().get(0));
            events.add(seatEvent);
        }
        for (String[] customTimeEventData : customTimeEventRecords) {
            CustomTimeEvent customTimeEvent = new CustomTimeEvent();
            customTimeEvent.setName(customTimeEventData[3]);
            customTimeEvent.setStartDate(LocalDate.parse(customTimeEventData[6]));
            customTimeEvent.setDay(customTimeEvent.getStartDate().getDayOfWeek());
            customTimeEvent.setRepetition(Repetition.NONE);
            customTimeEvent.setFromTime(LocalTime.parse(customTimeEventData[2]));
            customTimeEvent.setToTime(LocalTime.parse(customTimeEventData[7]));
            customTimeEvent.setMinimalReservationTime(Duration.ofMinutes(30));
            eventService.createEvent(customTimeEvent, sources.get(Integer.parseInt(customTimeEventData[8]) - 1).getCategories().get(0));
            events.add(customTimeEvent);
        }
        for (String[] intervalEventData : intervalEventRecords) {
            IntervalEvent intervalEvent = new IntervalEvent();
            intervalEvent.setName(intervalEventData[3]);
            intervalEvent.setStartDate(LocalDate.parse(intervalEventData[6]));
            intervalEvent.setDay(intervalEvent.getStartDate().getDayOfWeek());
            intervalEvent.setRepetition(Repetition.NONE);
            intervalEvent.setFromTime(LocalTime.parse(intervalEventData[2]));
            intervalEvent.setToTime(LocalTime.parse(intervalEventData[7]));
            intervalEvent.setIntervalDuration(Duration.ofHours(1));
            intervalEvent.setTimeBetweenIntervals(Duration.ZERO);
            eventService.createEvent(intervalEvent, sources.get(Integer.parseInt(intervalEventData[8]) - 1).getCategories().get(0));
            events.add(intervalEvent);
        }
        return events;
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
                        seatEvent.setName("Event " + counter++);
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
        LocalDate start = LocalDate.of(2022, 5, 1);
        LocalDate end = LocalDate.of(2022, 5, 31);
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
}
