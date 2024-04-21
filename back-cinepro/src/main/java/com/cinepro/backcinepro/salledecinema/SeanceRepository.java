package com.cinepro.backcinepro.salledecinema;

import com.cinepro.backcinepro.film.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeanceRepository extends JpaRepository<Seance,Long> {

    List<Seance> findByOrderById();
}
