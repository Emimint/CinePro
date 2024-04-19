package com.cinepro.backcinepro.salledecinema;


import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalleDeCinemaRepository extends JpaRepository<SalleDeCinema, Long> {

    List<SalleDeCinema> findByOrderById();
}
