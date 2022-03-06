package cz.cvut.fel.rsp.ReservationSystem.model.reservation.slots;

import com.sun.istack.NotNull;

import javax.persistence.Entity;

@Entity
public class Seat extends ReservationSlot{
    @NotNull
    private String seatIdentifier;

    public String getSeatIdentifier() {
        return seatIdentifier;
    }

    public void setSeatIdentifier(String seatIdentifier) {
        this.seatIdentifier = seatIdentifier;
    }
}
