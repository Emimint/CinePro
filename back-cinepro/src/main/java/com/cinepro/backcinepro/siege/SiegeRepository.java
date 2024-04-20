package com.cinepro.backcinepro.siege;

import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SiegeRepository extends JpaRepository<Siege, Long> {

    List<Siege> findByOrderById();
}
