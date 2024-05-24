package com.example.Immersiveproject.repositories;

import com.example.Immersiveproject.entities.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends CrudRepository<Products, Integer>, PagingAndSortingRepository<Products, Integer> {
    Optional<Products> findById(Integer Id);

    @Query("SELECT p FROM Products p WHERE " +
            "(:name IS NULL OR p.Name LIKE %:name%)" +
            "AND (:featured IS NULL OR (p.featured = TRUE AND :featured = TRUE)) " +
            "AND (:categories IS NULL OR p.category IN :categories)" +
            "AND ((:min IS NOT NULL AND :max IS NOT NULL AND p.price >= :min AND p.price <= :max) OR (:min IS NULL OR :max IS NULL))")
    Page<Products> findProductsByFilters(@Param("name") String name,
                                         @Param("categories") List<String> categories,
                                         @Param("featured") Boolean featured,
                                         @Param("min") Double min,
                                         @Param("max") Double max,
                                         Pageable pageable);

}
