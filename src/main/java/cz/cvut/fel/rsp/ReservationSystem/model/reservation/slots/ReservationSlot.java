package cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * ALl reservationSlots are going to be generated in the DB after creating an Event.
 *
 * We are going to know, if they are booked based on the existence of the Reservation entity bound to them.
 *
 * In case of CustomTime, one big CustomTime entity is going to be generated covering the whole interval.
 * After someone makes a reservation the entity is going to get split in two. Where the booked customTime is going to have
 * a reservation. The remaining one is going to get split again, after someone makes another reservation.
 */
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class ReservationSlot implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservation_slot_generator")
    @SequenceGenerator(name = "reservation_slot_generator",sequenceName = "reservation_slot_id_seq")
    private Integer id;

    @NotNull
    private Integer price;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
