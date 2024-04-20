package com.cinepro.backcinepro.cinema;


import com.cinepro.backcinepro.adresse.Adresse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_cinema_adresse", foreignKeyDefinition = "FOREIGN KEY (adresse_id) REFERENCES adresse(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private Adresse adresse;
}
