package com.cinepro.backcinepro.film;


import com.cinepro.backcinepro.config.CloudinaryService;
import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import com.cinepro.backcinepro.salledecinema.SalleDeCinemaService;
import com.cinepro.backcinepro.seance.Seance;
import com.cinepro.backcinepro.seance.SeanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/films")
@CrossOrigin(origins = "http://localhost:4200")
public class FilmController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private FilmService filmService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private SalleDeCinemaService salleDeCinemaService;

    @Autowired
    private SeanceService seanceService;

    @GetMapping("/tous")
    public ResponseEntity<List<Film>> getAllFilms() {
        List<Film> films = filmService.findAll();
        return new ResponseEntity<List<Film>>(films, HttpStatus.OK);
    }

    @GetMapping("/film/{id}")
    public ResponseEntity<Film> getFilm(@PathVariable Long id) {
        Optional<Film> film = filmService.findById(id);
        return film.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/image/{filmId}")
    public ResponseEntity<Image> getFilmImage(@PathVariable Long filmId) {
        Optional<Film> optionalFilm = filmService.findById(filmId);
        if (optionalFilm.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Film film = optionalFilm.get();
        Image image = film.getImage();
        if (image == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Indicates that the request was successful but there is no content to return
        }

        return new ResponseEntity<>(image, HttpStatus.OK);
    }


    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<String> uploadFilm(@RequestParam("file") MultipartFile multipartFile,
                                              @RequestParam("titre") String titre,
                                              @RequestParam("langue") String langue,
                                              @RequestParam("soustitre") String soustitre,
                                              @RequestParam("doublage") String doublage,
                                              @RequestParam("titreOriginal") String titreOriginal,
                                              @RequestParam("categorie") String categorie,
                                             @RequestParam("listeActeurs") String listeActeurs,
                                             @RequestParam("listeRealisateurs") String listeRealisateurs,
                                             @RequestParam("duree") String duree,
                                             @RequestParam("videoUrl") String videoUrl,
                                              @RequestParam("description") String description,
                                              @RequestParam("dateDeSortie") String dateDeSortieStr) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>("Image non valide!", HttpStatus.BAD_REQUEST);
        }

        // Upload image to Cloudinary
        Map result = cloudinaryService.upload(multipartFile);
        Image image = new Image((String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
        imageService.save(image);

        Date dateDeSortie;
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            dateDeSortie = dateFormat.parse(dateDeSortieStr);
        } catch (ParseException e) {
            return new ResponseEntity<>("Format de date invalide! Utilisez yyyy-MM-dd", HttpStatus.BAD_REQUEST);
        }

        Film film = new Film();
        film.setTitre(titre);
        film.setLangue(langue);
        film.setSoustitre(soustitre);
        film.setDoublage(doublage);
        film.setTitreOriginal(titreOriginal);
        film.setCategorie(categorie);
        film.setListeActeurs(listeActeurs);
        film.setListeRealisateurs(listeRealisateurs);
        film.setDescription(description);
        film.setDuree(duree);
        film.setVideoUrl(videoUrl);
        film.setDateDeSortie(dateDeSortie);
        film.setClassement(filmService.getClassement(film));
        film.setImage(image);
        filmService.save(film);

        initSeances(film);

        return new ResponseEntity<>("Film ajouté avec succès ! ", HttpStatus.OK);
    }

    private void initSeances(Film film) {
        Random random = new Random();
        int numSeances = random.nextInt(6) + 10;

        for (int i = 0; i < numSeances; i++) {
            Seance seance = new Seance();
            seance.setFilm(film);

            Calendar calendar = new GregorianCalendar();
            calendar.add(Calendar.MONTH, 1);
            int hourOfDay = random.nextInt(10) + 13;
            int minute = random.nextInt(12) * 5;
            calendar.set(Calendar.HOUR_OF_DAY, hourOfDay);
            calendar.set(Calendar.MINUTE, minute);
            seance.setHeureDebut(calendar.getTime());

            seance.setUltraAVX(random.nextBoolean());
            seance.setImax(random.nextBoolean());
            seance.setTroisD(random.nextBoolean());

            List<SalleDeCinema> salles = salleDeCinemaService.list();
            int randomIndex = random.nextInt(salles.size());
            SalleDeCinema salleDeCinema = salles.get(randomIndex);
            seance.setSalleDeCinema(salleDeCinema);

            seanceService.save(seance);
        }
    }

    @PutMapping("/update/{filmId}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<String> updateFilm(
            @PathVariable Long filmId,
            @RequestParam("titre") String titre,
            @RequestParam("langue") String langue,
            @RequestParam("soustitre") String soustitre,
            @RequestParam("doublage") String doublage,
            @RequestParam("duree") String duree,
            @RequestParam("videoUrl") String videoUrl,
            @RequestParam("listeActeurs") String listeActeurs,
            @RequestParam("listeRealisateurs") String listeRealisateurs,
            @RequestParam("titreOriginal") String titreOriginal,
            @RequestParam("categorie") String categorie,
            @RequestParam("description") String description,
            @RequestParam("dateDeSortie") String dateDeSortieStr,
            @RequestParam(value = "file", required = false) MultipartFile multipartFile
    ) {
        Optional<Film> optionalFilm = filmService.findById(filmId);
        if (optionalFilm.isEmpty()) {
            return new ResponseEntity<>("Film non trouvé", HttpStatus.NOT_FOUND);
        }

        Film film = optionalFilm.get();
        film.setTitre(titre);
        film.setDescription(description);

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date dateDeSortie = dateFormat.parse(dateDeSortieStr);
            film.setDateDeSortie(dateDeSortie);
        } catch (ParseException e) {
            return new ResponseEntity<>("Format de date invalide! Utilisez yyyy-MM-dd", HttpStatus.BAD_REQUEST);
        }

        if (multipartFile != null) {
            try {
                BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
                if (bi == null) {
                    return new ResponseEntity<>("Image invalide!", HttpStatus.BAD_REQUEST);
                }

                Map result = cloudinaryService.upload(multipartFile);
                Image newImage = new Image((String) result.get("original_filename"),
                        (String) result.get("url"),
                        (String) result.get("public_id"));
                imageService.save(newImage);

                film.setImage(newImage);
            } catch (IOException e) {
                return new ResponseEntity<>("Erreur de téléversement de l'image.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        film.setLangue(langue);
        film.setSoustitre(soustitre);
        film.setDoublage(doublage);
        film.setTitreOriginal(titreOriginal);
        film.setCategorie(categorie);
        film.setListeActeurs(listeActeurs);
        film.setListeRealisateurs(listeRealisateurs);
        film.setDescription(description);
        film.setDuree(duree);
        film.setVideoUrl(videoUrl);
        film.setClassement(filmService.getClassement(film));

        filmService.save(film);

        return new ResponseEntity<>("Film mis à jour avec succès.", HttpStatus.OK);
    }
    @DeleteMapping("/delete/{filmId}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<String> deleteFilm(@PathVariable Long filmId) throws IOException {
        Optional<Film> optionalFilm = filmService.findById(filmId);
        if (optionalFilm.isEmpty()) {
            return new ResponseEntity<>("Film non trouvé", HttpStatus.NOT_FOUND);
        }

        Film film = optionalFilm.get();

        Image image = film.getImage();
        if (image != null) {
            imageService.delete(image.getId());
            cloudinaryService.delete(image.getImageId());
        }

        filmService.delete(filmId);

        return new ResponseEntity<>("Film supprimé avec succès.", HttpStatus.OK);
    }


}
