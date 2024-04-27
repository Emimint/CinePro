package com.cinepro.backcinepro.siege;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SiegeService {
    @Autowired
    SiegeRepository siegeRepository;

    public List<Siege> findAll() {
        return siegeRepository.findAll();
    }

    public Optional<Siege> findById(Long id) {
        return siegeRepository.findById(id);
    }

    public Siege save(Siege siege) {
        return siegeRepository.save(siege);
    }

    public void delete(Long id) {
        siegeRepository.deleteById(id);
    }

    public boolean exists(Long id) {
        return siegeRepository.existsById(id);
    }
}
