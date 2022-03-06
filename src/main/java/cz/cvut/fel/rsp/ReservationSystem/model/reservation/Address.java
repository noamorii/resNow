package cz.cvut.fel.rsp.ReservationSystem.model.reservation;

import com.sun.istack.NotNull;
import cz.cvut.fel.rsp.ReservationSystem.model.AbstractEntity;

import javax.persistence.Entity;

@Entity
public class Address extends AbstractEntity {

    @NotNull
    private String city;

    @NotNull
    private String street;

    @NotNull
    private String houseNumber;

    @NotNull
    private String postalCode;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
}
