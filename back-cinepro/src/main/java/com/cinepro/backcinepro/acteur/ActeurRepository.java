package com.cinepro.backcinepro.acteur;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActeurRepository extends JpaRepository<Acteur, Long> {

    List<Acteur> findByOrderById();
}
