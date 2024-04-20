package com.cinepro.backcinepro.salledecinema;

import com.cinepro.backcinepro.cinema.Cinema;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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
    private int totalDesSieges;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "cinema_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_salledecinema_cinema", foreignKeyDefinition = "FOREIGN KEY (cinema_id) REFERENCES cinema(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private Cinema cinema;

}
