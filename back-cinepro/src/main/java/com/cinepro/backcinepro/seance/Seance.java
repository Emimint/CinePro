package com.cinepro.backcinepro.seance;


import com.cinepro.backcinepro.film.Film;
import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
import com.cinepro.backcinepro.siege.Siege;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Seance {
    @Id
    @GeneratedValue
    private Long id;
    private Date heureDebut;
    private String ultraAVX;
    private String imax;
    private String troisD;

    @OneToMany(mappedBy = "seance")
    private List<Siege> sieges;

    @ManyToOne
    @JoinColumn(
            name = "salle_de_cinema_id"
    )
    private SalleDeCinema salleDeCinema;

    @ManyToOne
    @JoinColumn(
            name = "film_id"
    )
    private Film film;
}
