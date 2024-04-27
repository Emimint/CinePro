package com.cinepro.backcinepro.cinema;

import com.cinepro.backcinepro.cinema.Cinema;
import com.cinepro.backcinepro.seance.Seance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CinemaRepository extends JpaRepository<Cinema, Long> {

    List<Cinema> findByNomCinema(String nomCinema);

    List<Cinema> findByOrderById();

    Optional<Cinema> findCinemaBySallesDeCinemasSeancesContains(Seance seance);

}
