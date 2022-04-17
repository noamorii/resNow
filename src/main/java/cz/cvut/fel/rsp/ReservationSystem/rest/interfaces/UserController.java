package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.UserDTO;

import java.util.List;

// TODO jeste neni hotove, poresime potom
// Na usera ktery to dela se
public interface UserController {
    public UserDTO getByUsername(String username);

    public List<ReservationDTO> getReservations(String username, Integer fromTimestamp, Integer toTimestamp);
}
