package cz.cvut.fel.rsp.ReservationSystem.rest.impl;


import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SlotDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.interfaces.SlotController;
import cz.cvut.fel.rsp.ReservationSystem.rest.util.RestUtil;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationService;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/v1/")
@Slf4j
@RequiredArgsConstructor
public class SlotControllerImpl implements SlotController {

    private final ReservationSlotService reservationSlotService;
    private final ReservationService reservationService;
    private final UserService userService;

    @Override
    @GetMapping(value = "/slots/{slot_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SlotDTO getSlotById(@PathVariable Integer slot_id) {
        return new SlotDTO(reservationSlotService.find(slot_id));
    }

    @Override
    @PostMapping(value = "/slots/{slot_id}")
    public ResponseEntity<Void> createReservation(@PathVariable Integer slot_id, @RequestBody ReservationDTO reservationDTO) {
        Reservation reservation = new Reservation(reservationDTO, userService.findById(reservationDTO.getUserId()));
        reservation.setReservationSlot(reservationSlotService.find(slot_id));
        reservationService.createReservation(reservation);
        log.info("Created reservation {} for slot with id {}", reservation, slot_id);
        final HttpHeaders headers = RestUtil.createLocationHeaderNewUri("/slots/{slot_id}/reservation", reservation.getId());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }
}
