package com.cinepro.backcinepro.adresse;


import com.cinepro.backcinepro.adresse.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AdresseRepository extends JpaRepository<Adresse, Long> {

    List<Adresse> findByOrderById();
}
