package cz.cvut.fel.rsp.ReservationSystem.dao;

import cz.cvut.fel.rsp.ReservationSystem.model.ReservationSystemCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationSystemCustomerRepository extends JpaRepository<ReservationSystemCustomer, Long> {
}
