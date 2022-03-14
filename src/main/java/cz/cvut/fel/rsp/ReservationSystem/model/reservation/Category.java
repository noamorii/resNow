package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
public class Category extends AbstractEntity {
    @NotNull
    private String name;

    @ManyToOne
    @JoinColumn(name = "source_id")
    @NotNull
    private Source source;

    @ManyToMany
    private List<Event> events;
}
