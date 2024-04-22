package com.cinepro.backcinepro.realisateur;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RealisateurRepository extends JpaRepository<Realisateur, Long> {

    List<Realisateur> findByOrderById();

    Optional<Realisateur> findByNomRealisateur(String nomRealisateur);

    Optional<Realisateur> findByPrenomRealisateur(String prenomRealisateur);
}
