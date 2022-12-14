package ch.ennio.sileno.tutorial.fullstack.student;

import ch.ennio.sileno.tutorial.fullstack.student.exception.BadRequestException;
import ch.ennio.sileno.tutorial.fullstack.student.exception.StudentNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;
    private StudentService underTest;

    @BeforeEach
    void setUp() {
        underTest = new StudentService(studentRepository);
    }

    @Test
    void verifyFindAllCalled_WhenGetAllStudents() {
        //when
        underTest.getAllStudents();
        //then
        verify(studentRepository).findAll();
    }

    @Test
    void shouldAddStudent_WhenAddStudent_GivenStudentEmailNotTaken() {
        //given
        Student student = new Student(
                "Jamila",
                "j@gmail.com",
                Gender.FEMALE
        );
        //when
        underTest.addStudent(student);
        //then
        ArgumentCaptor<Student> studentArgumentCaptor =
                ArgumentCaptor.forClass(Student.class);
        verify(studentRepository).save(studentArgumentCaptor.capture());
        Student capturedStudent = studentArgumentCaptor.getValue();
        assertEquals(student, capturedStudent);
    }

    @Test
    void shouldThrowException_WhenAddStudent_GivenStudentEmailAlreadyTaken() {
        //given
        Student student = new Student(
                "Jamila",
                "j@gmail.com",
                Gender.FEMALE
        );
        given(studentRepository.selectExistsEmail(student.getEmail()))
                .willReturn(true);
        //then
        assertThatThrownBy(() -> underTest.addStudent(student))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining(
                        "Email " + student.getEmail() + " is already taken"
                );

        verify(studentRepository, never()).save(any());
    }

    @Test
    void verifyDeleteStudent_WhenDeleteStudent_GivenStudentIdExistsInDB() {
        // given
        long id = 10;
        given(studentRepository.existsById(id))
                .willReturn(true);
        // when
        underTest.deleteStudent(id);

        // then
        verify(studentRepository).deleteById(id);
    }

    @Test
    void shouldThrowException_WhenDeleteStudent_GivenStudentIdNotFound() {
        // given
        long id = 10;
        given(studentRepository.existsById(id))
                .willReturn(false);
        // when
        // then
        assertThatThrownBy(() -> underTest.deleteStudent(id))
                .isInstanceOf(StudentNotFoundException.class)
                .hasMessageContaining("Student with id: " + id + " does not exists");

        verify(studentRepository, never()).deleteById(any());
    }
}