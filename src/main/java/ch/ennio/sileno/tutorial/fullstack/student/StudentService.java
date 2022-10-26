package ch.ennio.sileno.tutorial.fullstack.student;

import ch.ennio.sileno.tutorial.fullstack.student.exception.BadRequestException;
import ch.ennio.sileno.tutorial.fullstack.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        Boolean emailAlreadyInUse = studentRepository.
                selectExistsEmail(student.getEmail());
        if(emailAlreadyInUse) {
            throw new BadRequestException(
                    "Email " + student.getEmail() + " is already taken"
            );
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if(!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException(
                    "Student with id: " + studentId + " does not exist"
            );
        }
        studentRepository.deleteById(studentId);
    }
}
