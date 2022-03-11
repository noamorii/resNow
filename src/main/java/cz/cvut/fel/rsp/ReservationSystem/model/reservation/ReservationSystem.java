package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
public class ReservationSystem extends AbstractEntity {

    private String name;

    @ManyToMany
    private List<User> managers;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
