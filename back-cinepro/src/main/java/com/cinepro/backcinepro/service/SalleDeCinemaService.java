package com.cinepro.backcinepro.service;

import com.cinepro.backcinepro.entity.Cinema;
import com.cinepro.backcinepro.entity.Personne;
import com.cinepro.backcinepro.entity.SalleDeCinema;
import com.cinepro.backcinepro.repository.PersonneRepository;
import com.cinepro.backcinepro.repository.SalleDeCinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class SalleDeCinemaService {
    @Autowired
    SalleDeCinemaRepository salleDeCinemaRepository;

    public List<SalleDeCinema> list(){ return salleDeCinemaRepository.findByOrderById();}

    public Optional<SalleDeCinema> getOne(Long id){ return salleDeCinemaRepository.findById(id);}

    public void save(SalleDeCinema salleDeCinema){salleDeCinemaRepository.save(salleDeCinema);}

    public void delete(Long id){
        salleDeCinemaRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return salleDeCinemaRepository.existsById(id);
    }
}
