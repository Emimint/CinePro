package com.cinepro.backcinepro.salledecinema;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class SalleDeCinemaService {
    @Autowired
    SalleDeCinemaRepository salleDeCinemaRepository;

    public List<SalleDeCinema> list(){ return salleDeCinemaRepository.findAll();}

    public Optional<SalleDeCinema> getOne(Long id){ return salleDeCinemaRepository.findById(id);}

    public void save(SalleDeCinema salleDeCinema){salleDeCinemaRepository.save(salleDeCinema);}

    public void delete(Long id){
        salleDeCinemaRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return salleDeCinemaRepository.existsById(id);
    }
}
