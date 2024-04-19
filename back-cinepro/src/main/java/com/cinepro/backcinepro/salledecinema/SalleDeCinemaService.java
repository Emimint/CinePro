package com.cinepro.backcinepro.salledecinema;

import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import com.cinepro.backcinepro.salledecinema.SalleDeCinemaRepository;
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