package cz.cvut.fel.rsp.ReservationSystem.rest.DTO;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ReservationSystemDTO {

    private Integer id;

    private String name;

    private List<String> managers;

    public ReservationSystemDTO() {
    }

    public ReservationSystemDTO(ReservationSystem reservationSystem) {
        this.id = reservationSystem.getId();
        this.name = reservationSystem.getName();
        this.managers = reservationSystem.getManagers().stream()
                .map(u -> u.getUsername())
                .collect(Collectors.toList());
    }
}
