package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;

public interface UserService {
    public void addPaymentDetails(User user, PaymentDetails paymentDetails);

    public void removePaymentDetails(User user);


}
