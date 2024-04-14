package com.cinepro.backcinepro.repository;

import com.cinepro.backcinepro.entity.Adresse;
import com.cinepro.backcinepro.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {

    List<Cinema> findByOrderById();
}
