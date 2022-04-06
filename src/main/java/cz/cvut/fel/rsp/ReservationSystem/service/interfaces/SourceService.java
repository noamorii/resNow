package cz.cvut.fel.rsp.ReservationSystem.service.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Address;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;

import java.util.List;

public interface SourceService{
    public void createSource(Source source, ReservationSystem reservationSystem);

    public void removeAddress(Source source);

    public void addAddress(Source source, Address address);
}
