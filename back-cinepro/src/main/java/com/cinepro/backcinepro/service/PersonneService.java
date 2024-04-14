package com.cinepro.backcinepro.service;


import com.cinepro.backcinepro.entity.Personne;
import com.cinepro.backcinepro.repository.PersonneRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class PersonneService {
    @Autowired
    PersonneRepository personneRepository;

    public List<Personne> findAll() {
        return personneRepository.findAll();
    }

    public Optional<Personne> findById(Long id) {
        return personneRepository.findById(id);
    }

    public Personne save(Personne personne) {
        return personneRepository.save(personne);
    }

    public void delete(Long id) {
        personneRepository.deleteById(id);
    }

    public boolean exists(Long id) {
        return personneRepository.existsById(id);
    }
}
