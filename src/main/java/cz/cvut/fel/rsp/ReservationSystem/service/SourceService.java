package cz.cvut.fel.rsp.ReservationSystem.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.SourceRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class SourceService {


    private final SourceRepository dao;

    @Autowired
    public SourceService(SourceRepository dao) {
        this.dao = dao;
    }

    @Transactional(readOnly = true)
    public List<Source> findAll() {
        return dao.findAll();
    }

    @Transactional(readOnly = true)
    public Source getById(Long id) {
        return dao.getById(id);
    }

    @Transactional
    public void flush() {
        dao.flush();
    }

    @Transactional
    public boolean exists(Long id) {
        return dao.existsById(id);
    }
}
