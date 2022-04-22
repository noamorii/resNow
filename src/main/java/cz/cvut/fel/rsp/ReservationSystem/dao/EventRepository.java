package cz.cvut.fel.rsp.ReservationSystem.dao;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Reservation;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots.ReservationSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    @Query(value = "SELECT s FROM ReservationSlot s where s.event = ?1")
    List<ReservationSlot> findAllReservationSlotsAtEvent(Event event);

    @Query(value = "SELECT r FROM Reservation r WHERE r.reservationSlot.event = :event")
    List<Reservation> findAllReservationsAtEvent(@Param("event") Event event);
}
