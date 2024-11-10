package vn.edu.iuh.fit.pharmacy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.pharmacy.POJOs.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}