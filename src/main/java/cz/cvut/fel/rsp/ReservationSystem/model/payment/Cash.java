package cz.cvut.fel.rsp.ReservationSystem.model.payment;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CASH")
public class Cash extends Payment{

    private int amount;
}
