package com.cinepro.backcinepro.repository;


import com.cinepro.backcinepro.entity.Personne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonneRepository extends JpaRepository<Personne, Long> {

}
