package com.cinepro.backcinepro.service;

import com.cinepro.backcinepro.entity.Adresse;
import com.cinepro.backcinepro.entity.Cinema;
import com.cinepro.backcinepro.repository.AdresseRepository;
import com.cinepro.backcinepro.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class CinemaService {
    @Autowired
    CinemaRepository cinemaRepository;

    public List<Cinema> list(){
        return cinemaRepository.findByOrderById();
    }

    public Optional<Cinema> getOne(Long id){
        return cinemaRepository.findById(id);
    }

    public void save(Cinema cinema){
        cinemaRepository.save(cinema);
    }

    public void delete(Long id){
        cinemaRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return cinemaRepository.existsById(id);
    }
}
