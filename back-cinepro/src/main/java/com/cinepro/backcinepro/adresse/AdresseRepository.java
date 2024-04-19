package com.cinepro.backcinepro.adresse;


import com.cinepro.backcinepro.adresse.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdresseRepository extends JpaRepository<Adresse, Long> {

    List<Adresse> findByOrderById();
}
