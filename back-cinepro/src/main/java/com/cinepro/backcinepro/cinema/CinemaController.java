package com.cinepro.backcinepro.cinema;

import com.cinepro.backcinepro.adresse.Adresse;
import com.cinepro.backcinepro.adresse.AdresseService;
import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import com.cinepro.backcinepro.salledecinema.SalleDeCinemaRepository;
import com.cinepro.backcinepro.salledecinema.SalleDeCinemaService;
import com.cinepro.backcinepro.seance.Seance;
import com.cinepro.backcinepro.seance.SeanceService;
import com.cinepro.backcinepro.siege.Siege;
import com.cinepro.backcinepro.siege.SiegeService;
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
    private SiegeService siegeService;

    @Autowired
    private SeanceService seanceService;

    @Autowired
    private AdresseService adresseService;

    @Autowired
    private SalleDeCinemaRepository salleDeCinemaRepository;

    @Autowired
    private CinemaRepository cinemaRepository;

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

    @GetMapping("/by-seance/{seanceId}")
    public ResponseEntity<Cinema> getCinemaBySeance(@PathVariable Long seanceId) {
        Optional<Seance> optionalSeance = seanceService.findById(seanceId);
        if (optionalSeance.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Seance seance = optionalSeance.get();
        Optional<Cinema> optionalCinema = cinemaRepository.findCinemaBySallesDeCinemasSeancesContains(seance);

        return optionalCinema.map(
                cinema -> new ResponseEntity<>(cinema, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)
                );
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
    // ****Pour activer SPRING SECURITY ****
    //    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<String> addCinema(
            @RequestParam("nomCinema") String nomCinema,
            @RequestParam("ville") String ville,
            @RequestParam("codePostal") String codePostal,
            @RequestParam("nomRue") String nomRue,
            @RequestParam("pays") String pays,
            @RequestParam("numeroCivique") String numeroCivique,
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude
    ) {
        Adresse adresse = new Adresse();
        adresse.setVille(ville);
        adresse.setCodePostal(codePostal);
        adresse.setNomRue(nomRue);
        adresse.setPays(pays);
        adresse.setNumeroCivique(numeroCivique);
        adresse.setLatitude(latitude);
        adresse.setLongitude(longitude);

        Cinema cinema = new Cinema();
        cinema.setNomCinema(nomCinema);
        cinema.setAdresse(adresse);

        cinemaService.save(cinema);

        initCinema(cinema);

        return new ResponseEntity<>("Cinéma ajouté avec succès ! ", HttpStatus.OK);
    }

    private void initCinema(Cinema cinema) {
        Random random = new Random();
        int numSalleDeCinemas = random.nextInt(8) + 3; // Génère un nombre aléatoire entre 3 et 10

        for (int i = 0; i < numSalleDeCinemas; i++) {
            SalleDeCinema salleDeCinema = new SalleDeCinema();
            salleDeCinema.setNumero(i + 1);
            salleDeCinema.setNbrSieges(random.nextInt(3) + 4);
            salleDeCinema.setNbrRangees(random.nextInt(3) + 2);
            salleDeCinema.setNbrSections(random.nextInt(5) + 4);
            salleDeCinema.setTotalDesSieges(salleDeCinema.getNbrSieges() * salleDeCinema.getNbrRangees() * salleDeCinema.getNbrSections());
            salleDeCinema.setCinema(cinema);

            cinema.setNbreDeSalles(numSalleDeCinemas);

            salleDeCinemaService.save(salleDeCinema);
        }
    }


    @PutMapping("/modifier/{id}")
    // ****Pour activer SPRING SECURITY ****
    //    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<Cinema> updateCinema(@PathVariable Long id, @RequestBody Cinema cinema) {
        if (!cinemaService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cinema.setId(id);
        Cinema updatedCinema = cinemaService.save(cinema);
        return new ResponseEntity<>(updatedCinema, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer/{id}")
    // ****Pour activer SPRING SECURITY ****
    //    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<String> deleteCinema(@PathVariable Long id) {
        Optional<Cinema> optionalCinema = cinemaService.getCinemaById(id);
        if (optionalCinema.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Cinema cinema = optionalCinema.get();

        Adresse adresse = cinema.getAdresse();
        if (adresse != null) {
            adresseService.delete(adresse.getId());
        }

        // On supprime de façon récursive les salles de cinéma et les sièges associés :
        List<SalleDeCinema> salleDeCinemas = cinema.getSallesDeCinemas();
        if (salleDeCinemas != null && !salleDeCinemas.isEmpty()) {
            for (SalleDeCinema salleDeCinema : salleDeCinemas) {
                List<Seance> seances = salleDeCinema.getSeances();
                if (seances != null && !seances.isEmpty()) {
                    for (Seance seance : seances) {
                        List<Siege> sieges = seance.getSieges();
                        if (sieges != null && !sieges.isEmpty()) {
                            for (Siege siege : sieges) {
                                siegeService.delete(siege.getId());
                            }
                        }
                        seanceService.delete(seance.getId());
                    }
                }
            }
        }

        cinemaService.delete(id);

        return new ResponseEntity<String>("Cinéma supprimé avec succès. ", HttpStatus.OK);
    }
}
