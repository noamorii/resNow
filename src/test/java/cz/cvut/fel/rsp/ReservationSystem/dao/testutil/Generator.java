package cz.cvut.fel.rsp.ReservationSystem.dao.testutil;

import cz.cvut.fel.rsp.ReservationSystem.model.enums.UserType;
import cz.cvut.fel.rsp.ReservationSystem.model.user.PaymentDetails;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;

import java.util.Random;

public class Generator {
    private static final Random RAND = new Random();

    public static int randomInt() {
        return RAND.nextInt();
    }

    public static boolean randomBoolean() {
        return RAND.nextBoolean();
    }

    public static User generateEmployeeUser() {
        User user = generateGenericUser();
        user.setUserType(UserType.SYSTEM_EMPLOYEE);
        return user;
    }

    public static User generateRegularUser() {
        User user = generateGenericUser();
        user.setUserType(UserType.REGULAR_USER);
        return user;
    }

    public static User generateSystemOwner() {
        User user = generateGenericUser();
        user.setUserType(UserType.SYSTEM_OWNER);
        return user;
    }

    private static User generateGenericUser() {
        final User user = new User();
        user.setUsername("username" + randomInt());
        user.setFirstName("FirstName" + randomInt());
        user.setLastName("LastName" + randomInt());
        user.setPassword(Integer.toString(randomInt()));
        user.setEmail(user.getUsername() + "@reservationSystem.cz");
        user.setPaymentDetails(generatePaymentDetails(user));
        return user;
    }

    public static PaymentDetails generatePaymentDetails(User user){
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setUser(user);
        paymentDetails.setCreditCardNumber(Integer.toString(randomInt()));
        return paymentDetails;
    }
}
