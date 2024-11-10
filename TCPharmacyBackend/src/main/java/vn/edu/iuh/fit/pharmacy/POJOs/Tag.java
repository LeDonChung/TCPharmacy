package vn.edu.iuh.fit.pharmacy.POJOs;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tags")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Tag {
    @Id
    @Column(name = "tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "des", columnDefinition = "TEXT")
    private String des;

    @ManyToOne
    @JoinColumn(name = "tag_group_id")
    private TagGroup tagGroup;
}
