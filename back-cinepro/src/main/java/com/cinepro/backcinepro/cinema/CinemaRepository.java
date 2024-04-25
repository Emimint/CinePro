package com.cinepro.backcinepro.cinema;

import com.cinepro.backcinepro.cinema.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CinemaRepository extends JpaRepository<Cinema, Long> {

    List<Cinema> findByNomCinema(String nomCinema);

    List<Cinema> findByOrderById();
}
