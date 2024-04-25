package com.cinepro.backcinepro.film;

import com.cinepro.backcinepro.seance.Seance;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String langue;
    private String soustitre;
    private String doublage;
    private String titre;
    private String titreOriginal;
    private String categorie;
    private String description;
    private String duree;
    private String videoUrl;
    private String listeActeurs;
    private String listeRealisateurs;
    private Date dateDeSortie;
    private int classement;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(
            name = "image_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_film_image", foreignKeyDefinition = "FOREIGN KEY (image_id) REFERENCES image(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private Image image;

    @OneToMany(mappedBy = "film")
    private List<Seance> seances;
}
