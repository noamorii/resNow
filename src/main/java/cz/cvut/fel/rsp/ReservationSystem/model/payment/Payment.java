package cz.cvut.fel.rsp.ReservationSystem.model.payment;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "payment_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Payment extends AbstractEntity {
    @NotNull
    private Integer amount;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime dateTimePaid;

    @NotNull
    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public LocalDateTime getDateTimePaid() {
        return dateTimePaid;
    }

    public void setDateTimePaid(LocalDateTime dateTimePaid) {
        this.dateTimePaid = dateTimePaid;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }
}
