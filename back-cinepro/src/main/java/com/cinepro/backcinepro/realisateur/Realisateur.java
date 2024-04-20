package com.cinepro.backcinepro.realisateur;

import com.cinepro.backcinepro.film.Film;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import static jakarta.persistence.FetchType.EAGER;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Realisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomRealisateur;
    private String prenomRealisateur;

    @ManyToMany
    @JoinTable(
            name = "realisateur_film",
            joinColumns = @JoinColumn(name = "realisateur_id"),
            inverseJoinColumns = @JoinColumn(name = "film_id")
    )
    private List<Film> films;
}
