package com.cinepro.backcinepro.salledecinema;

import com.cinepro.backcinepro.film.Image;
import com.cinepro.backcinepro.film.ImageRepository;
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

    public List<Seance> list(){
        return seanceRepository.findByOrderById();
    }

    public Optional<Seance> getOne(Long id){
        return seanceRepository.findById(id);
    }

    public void save(Seance seance){
        seanceRepository.save(seance);
    }

    public void delete(Long id){
        seanceRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return seanceRepository.existsById(id);
    }
}
