package com.cinepro.backcinepro.repository;


import com.cinepro.backcinepro.entity.SalleDeCinema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalleDeCinemaRepository extends JpaRepository<SalleDeCinema, Long> {

    List<SalleDeCinema> findByOrderById();
}
