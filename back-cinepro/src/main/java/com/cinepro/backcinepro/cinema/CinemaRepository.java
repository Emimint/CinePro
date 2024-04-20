package com.cinepro.backcinepro.cinema;

import com.cinepro.backcinepro.cinema.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {

    List<Cinema> findByOrderById();
}
