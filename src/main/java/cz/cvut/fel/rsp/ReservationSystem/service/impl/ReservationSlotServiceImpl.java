package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.CustomTimeEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.IntervalEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.Interval;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class ReservationSlotServiceImpl implements ReservationSlotService {
    @Override
    public void generateTimeSlots(Event event) {
        event.visit(this);
    }

    @Override
    public void generateIntervalSlots(IntervalEvent event) {

    }

    @Override
    public void generateSeatSlots(SeatEvent event) {

    }

    @Override
    public void generateCustomTimeSlots(CustomTimeEvent event) {

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
