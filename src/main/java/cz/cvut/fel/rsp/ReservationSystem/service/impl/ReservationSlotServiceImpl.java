package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.SeatRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.CustomTimeEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.IntervalEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.Interval;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.Seat;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationSlotServiceImpl implements ReservationSlotService {

    private final SeatRepository seatRepository;

    @Override
    public void generateTimeSlots(Event event) {
        event.visit(this);
    }

    @Override
    public void generateIntervalSlots(IntervalEvent event) {

    }

    @Override
    public void generateSeatSlots(SeatEvent event) {
        int seatAmount = event.getSeatAmount();
        Repetition repetition = event.getRepetition();
        LocalDate currentDate = event.getStartDate();
        LocalDate endDate = event.getRepeatUntil();

        while (repetition.equals(Repetition.NONE) || currentDate.isAfter(endDate)){
            for (int i = 0; i < seatAmount; i++){
                Seat seat = new Seat();
                seat.setPrice(100); // TODO hardcoded price
                seat.setDate(currentDate);
                seat.setSeatIdentifier(String.valueOf(i));
                seat.setEvent(event);
                seatRepository.save(seat);
            }

            if (repetition.equals(Repetition.NONE)) break;

            currentDate = incrementByRepetition(currentDate, repetition);
        }
    }

    @Override
    public void generateCustomTimeSlots(CustomTimeEvent event) {

    }

    private LocalDate incrementByRepetition(LocalDate date, Repetition repetition){
        return null;
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
