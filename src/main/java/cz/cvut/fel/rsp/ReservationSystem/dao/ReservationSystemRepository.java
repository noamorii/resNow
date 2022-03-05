package cz.cvut.fel.rsp.ReservationSystem.dao;

import cz.cvut.fel.rsp.ReservationSystem.model.ReservationSystem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationSystemRepository extends JpaRepository<ReservationSystem, Long> {
}
