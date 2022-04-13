package cz.cvut.fel.rsp.ReservationSystem.service.security;

import cz.cvut.fel.rsp.ReservationSystem.dao.UserRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userDao;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userDao.getUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }
        return UserDetailsImpl.build(user);
    }
}

