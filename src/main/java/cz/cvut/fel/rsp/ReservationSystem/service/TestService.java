package cz.cvut.fel.rsp.ReservationSystem.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestService {

    @Autowired
    UserRepository user;

    public void test(){
        user.flush();
    }
}
