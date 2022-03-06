package cz.cvut.fel.rsp.ReservationSystem.model.enums;

public enum UserType {
    REGULAR_USER("regularUser"),
    ADMIN("admin");

    private final String name;

    UserType(String name) {
        this.name = name;
    }
}
