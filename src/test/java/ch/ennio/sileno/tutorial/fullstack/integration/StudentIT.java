package ch.ennio.sileno.tutorial.fullstack.integration;

import ch.ennio.sileno.tutorial.fullstack.student.Gender;
import ch.ennio.sileno.tutorial.fullstack.student.Student;
import ch.ennio.sileno.tutorial.fullstack.student.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;


import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@AutoConfigureMockMvc
public class StudentIT {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private StudentRepository studentRepository;

    @Test
    void shouldRegisterNewStudent() throws Exception {
        //given
        Student student = new Student(
                "Jamila",
                "j@gmail.com",
                Gender.FEMALE
        );
        //when
        ResultActions resultActions = mockMvc.perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)));
        //then
        resultActions.andExpect(status().isOk());
        List<Student> students =  studentRepository.findAll();
        assertThat(students)
                .usingRecursiveFieldByFieldElementComparatorIgnoringFields("id")
                .contains(student);
    }
}
