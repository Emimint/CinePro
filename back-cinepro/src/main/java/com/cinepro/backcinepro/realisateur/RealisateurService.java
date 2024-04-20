package com.cinepro.backcinepro.realisateur;

import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class RealisateurService {

    @Autowired
    RealisateurRepository realisateurRepository;

    public List<Realisateur> findAll(){
        return realisateurRepository.findAll();
    }

    public Optional<Realisateur> findById(Long id){ return realisateurRepository.findById(id);}

    public void save(Realisateur realisateur){realisateurRepository.save(realisateur);}

    public void delete(Long id){
        realisateurRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return realisateurRepository.existsById(id);
    }
}
