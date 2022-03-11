package cz.cvut.fel.rsp.ReservationSystem.model.payment;

import com.sun.istack.NotNull;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
public class Cash extends Payment{
    @NotNull
    private String foo;

    public String getFoo() {
        return foo;
    }

    public void setFoo(String foo) {
        this.foo = foo;
    }
}
