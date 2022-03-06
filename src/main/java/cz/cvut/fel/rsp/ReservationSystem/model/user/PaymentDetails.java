package cz.cvut.fel.rsp.ReservationSystem.model.user;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class PaymentDetails extends AbstractEntity {
    @NotNull
    private String creditCardNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public String getCreditCardNumber() {
        return creditCardNumber;
    }

    public void setCreditCardNumber(String creditCardNumber) {
        this.creditCardNumber = creditCardNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
