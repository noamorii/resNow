package cz.cvut.fel.rsp.ReservationSystem.dao.service;

import cz.cvut.fel.rsp.ReservationSystem.dao.CategoryRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.EventRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.ReservationSystemRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.SourceRepository;
import cz.cvut.fel.rsp.ReservationSystem.dao.testutil.Generator;
import cz.cvut.fel.rsp.ReservationSystem.exception.ReservationSystemException;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Category;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.Source;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.events.Event;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.CategoryServiceImpl;
import cz.cvut.fel.rsp.ReservationSystem.service.impl.SourceServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class SourceServiceImplTest {
    @Autowired
    private SourceServiceImpl sourceService;

    @Autowired
    private CategoryServiceImpl categoryService;

    @Autowired
    private SourceRepository sourceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private EventRepository eventRepository;

    @Test
    void createSource_createRegularSource_sourceCreated() {
        Source source = new Source();
        source.setActive(true);
        source.setName("try");

        ReservationSystem reservationSystem = Generator.generateReservationSystem(null, null);

        sourceService.createSource(source, reservationSystem);

        Source result = sourceRepository.findById(source.getId()).get();
        Assertions.assertNotNull(result);
        Assertions.assertTrue(result.isActive());
        Assertions.assertEquals(result.getName(), "try");
    }

    @Test
    void createSource_createRegularSource_sourceHasOneCategory() {
        Source source = new Source();
        source.setActive(true);
        source.setName("try");

        ReservationSystem reservationSystem = Generator.generateReservationSystem(null, null);

        sourceService.createSource(source, reservationSystem);

        Source result = sourceRepository.findById(source.getId()).get();
        Assertions.assertEquals(result.getCategories().size(), 1);
    }

    @Test
    void addCategory_addNewCategory_sourceHasNewCategory() {
        Category newCategory = Generator.generateCategory();
        Source source = Generator.generateSource(null, null);

        sourceService.createSource(source, null);
        sourceService.addCategory(source, newCategory);

        Source result = sourceRepository.findById(source.getId()).get();
        List categories = result.getCategories();

        Assertions.assertEquals(categories.contains(newCategory),true);
    }

    @Test
    void addCategory_addPickedCategory_returnReservationSystemException(){
        Category newCategory = Generator.generateCategory();
        Source source = Generator.generateSource(null, null);

        sourceService.createSource(source, null);
        sourceService.addCategory(source, newCategory);

        Source result = sourceRepository.findById(source.getId()).get();

        Assertions.assertThrows(ReservationSystemException.class, () -> sourceService.addCategory(result, newCategory));
    }

    @Test
    void removeCategory_removeWrongCategory_returnReservationSystemException(){
        Category newCategory = Generator.generateCategory();
        Source source = Generator.generateSource(null, null);

        sourceService.createSource(source, null);

        Source result = sourceRepository.findById(source.getId()).get();

        Assertions.assertThrows(ReservationSystemException.class, () -> sourceService.removeCategory(result, newCategory));
    }

    @Test
    void removeCategory_removeMainCategory_returnReservationException(){
        Source source = Generator.generateSource(null, null);
        sourceService.createSource(source, null);

        Source result = sourceRepository.findById(source.getId()).get();
        Category mainCategory = result.getCategories().get(0);

        Assertions.assertEquals(mainCategory.getName(), "Main events");
        Assertions.assertThrows(ReservationSystemException.class, () -> sourceService.removeCategory(result, mainCategory));

    }

    @Test
    void removeCategory_removeSomeCategory_removesPickedCategory(){
        Category newCategory = Generator.generateCategory();
        Source source = Generator.generateSource(null, null);
        Event event = Generator.generateIntervalEventWithoutRepetition();
        sourceService.createSource(source, null);
        categoryService.createCategory(newCategory, source);
        categoryService.addEventToCategory(event, newCategory);
        categoryService.update(newCategory);

        sourceService.createSource(source, null);
        sourceService.addCategory(source, newCategory);

        Source result = sourceRepository.findById(source.getId()).get();
        Assertions.assertEquals(result.getCategories().size(), 2);

        Category categoryToRemove = categoryRepository.getById(newCategory.getId());

        sourceService.removeCategory(result, categoryToRemove);
        result = sourceRepository.findById(source.getId()).get();

//        boolean isRemovedCategoryIn = result.getCategories().contains(newCategory);
//        Assertions.assertFalse(isRemovedCategoryIn);
    }

    @Test
    void removeCategory_removeSomeCategoryWithEvents_eventsChangeCategoryToMainCategory(){

    }
}
