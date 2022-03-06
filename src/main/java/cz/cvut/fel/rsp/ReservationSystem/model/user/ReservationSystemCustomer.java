package cz.cvut.fel.rsp.ReservationSystem.model.user;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class ReservationSystemCustomer extends AbstractEntity {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "reservation_system_id")
    private ReservationSystem reservationSystem;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ReservationSystem getReservationSystem() {
        return reservationSystem;
    }

    public void setReservationSystem(ReservationSystem reservationSystem) {
        this.reservationSystem = reservationSystem;
    }
}
