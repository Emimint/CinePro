package com.cinepro.backcinepro.salledecinema;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SiegeRepository extends JpaRepository<Siege, Long> {

    List<Siege> findByOrderById();
}
