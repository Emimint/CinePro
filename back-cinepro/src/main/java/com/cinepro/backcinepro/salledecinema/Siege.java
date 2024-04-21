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
public class Siege {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idCombine;
    private String siege;
    private String rangee;
    private String section;
    private boolean estReserve;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "salleDeCinema_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_siege_salledecinema", foreignKeyDefinition = "FOREIGN KEY (salleDeCinema_id) REFERENCES SalleDeCinema(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private SalleDeCinema salleDeCinema;


}
