package cz.cvut.fel.rsp.ReservationSystem.dao;

import cz.cvut.fel.rsp.ReservationSystem.model.CustomTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomTimeRepository extends JpaRepository<CustomTime, Long> {
}
