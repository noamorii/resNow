package cz.cvut.fel.rsp.ReservationSystem.dao;

import cz.cvut.fel.rsp.ReservationSystem.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
