package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.*;
import cz.cvut.fel.rsp.ReservationSystem.dao.testutil.Generator;
import cz.cvut.fel.rsp.ReservationSystem.model.payment.Cash;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.Seat;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.UserService;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class UserServiceImplTest {

    @Autowired
    UserService userService;

    @Autowired
    SeatRepository seatRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PaymentDetailsRepository paymentDetailsRepository;

    @Autowired
    CashRepository cashRepository;

    @Autowired
    ReservationRepository reservationRepository;

    @Test
    public void findUnpaidReservations_findReservations_noUnpaidReservationsFound() {

        Seat reservationSlot = Generator.generateReservationSlotSeat();
        Reservation reservation = Generator.generateReservation(reservationSlot);
        reservation.setAdditionalInfo("Test");
        Cash cash = Generator.generateCash(reservation);
        reservation.setPayment(cash);

        seatRepository.save(reservationSlot);
        cashRepository.save(cash);
        reservationRepository.save(reservation);
        userRepository.save(reservation.getUser());
        paymentDetailsRepository.save(reservation.getUser().getPaymentDetails());

        Assertions.assertEquals(0, userService.findUnpaidReservations(reservation.getUser()).size());
    }

    @Test
    public void findUnpaidReservations_findReservations_UnpaidReservationsFound() {

        Seat reservationSlot = Generator.generateReservationSlotSeat();
        Reservation reservation = Generator.generateReservation(reservationSlot);
        reservation.setAdditionalInfo("Test");

        seatRepository.save(reservationSlot);
        reservationRepository.save(reservation);
        userRepository.save(reservation.getUser());
        paymentDetailsRepository.save(reservation.getUser().getPaymentDetails());

        Assertions.assertEquals(1, userService.findUnpaidReservations(reservation.getUser()).size());
        Assertions.assertEquals(reservation, userService.findUnpaidReservations(reservation.getUser()).get(0));
    }


}
