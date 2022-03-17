package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.PaymentService;

import java.time.LocalTime;

public class PaymentServiceImpl implements PaymentService {
    @Override
    public void createCashPayment(Reservation reservation) {

    }

    @Override
    public void createWirePayment(Reservation reservation) {

    }

    @Override
    public Integer findProfit(ReservationSystem reservationSystem, LocalTime from, LocalTime to) {
        return null;
    }

    @Override
    public Integer findProfit(Source source, LocalTime from, LocalTime to) {
        return null;
    }
}
