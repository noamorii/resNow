package cz.cvut.fel.rsp.ReservationSystem.dao;

import cz.cvut.fel.rsp.ReservationSystem.model.Wire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WireRepository extends JpaRepository<Wire, Long> {
}
