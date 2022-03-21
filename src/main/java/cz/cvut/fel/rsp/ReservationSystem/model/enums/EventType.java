package cz.cvut.fel.rsp.ReservationSystem.model.enums;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Event;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.ReservationSlotService;

public enum EventType {
    INTERVAL{
        @Override
        public void visit(Event event, ReservationSlotService reservationSlotService){
            reservationSlotService.generateIntervals(event);
        }
    },
    CUSTOM_TIME{
        @Override
        public void visit(Event event, ReservationSlotService reservationSlotService){
            reservationSlotService.generateCustomTime(event);
        }
    },
    SEAT{
        @Override
        public void visit(Event event, ReservationSlotService reservationSlotService){
            reservationSlotService.generateSeats(event);
        }
    };

    public abstract void visit(Event event, ReservationSlotService reservationSlotService);
}
