package com.cinepro.backcinepro.seance;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SeanceService {
    @Autowired
    SeanceRepository seanceRepository;

    public List<Seance> findAll() {
        return seanceRepository.findAll();
    }

    public Optional<Seance> findById(Long id) {
        return seanceRepository.findById(id);
    }

    public Seance save(Seance seance) {
        return seanceRepository.save(seance);
    }

    public void delete(Long id) {
        seanceRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return seanceRepository.existsById(id);
    }
}
