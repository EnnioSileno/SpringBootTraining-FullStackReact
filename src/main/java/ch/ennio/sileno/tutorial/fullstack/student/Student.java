package ch.ennio.sileno.tutorial.fullstack.student;

import lombok.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Long id;
    private String name;
    private String email;
    private Gender gender;
}
