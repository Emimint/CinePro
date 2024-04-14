package com.cinepro.backcinepro.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Cinema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomCinema;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(
            name = "adresse_id",
            referencedColumnName = "adresse_id",
            foreignKey = @ForeignKey(name = "FK_cinema_adresse", foreignKeyDefinition = "FOREIGN KEY (adresse_id) REFERENCES adresse(adresse_id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private Adresse adresse;
}
