package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.Feedback;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
public class ReservationSystem extends AbstractEntity {

    private String name;

    @ManyToMany
    private List<User> managers;

    @OneToMany
    private List<Feedback> feedback;
}
