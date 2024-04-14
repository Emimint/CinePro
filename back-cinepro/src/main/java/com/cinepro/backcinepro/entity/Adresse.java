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
public class Adresse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String adresseId;
    private String codePostal;
    private String numeroCivique;
    private String nomRue;
    private String ville;
    private String pays;
    private String cinemaId;

    @OneToOne(mappedBy = "adresse")
    @JsonIgnore
    private Personne personne;

}



