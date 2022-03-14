package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
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

    @NotNull
    @OneToMany (mappedBy = "source")
    private List<Category> categories;
}
