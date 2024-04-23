package com.cinepro.backcinepro.cinema;

import com.cinepro.backcinepro.cinema.Cinema;
import com.cinepro.backcinepro.cinema.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CinemaService {
    @Autowired
    CinemaRepository cinemaRepository;

    public List<Cinema> list(){
        return cinemaRepository.findByOrderById();
    }

    public Optional<Cinema> getCinemaById(Long id) {
        return cinemaRepository.findById(id);
    }

    public Cinema save(Cinema cinema){
        return cinemaRepository.save(cinema);
    }

    public void delete(Long id){
        cinemaRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return cinemaRepository.existsById(id);
    }
}
