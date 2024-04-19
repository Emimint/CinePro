package com.cinepro.backcinepro.adresse;

import com.cinepro.backcinepro.adresse.Adresse;
import com.cinepro.backcinepro.adresse.AdresseRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class AdresseService {
    @Autowired
    AdresseRepository adresseRepository;

    public List<Adresse> list(){
        return adresseRepository.findByOrderById();
    }

    public Optional<Adresse> getOne(Long id){
        return adresseRepository.findById(id);
    }

    public void save(Adresse adresse){
        adresseRepository.save(adresse);
    }

    public void delete(Long id){
        adresseRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return adresseRepository.existsById(id);
    }
}
