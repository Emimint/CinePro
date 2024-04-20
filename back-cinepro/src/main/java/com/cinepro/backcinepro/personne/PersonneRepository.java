package com.cinepro.backcinepro.personne;


import com.cinepro.backcinepro.personne.Personne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonneRepository extends JpaRepository<Personne, Long> {

}
