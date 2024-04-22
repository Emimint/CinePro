package com.cinepro.backcinepro.realisateur;
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
public class RealisateurController {

    @Autowired
    private RealisateurService realisateurService;

    @GetMapping("/realisateur/{id}")
    public ResponseEntity<Realisateur> getRealisateur(@PathVariable Long id) {
        Optional<Realisateur> realisateur = realisateurService.findById(id);
        return realisateur.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @DeleteMapping("/delete/{realisateurId}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<String> deleteRealisateur(@PathVariable Long realisateurId) throws IOException {
        Optional<Realisateur> optionalRealisateur = realisateurService.findById(realisateurId);
        if (optionalRealisateur.isEmpty()) {
            return new ResponseEntity<>("Realisateur non trouvé", HttpStatus.NOT_FOUND);
        }
        Realisateur realisateur = optionalRealisateur.get();
        realisateurService.delete(realisateurId);

        return new ResponseEntity<>("Realisateur supprimé avec succès.", HttpStatus.OK);
    }

}
