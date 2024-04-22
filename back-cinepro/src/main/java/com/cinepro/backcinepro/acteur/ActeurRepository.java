package com.cinepro.backcinepro.acteur;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActeurRepository extends JpaRepository<Acteur, Long> {
    List<Acteur> findByOrderById();
    Optional<Acteur> findByNomActeur(String nomActeur);
    Optional<Acteur> findByPrenomActeur(String prenomActeur);
}
