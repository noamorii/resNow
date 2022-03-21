package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.SourceRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Address;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.SourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SourceServiceImpl implements SourceService {
    private final SourceRepository dao;

    @Autowired
    public SourceServiceImpl(SourceRepository dao) {
        this.dao = dao;
    }

    @Transactional(readOnly = true)
    public List<Source> findAll() {
        return dao.findAll();
    }

    @Transactional(readOnly = true)
    public Source find(Integer id) {
        return dao.getById(id);
    }

    @Transactional
    public void flush() {
        dao.flush();
    }

    @Transactional
    public boolean exists(Integer id) {
        return dao.existsById(id);
    }

    @Override
    @Transactional
    public void createSource(Source source, ReservationSystem reservationSystem) {
        source.setReservationSystem(reservationSystem);

        Category initialCategory = new Category();
        initialCategory.setName("Main events");
        initialCategory.setSource(source);
        source.setCategories(Arrays.asList(initialCategory));

        dao.save(source);
    }

    @Override
    @Transactional
    public void removeAddress(Source source) {
        try {
            Source sourceToChange = dao.getById(source.getId());
            sourceToChange.setAddress(null);
            dao.save(sourceToChange);
        }catch (Exception e){
            throw new NoSuchElementException();
        }
    }

    @Override
    @Transactional
    public void addAddress(Source source, Address address) {
        try {
            Source sourceToChange = dao.getById(source.getId());
            sourceToChange.setAddress(address);
            dao.save(sourceToChange);
        }catch (Exception e){
            throw new NoSuchElementException();
        }
    }
}
