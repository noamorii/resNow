package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.CustomTimeEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.IntervalEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;

import java.time.LocalTime;
import java.util.List;

public interface ReservationSlotService{
    public void generateTimeSlots(Event event);

    public void generateIntervalSlots(IntervalEvent event);

    public void generateSeatSlots(SeatEvent event);

    public void generateCustomTimeSlots(CustomTimeEvent event);

    public List<ReservationSlot> findAll(Event event);

    public List<ReservationSlot> findAll(Event event, LocalTime from, LocalTime to);

    public List<ReservationSlot> findAllReserved(Event event);

    public List<ReservationSlot> findAllReserved(Event event, LocalTime from, LocalTime to);

    public List<ReservationSlot> findAllFree(Event event);

    public List<ReservationSlot> findAllFree(Event event, LocalTime from, LocalTime to);
}
