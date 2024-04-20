package com.cinepro.backcinepro.acteur;

import com.cinepro.backcinepro.film.Film;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ActeurService {

    @Autowired
    ActeurRepository acteurRepository;
    public List<Acteur> findAll() {
        return acteurRepository.findAll();
    }
    public Optional<Acteur> findById(Long id) {
        return acteurRepository.findById(id);
    }
    public Acteur save(Acteur acteur) {
        return acteurRepository.save(acteur);
    }
    public void delete(Long id) {
        acteurRepository.deleteById(id);
    }
    public boolean exists(Long id){
        return acteurRepository.existsById(id);
    }
}
