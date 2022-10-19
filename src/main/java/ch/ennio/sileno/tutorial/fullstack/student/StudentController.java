package ch.ennio.sileno.tutorial.fullstack.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        return List.of(
                new Student(
                        1L,
                        "Ennio",
                        "e@gmail.com",
                        Gender.MALE),
                new Student(
                        2L,
                        "Manu",
                        "m@gmail.com",
                        Gender.MALE
                )
        );
    }
}
