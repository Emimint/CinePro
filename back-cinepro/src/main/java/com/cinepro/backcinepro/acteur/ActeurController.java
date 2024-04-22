package com.cinepro.backcinepro.acteur;


import com.cinepro.backcinepro.film.Film;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
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
    @DeleteMapping("/delete/{acteurId}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<String> deleteActeur(@PathVariable Long acteurId) throws IOException {
        Optional<Acteur> optionalActeur = acteurService.findById(acteurId);
        if (optionalActeur.isEmpty()) {
            return new ResponseEntity<>("Acteur non trouvé", HttpStatus.NOT_FOUND);
        }
        Acteur acteur = optionalActeur.get();
        acteurService.delete(acteurId);

        return new ResponseEntity<>("Acteur supprimé avec succès.", HttpStatus.OK);
    }

}
