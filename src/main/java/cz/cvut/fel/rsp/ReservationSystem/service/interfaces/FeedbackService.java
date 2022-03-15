package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;

public interface FeedbackService{
    public void createFeedback(String message, ReservationSystem reservationSystem);
}
