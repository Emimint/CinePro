package com.cinepro.backcinepro.film;


import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FilmService {

    @Autowired
    FilmRepository filmRepository;

    public List<Film> findAll() {
        return filmRepository.findAll();
    }

    public Optional<Film> findById(Long id) {
        return filmRepository.findById(id);
    }

    public Film save(Film movie) {
        return filmRepository.save(movie);
    }

    public void delete(Long id) {
        filmRepository.deleteById(id);
    }

    public boolean exists(Long id) {
        return filmRepository.existsById(id);
    }

    public int getClassement( Film film ) {
        // TODO : implement based on total number of reservations for a film
        return 0;
    }
}
