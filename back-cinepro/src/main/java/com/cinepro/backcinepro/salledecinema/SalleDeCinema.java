package com.cinepro.backcinepro.salledecinema;

import com.cinepro.backcinepro.cinema.Cinema;
import com.cinepro.backcinepro.seance.Seance;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class SalleDeCinema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int numero;
    private int nbrSieges;
    private int nbrRangees;
    private int nbrSections;
    private int totalDesSieges;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cinema_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Cinema cinema;

    @OneToMany(mappedBy = "salleDeCinema")
    private List<Seance> seances;

}
