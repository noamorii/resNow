package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;

import java.time.LocalTime;
import java.util.List;

public class ReservationSlotServiceImpl implements ReservationSlotService {
    @Override
    public void generateReservationSlots(Event event) {

    }

    @Override
    public List<ReservationSlot> findAll(Event event) {
        return null;
    }

    @Override
    public List<ReservationSlot> findAll(Event event, LocalTime from, LocalTime to) {
        return null;
    }

    @Override
    public List<ReservationSlot> findAllReserved(Event event) {
        return null;
    }

    @Override
    public List<ReservationSlot> findAllReserved(Event event, LocalTime from, LocalTime to) {
        return null;
    }

    @Override
    public List<ReservationSlot> findAllFree(Event event) {
        return null;
    }

    @Override
    public List<ReservationSlot> findAllFree(Event event, LocalTime from, LocalTime to) {
        return null;
    }
}
