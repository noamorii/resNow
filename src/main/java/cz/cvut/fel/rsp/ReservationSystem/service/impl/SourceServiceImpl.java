package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.SourceRepository;
import cz.cvut.fel.rsp.ReservationSystem.exception.ReservationSystemException;
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
        if (source.getAddress()!=null){
            source.setAddress(null);
            dao.save(source);
        }
    }

    @Override
    @Transactional
    public void addAddress(Source source, Address address) {
        if (source.getAddress()== null){
            source.setAddress(address);
            dao.save(source);
        }
        else{
            throw new ReservationSystemException("Source already has address");
        }
    }
}
