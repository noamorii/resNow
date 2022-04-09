package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.PaymentDetailsRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.ReservationRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentDetailsRepository paymentDao;
    private final ReservationRepository reservationDao;

    @Autowired
    public PaymentServiceImpl(PaymentDetailsRepository paymentDao, ReservationRepository reservationDao) {
        this.paymentDao = paymentDao;
        this.reservationDao = reservationDao;
    }

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
