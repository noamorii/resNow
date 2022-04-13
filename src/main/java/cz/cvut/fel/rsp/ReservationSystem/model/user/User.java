package cz.cvut.fel.rsp.ReservationSystem.model.user;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.UserType;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "reservation_system_user")
@Getter @Setter @NoArgsConstructor
public class User extends AbstractEntity {

    @NotNull
    @Column(unique = true)
    private String username;

    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @Enumerated(EnumType.STRING)
    @NotNull
    private UserType userType;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private PaymentDetails paymentDetails;

    @ManyToMany
    private List<ReservationSystem> manages;

    public void erasePassword(){
        this.password = null;
    }
}
