package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.CustomTimeRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.IntervalRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.SeatRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.enums.Repetition;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.CustomTimeEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.IntervalEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.SeatEvent;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.CustomTime;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.Interval;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.Seat;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationSlotServiceImpl implements ReservationSlotService {

    private final SeatRepository seatRepository;

    private final CustomTimeRepository customTimeRepository;

    private final IntervalRepository intervalRepository;

    @Override
    public void generateTimeSlots(Event event) {
        Repetition repetition = event.getRepetition();
        LocalDate currentDate = event.getStartDate();
        LocalDate endDate = event.getRepeatUntil();

        while (repetition.equals(Repetition.NONE) || !currentDate.isAfter(endDate)){
            // Calls one of the methods, that generate the timeslots on one day. E. g. generateIntervalTimeSlots
            event.visit(this, currentDate);

            if (repetition.equals(Repetition.NONE)) break;

            currentDate = repetition.add(currentDate);
        }
    }

    @Override
    public void generateIntervalSlots(IntervalEvent event, LocalDate date) {
        Duration intervalDuration = event.getIntervalDuration();
        Duration timeBetween = event.getTimeBetweenIntervals();
        LocalTime currentTime = event.getFromTime();

        while (currentTime.isBefore(event.getToTime())){
            Interval interval = new Interval();
            interval.setDate(date);
            interval.setStart(currentTime);
            interval.setEnd(currentTime.plusSeconds(intervalDuration.getSeconds()));
            interval.setPrice(100); // TODO price
            currentTime = currentTime.plusSeconds(intervalDuration.getSeconds() + timeBetween.getSeconds());
            intervalRepository.save(interval);
        }
    }

    @Override
    public void generateSeatSlots(SeatEvent event, LocalDate date) {
        int seatAmount = event.getSeatAmount();
        for (int i = 0; i < seatAmount; i++){
            Seat seat = new Seat();
            seat.setPrice(100); // TODO hardcoded price
            seat.setDate(date);
            seat.setSeatIdentifier(String.valueOf(i));
            seat.setEvent(event);
            seatRepository.save(seat);
        }
    }

    @Override
    public void generateCustomTimeSlots(CustomTimeEvent event, LocalDate date) {
        CustomTime customTimeSlot = new CustomTime();
        customTimeSlot.setEvent(event);
        customTimeSlot.setDate(date);
        customTimeSlot.setEnd(event.getToTime());
        customTimeSlot.setPrice(100); // TODO hardcoded price
        customTimeSlot.setMainSlot(true);
        customTimeRepository.save(customTimeSlot);
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
