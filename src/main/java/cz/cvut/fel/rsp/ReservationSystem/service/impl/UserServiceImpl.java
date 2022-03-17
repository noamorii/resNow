package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.UserService;

import java.util.List;

public class UserServiceImpl implements UserService {
    @Override
    public void addPaymentDetails(User user, PaymentDetails paymentDetails) {

    }

    @Override
    public void removePaymentDetails(User user) {

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
