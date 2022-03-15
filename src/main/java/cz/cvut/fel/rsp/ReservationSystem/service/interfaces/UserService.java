package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;

import java.util.List;

public interface UserService{
    public void addPaymentDetails(User user, PaymentDetails paymentDetails);

    public void removePaymentDetails(User user);

    public List<Reservation> findUpcomingReservations(User user);

    public List<Reservation> findPastReservations(User user);

    public List<Reservation> findUnpaidReservations(User user);
}
