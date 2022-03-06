package cz.cvut.fel.rsp.ReservationSystem.model.payment;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("WIRE")
public class Wire extends Payment{
}
