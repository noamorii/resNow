package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.payment.Payment;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.ReservationSystemCustomer;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Reservation extends AbstractEntity {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private ReservationSystemCustomer customer;

    @OneToOne(mappedBy = "reservation")
    private Payment payment; // null if not paid

    @NotNull
    @OneToOne
    @JoinColumn(name = "reservationslot_id")
    private ReservationSlot reservationSlot;

    public ReservationSystemCustomer getCustomer() {
        return customer;
    }

    public void setCustomer(ReservationSystemCustomer customer) {
        this.customer = customer;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public ReservationSlot getReservationSlot() {
        return reservationSlot;
    }

    public void setReservationSlot(ReservationSlot reservationSlot) {
        this.reservationSlot = reservationSlot;
    }
}
