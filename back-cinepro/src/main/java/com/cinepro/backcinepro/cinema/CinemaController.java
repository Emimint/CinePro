package com.cinepro.backcinepro.cinema;

import com.cinepro.backcinepro.adresse.Adresse;
import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import com.cinepro.backcinepro.salledecinema.SalleDeCinemaRepository;
import com.cinepro.backcinepro.salledecinema.SalleDeCinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/cinemas")
@CrossOrigin(origins = "http://localhost:4200")
public class CinemaController {

    @Autowired
    private CinemaService cinemaService;

    @Autowired
    private SalleDeCinemaService salleDeCinemaService;

    @Autowired
    private SalleDeCinemaRepository salleDeCinemaRepository;

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

        List<SalleDeCinema> salleDeCinemas = salleDeCinemaRepository.findByCinemaId(id);
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
    public ResponseEntity<String> addCinema(
            @RequestParam("nomCinema") String nomCinema,
            @RequestParam("ville") String ville,
            @RequestParam("codePostal") String codePostal,
            @RequestParam("nomRue") String nomRue,
            @RequestParam("pays") String pays,
            @RequestParam("numeroCivique") String numeroCivique
    ) {
        Adresse adresse = new Adresse();
        adresse.setVille(ville);
        adresse.setCodePostal(codePostal);
        adresse.setNomRue(nomRue);
        adresse.setPays(pays);
        adresse.setNumeroCivique(numeroCivique);

        Cinema cinema = new Cinema();
        cinema.setNomCinema(nomCinema);
        cinema.setAdresse(adresse);

        cinemaService.save(cinema);

        initCinema(cinema);

        return new ResponseEntity<>("Cinéma ajouté avec succès ! ", HttpStatus.OK);
    }

    private void initCinema(Cinema cinema) {
        Random random = new Random();
        int numSalleDeCinemas = random.nextInt(8) + 3; // Generate random number between 3 and 10

        for (int i = 0; i < numSalleDeCinemas; i++) {
            SalleDeCinema salleDeCinema = new SalleDeCinema();
            salleDeCinema.setNumero(i + 1);
            salleDeCinema.setNbrSieges(random.nextInt(3) + 4);
            salleDeCinema.setNbrRangees(random.nextInt(3) + 2);
            salleDeCinema.setNbrSections(random.nextInt(5) + 4);
            salleDeCinema.setTotalDesSieges(salleDeCinema.getNbrSieges() * salleDeCinema.getNbrRangees() * salleDeCinema.getNbrSections());
            salleDeCinema.setCinema(cinema);

            salleDeCinemaService.save(salleDeCinema);
        }
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
