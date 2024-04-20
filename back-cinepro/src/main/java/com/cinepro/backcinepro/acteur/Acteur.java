package com.cinepro.backcinepro.acteur;

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
public class Acteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomActeur;
    private String prenomActeur;

    @ManyToMany
    @JoinTable(
            name = "acteur_film",
            joinColumns = @JoinColumn(name = "acteur_id"),
            inverseJoinColumns = @JoinColumn(name = "film_id")
    )
    private List<Film> films;

}
