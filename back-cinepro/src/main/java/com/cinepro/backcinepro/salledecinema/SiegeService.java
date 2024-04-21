package com.cinepro.backcinepro.salledecinema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SiegeService {

    @Autowired
    private SiegeRepository siegeRepository;

    public List<Siege> findAll() {
        return siegeRepository.findAll();
    }

    public Optional<Siege> findById(Long id) {
        return siegeRepository.findById(id);
    }

    public void save(Siege siege) {
         siegeRepository.save(siege);
    }

    public void delete(Long id) {
        siegeRepository.deleteById(id);
    }
}
