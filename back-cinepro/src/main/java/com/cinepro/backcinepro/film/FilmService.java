package com.cinepro.backcinepro.film;


import com.cinepro.backcinepro.cinema.Cinema;
import com.cinepro.backcinepro.seance.Seance;
import com.cinepro.backcinepro.seance.SeanceRepository;
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

    @Autowired
    SeanceRepository seanceRepository;

    public List<Film> findAll() {
        return filmRepository.findAll();
    }

    public Optional<Film> findById(Long id) {
        return filmRepository.findById(id);
    }

    public List<Cinema> findCinemasByFilmId(Long filmId) {
        return filmRepository.findCinemasByFilmId(filmId);
    }

    public Film save(Film film) {
        return filmRepository.save(film);
    }

    public void delete(Long id) {
        filmRepository.deleteById(id);
    }

    public boolean exists(Long id) {
        return filmRepository.existsById(id);
    }


    public int getClassement( Film film ) {
        // TODO : créér une méthode qui retourne le classement d'un film
        return 0;
    }

    public List<Seance> getSeancesByFilmId(Long filmId) {
        Optional<Film> filmOptional = filmRepository.findById(filmId);
        if (filmOptional.isPresent()) {
            Film film = filmOptional.get();
            return film.getSeances();
        }
        return null;
    }
}
