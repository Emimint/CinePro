package com.cinepro.backcinepro.film;

import com.cinepro.backcinepro.cinema.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {
    List<Film> findByOrderById();

    @Query("SELECT DISTINCT sd.cinema FROM SalleDeCinema sd JOIN sd.seances s WHERE s.film.id = :filmId")
    List<Cinema> findCinemasByFilmId(Long filmId);
}

