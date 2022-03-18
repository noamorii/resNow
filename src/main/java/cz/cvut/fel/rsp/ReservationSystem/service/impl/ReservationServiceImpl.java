package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationService;

import java.time.LocalTime;
import java.util.List;

public class ReservationServiceImpl implements ReservationService {
    @Override
    public void createReservation(User user, ReservationSlot reservationSlot) {

    }

    @Override
    public void cancelReservation(Reservation reservation) {

    }

    @Override
    public List<Reservation> findAllCanceled(ReservationSystem reservationSystem, LocalTime from, LocalTime to) {
        return null;
    }

    @Override
    public List<Reservation> findAllCanceled(Source source, LocalTime from, LocalTime to) {
        return null;
    }
}
