package com.cinepro.backcinepro.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Personne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String numeroTel;
    private String email;
    private String password;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(
            name = "adresse_id",
            referencedColumnName = "adresse_id",
            foreignKey = @ForeignKey(name = "FK_personne_adresse", foreignKeyDefinition = "FOREIGN KEY (adresse_id) REFERENCES adresse(adresse_id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private Adresse adresse;
}
