package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import jdk.vm.ci.meta.Local;

import java.time.LocalTime;

public interface PaymentService{
    public void createCashPayment(Reservation reservation);

    public void createWirePayment(Reservation reservation);

    public Integer findProfit(ReservationSystem reservationSystem, LocalTime from, LocalTime to);

    public Integer findProfit(Source source, Local from, LocalTime to);
}
