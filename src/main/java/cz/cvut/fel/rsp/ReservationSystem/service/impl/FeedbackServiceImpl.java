package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.FeedbackRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.ReservationSystemRepository;
import cz.cvut.fel.rsp.ReservationSystem.exception.FeedbackException;
import cz.cvut.fel.rsp.ReservationSystem.model.Feedback;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository dao;
    private final ReservationSystemRepository reservationSystemDao;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepository dao, ReservationSystemRepository reservationSystemDao) {
        this.dao = dao;
        this.reservationSystemDao = reservationSystemDao;
    }

    @Override
    public void createFeedback(String message, ReservationSystem reservationSystem) {
        if (message == null) {
            throw new FeedbackException("Feedback has to have content.");
        }
        Feedback feedback = new Feedback();
        feedback.setMessage(message);
        reservationSystem.getFeedback().add(feedback);

        dao.save(feedback);
        reservationSystemDao.save(reservationSystem);
    }
}
