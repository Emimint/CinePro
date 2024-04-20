package com.cinepro.backcinepro.acteur;


import com.cinepro.backcinepro.film.Film;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class ActeurController {

    @Autowired
    ActeurService acteurService;

    @GetMapping("/acteur/{id}")
    public ResponseEntity<Acteur> getActeur(@PathVariable Long id) {
        Optional<Acteur> acteur = acteurService.findById(id);
        return acteur.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
