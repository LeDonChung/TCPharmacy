package vn.edu.iuh.fit.pharmacy.POJOs;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "orders_details")
@Entity
public class OrderDetail {

    @EmbeddedId
    private OrderDetailId id;

    private int quantity;

    private double price;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;
}
