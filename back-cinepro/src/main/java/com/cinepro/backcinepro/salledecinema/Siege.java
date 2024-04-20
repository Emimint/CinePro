package com.cinepro.backcinepro.salledecinema;

import com.cinepro.backcinepro.adresse.Adresse;
import com.cinepro.backcinepro.salledecinema.SalleDeCinema;
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
    private Long idCombine;
    private String numeroSiege;
    private String rangee;
    private String section;
    private boolean estReserve;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "salledecinema_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_salledecinema_siege", foreignKeyDefinition = "FOREIGN KEY (salledecinema_id) REFERENCES salledecinema(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private SalleDeCinema salleDeCinema;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(
//            name = "reservation_id",
//            referencedColumnName = "id",
//            foreignKey = @ForeignKey(name = "FK_reservation_siege", foreignKeyDefinition = "FOREIGN KEY (reservation_id) REFERENCES reservation(id) ON DELETE CASCADE")
//    )
//    @JsonIgnore
//    private Reservation reservation;


}
