package ch.ennio.sileno.tutorial.fullstack.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class StudentRepositoryTest {

    @Autowired
    private StudentRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void shouldReturnTrue_WhenSelectExistsEmail_GivenStudentExistsInDB() {
        // given
        String email = "j@gmail.com";
        Student student = new Student(
                "Jamila",
                email,
                Gender.FEMALE
        );
        underTest.save(student);

        // when
        boolean studentExists = underTest.selectExistsEmail(email);

        // then
        assertTrue(studentExists);
    }

    @Test
    void shouldReturnFalse_WhenSelectExistsEmail_GivenStudentNotExistsInDB() {
        // given
        String email = "j@gmail.com";

        // when
        boolean studentExists = underTest.selectExistsEmail(email);

        // then
        assertFalse(studentExists);
    }
}