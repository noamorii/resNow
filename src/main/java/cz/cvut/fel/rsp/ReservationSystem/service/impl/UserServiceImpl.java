package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.PaymentDetailsRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.ReservationRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.UserRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final PaymentDetailsRepository paymentDetailsRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public UserServiceImpl(PaymentDetailsRepository paymentDetailsRepository, UserRepository userRepository, ReservationRepository reservationRepository) {
        this.paymentDetailsRepository = paymentDetailsRepository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
    }


    @Override
    public void addPaymentDetails(User user, PaymentDetails paymentDetails) {
        paymentDetails.setUser(user);
        user.setPaymentDetails(paymentDetails);
        userRepository.save(user);
        paymentDetailsRepository.save(paymentDetails);
    }

    @Override
    public void removePaymentDetails(User user) {
        PaymentDetails details = user.getPaymentDetails();
        details.setUser(null);
        user.setPaymentDetails(null);
        paymentDetailsRepository.save(details);
        userRepository.save(user);
    }

    @Override
    public List<Reservation> findUpcomingReservations(User user) {
        List<Reservation> reservations = reservationRepository.findAllUsersReservations(user);
        List<Reservation> result = new ArrayList<>();
        LocalDate thisDate = LocalDate.now();
        for (Reservation reservation : reservations){
            if (thisDate.isBefore(reservation.getReservationSlot().getDate())){
                result.add(reservation);
            }
        }
        return result;
    }

    @Override
    public List<Reservation> findPastReservations(User user) {
        List<Reservation> reservations = reservationRepository.findAllUsersReservations(user);
        List<Reservation> result = new ArrayList<>();
        LocalDate thisDate = LocalDate.now();
        for (Reservation reservation : reservations) {
            if (thisDate.isAfter(reservation.getReservationSlot().getDate())){
                result.add(reservation);
            }
        }

        return result;
    }

    @Override
    public List<Reservation> findUnpaidReservations(User user) {
        List<Reservation> reservations = reservationRepository.findAllUsersReservations(user);
        List<Reservation> result = new ArrayList<>();
        for (Reservation reservation: reservations) {
            if (reservation.getPayment() == null){
                result.add(reservation);
            }
        }
        return result;
    }
}
