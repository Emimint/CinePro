package com.cinepro.backcinepro.repository;


import com.cinepro.backcinepro.entity.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdresseRepository extends JpaRepository<Adresse, Long> {

    List<Adresse> findByOrderById();
}
