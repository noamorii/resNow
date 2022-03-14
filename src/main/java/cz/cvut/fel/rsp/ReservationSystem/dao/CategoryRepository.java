package cz.cvut.fel.rsp.ReservationSystem.dao;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
