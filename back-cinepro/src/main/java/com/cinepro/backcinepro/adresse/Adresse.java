package com.cinepro.backcinepro.adresse;

import com.cinepro.backcinepro.cinema.Cinema;
import com.cinepro.backcinepro.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Adresse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codePostal;
    private String numeroCivique;
    private String nomRue;
    private String ville;
    private String pays;
    private Double longitude;
    private Double latitude;

    @OneToOne(mappedBy = "adresse")
    @JsonIgnore
    private Cinema cinema;

    @OneToOne(mappedBy = "adresse")
    @JsonIgnore
    private User user;
}



