package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Source extends AbstractEntity {
    @NotNull
    private String name;

    private String description;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address; // Might be null, in case the source is for example an online service

    @NotNull
    private boolean isActive;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "reservationSystem_id")
    private ReservationSystem reservationSystem;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ReservationSystem getReservationSystem() {
        return reservationSystem;
    }

    public void setReservationSystem(ReservationSystem reservationSystem) {
        this.reservationSystem = reservationSystem;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
