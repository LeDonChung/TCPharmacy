package vn.edu.iuh.fit.pharmacy.POJOs;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "points_histories")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PointHistory {
    @Id
    @Column(name = "point_history_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int pointsChange;

    private int pointsBalance;

    private int changeType;

    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "point_id")
    private Point point;

    // Order
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
