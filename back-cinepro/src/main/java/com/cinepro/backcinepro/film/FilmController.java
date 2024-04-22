package com.cinepro.backcinepro.film;


import com.cinepro.backcinepro.config.CloudinaryService;
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
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        film.setDescription(description);
        film.setDateDeSortie(dateDeSortie);
        film.setClassement(filmService.getClassement(film));
        film.setImage(image);
        filmService.save(film);

        return new ResponseEntity<>("Film ajouté avec succès ! ", HttpStatus.OK);
    }

    @PutMapping("/update/{filmId}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<String> updateFilm(@PathVariable Long filmId,
                                              @RequestParam("titre") String titre,
                                              @RequestParam("langue") String langue,
                                              @RequestParam("soustitre") String soustitre,
                                              @RequestParam("doublage") String doublage,
                                              @RequestParam("titreOriginal") String titreOriginal,
                                              @RequestParam("categorie") String categorie,
                                              @RequestParam("description") String description,
                                              @RequestParam("dateDeSortie") String dateDeSortieStr,
                                              @RequestParam(value = "file", required = false) MultipartFile multipartFile) {
        Optional<Film> optionalFilm = filmService.findById(filmId);
        if (optionalFilm.isEmpty()) {
            return new ResponseEntity<>("Film non trouvé", HttpStatus.NOT_FOUND);
        }

        Film film = optionalFilm.get();
        film.setTitre(titre);
        film.setDescription(description);

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date releaseDate = dateFormat.parse(dateDeSortieStr);
            film.setDateDeSortie(releaseDate);
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
