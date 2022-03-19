package cz.cvut.fel.rsp.ReservationSystem;

import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application {

	@GetMapping("/welcome")
	public String welcome(){
		return "Welcome";
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
