package ch.ennio.sileno.tutorial.fullstack.student;

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
        //TODO check if email is already taken
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        //TODO check if student exists
        studentRepository.deleteById(studentId);
    }
}
