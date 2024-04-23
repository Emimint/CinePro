package com.cinepro.backcinepro.cinema;

import com.cinepro.backcinepro.adresse.Adresse;
import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cinemas")
@CrossOrigin(origins = "http://localhost:4200")
public class CinemaController {

    @Autowired
    private CinemaService cinemaService;

    @GetMapping("/tous")
    public ResponseEntity<List<Cinema>> getAllCinemas() {
        List<Cinema> cinemas = cinemaService.list();
        return new ResponseEntity<>(cinemas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cinema> getCinemaById(@PathVariable Long id) {
        Optional<Cinema> cinema = cinemaService.getCinemaById(id);
        return cinema.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/salle-de-cinema/{id}")
    public ResponseEntity<List<SalleDeCinema>> getSalleDeCinemaByCinemaId(@PathVariable Long id) {
        Optional<Cinema> optionalCinema = cinemaService.getCinemaById(id);
        if (optionalCinema.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<SalleDeCinema> salleDeCinemas = optionalCinema.get().getSalleDeCinemas();
        return new ResponseEntity<>(salleDeCinemas, HttpStatus.OK);
    }

    @GetMapping("/adresse/{id}")
    public ResponseEntity<Adresse> getCinemaAddressById(@PathVariable Long id) {
        Optional<Cinema> optionalCinema = cinemaService.getCinemaById(id);
        if (optionalCinema.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Adresse adresse = optionalCinema.get().getAdresse();
        if (adresse == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(adresse, HttpStatus.OK);
    }



    @PostMapping("/ajouter")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<Cinema> addCinema(@RequestBody Cinema cinema) {
        Cinema savedCinema = cinemaService.save(cinema);
        return new ResponseEntity<>(savedCinema, HttpStatus.CREATED);
    }

    @PutMapping("/modifier/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<Cinema> updateCinema(@PathVariable Long id, @RequestBody Cinema cinema) {
        if (!cinemaService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cinema.setId(id);
        Cinema updatedCinema = cinemaService.save(cinema);
        return new ResponseEntity<>(updatedCinema, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<Void> deleteCinema(@PathVariable Long id) {
        if (!cinemaService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cinemaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
