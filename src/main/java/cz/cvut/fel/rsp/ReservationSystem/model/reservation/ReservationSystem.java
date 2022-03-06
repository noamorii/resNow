package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;

import javax.persistence.Entity;

@Entity
public class ReservationSystem extends AbstractEntity {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
