package com.cinepro.backcinepro.film;


import com.cinepro.backcinepro.config.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/allMovies")
//@CrossOrigin(origins = "http://localhost:4200")
public class FilmController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private FilmService filmService;

    @Autowired
    private ImageService imageService;

    @GetMapping("/all")
    public ResponseEntity<List<Film>> getAllMovies() {
        List<Film> movies = filmService.findAll();
        return new ResponseEntity<List<Film>>(movies, HttpStatus.OK);
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<Film> getMovie(@PathVariable Long id) {
        Optional<Film> movie = filmService.findById(id);
        return movie.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadMovie(@RequestParam("file") MultipartFile multipartFile,
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

        Film movie = new Film();
        movie.setTitre(titre);
        movie.setLangue(langue);
        movie.setSoustitre(soustitre);
        movie.setDoublage(doublage);
        movie.setTitreOriginal(titreOriginal);
        movie.setCategorie(categorie);
        movie.setDescription(description);
        movie.setDateDeSortie(dateDeSortie);
        movie.setClassement(filmService.getClassement(movie));
        movie.setImage(image); // Set the image for the movie
        filmService.save(movie);

        return new ResponseEntity<>("Movie ajouté avec succès ! ", HttpStatus.OK);
    }

    @PutMapping("/update/{movieId}")
    public ResponseEntity<String> updateMovie(@PathVariable Long movieId,
                                              @RequestParam("titre") String titre,
                                              @RequestParam("langue") String langue,
                                              @RequestParam("soustitre") String soustitre,
                                              @RequestParam("doublage") String doublage,
                                              @RequestParam("titreOriginal") String titreOriginal,
                                              @RequestParam("categorie") String categorie,
                                              @RequestParam("description") String description,
                                              @RequestParam("dateDeSortie") String dateDeSortieStr,
                                              @RequestParam(value = "file", required = false) MultipartFile multipartFile) {
        Optional<Film> optionalMovie = filmService.findById(movieId);
        if (optionalMovie.isEmpty()) {
            return new ResponseEntity<>("Film non trouvé", HttpStatus.NOT_FOUND);
        }

        Film movie = optionalMovie.get();
        movie.setTitre(titre);
        movie.setDescription(description);

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date releaseDate = dateFormat.parse(dateDeSortieStr);
            movie.setDateDeSortie(releaseDate);
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

                movie.setImage(newImage);
            } catch (IOException e) {
                return new ResponseEntity<>("Erreur de téléversement de l'image.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        filmService.save(movie);

        return new ResponseEntity<>("Film mis à jour avec succès.", HttpStatus.OK);
    }
    @DeleteMapping("/delete/{movieId}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long movieId) throws IOException {
        Optional<Film> optionalMovie = filmService.findById(movieId);
        if (optionalMovie.isEmpty()) {
            return new ResponseEntity<>("Film non trouvé", HttpStatus.NOT_FOUND);
        }

        Film movie = optionalMovie.get();

        Image image = movie.getImage();
        if (image != null) {
            imageService.delete(image.getId());
            cloudinaryService.delete(image.getImageId());
        }

        filmService.delete(movieId);

        return new ResponseEntity<>("Film supprimé avec succès.", HttpStatus.OK);
    }


}
