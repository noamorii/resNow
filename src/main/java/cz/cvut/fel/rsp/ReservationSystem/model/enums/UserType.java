package cz.cvut.fel.rsp.ReservationSystem.model.enums;

public enum UserType {
    REGULAR_USER("regular_user"),
    ADMIN("admin"),
    SYSTEM_OWNER("system_owner"),
    SYSTEM_EMPLOYEE("system_employee");

    private final String name;

    UserType(String name) {
        this.name = name;
    }
}
