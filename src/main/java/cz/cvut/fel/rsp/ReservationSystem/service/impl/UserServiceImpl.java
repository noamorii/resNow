package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.PaymentDetailsRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.UserRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final PaymentDetailsRepository paymentDetailsRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(PaymentDetailsRepository paymentDetailsRepository, UserRepository userRepository) {
        this.paymentDetailsRepository = paymentDetailsRepository;
        this.userRepository = userRepository;
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
        return null;
    }

    @Override
    public List<Reservation> findPastReservations(User user) {
        return null;
    }

    @Override
    public List<Reservation> findUnpaidReservations(User user) {
        return null;
    }
}
