package com.cinepro.backcinepro.salledecinema;

import com.cinepro.backcinepro.cinema.Cinema;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.query.sql.internal.ParameterRecognizerImpl;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Seance {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ultimaAvx;
    private String iMax;
    private String troisD;
    private Date date;
    private Date heure;



    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "salledecinema_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_seance_salledecinema", foreignKeyDefinition = "FOREIGN KEY (salledecinema_id) REFERENCES salledecinema(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private SalleDeCinema salleDeCinema;


}
