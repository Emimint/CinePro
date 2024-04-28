package com.cinepro.backcinepro.salledecinema;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SalleDeCinemaRepository extends JpaRepository<SalleDeCinema, Long> {

    List<SalleDeCinema> findByCinemaId(Long cinemaId);

    @Transactional
    void deleteByCinemaId(Long cinemaId);
}
