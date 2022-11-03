package ch.ennio.sileno.tutorial.fullstack.student;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class StudentRepositoryTest {

    @Autowired
    private StudentRepository underTest;

    @Test
    void shouldReturnTrue_WhenSelectExistsEmail_GivenStudentExists() {
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
}