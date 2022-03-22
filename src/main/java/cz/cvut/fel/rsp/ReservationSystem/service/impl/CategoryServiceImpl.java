package cz.cvut.fel.rsp.ReservationSystem.service.impl;

import cz.cvut.fel.rsp.ReservationSystem.dao.CategoryRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.EventRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.SourceRepository;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.service.interfaces.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//todo add data check

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository dao;
    private final SourceRepository sourceDao;
    private final EventRepository eventDao;

    @Autowired
    public CategoryServiceImpl(CategoryRepository dao, SourceRepository sourceDao, EventRepository eventDao) {
        this.dao = dao;
        this.sourceDao = sourceDao;
        this.eventDao = eventDao;
    }

    @Override
    public void createCategory(String categoryName, Source source) {
        Category category = new Category();
        category.setName(categoryName);
        source.getCategories().add(category);
        dao.save(category);
        sourceDao.save(source);
    }

    @Override
    public void removeCategory(Category category) {

    }

    @Override
    public void addEventToCategory(Event event, Category category) {

    }

    @Override
    public void removeEventFromCategory(Event event, Category category) {

    }

    @Override
    public void update(Category category) {

    }

    //todo
    @Override
    public void remove(Category toRemove, Category moveEventsTo) {

    }
}
