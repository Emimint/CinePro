package com.cinepro.backcinepro.film;

import com.cinepro.backcinepro.realisateur.Realisateur;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

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
    private Date dateDeSortie;
//    private List<Acteur> acteurs;
//    private List<Realisateur> realisateurs;
    private int classement;


    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(
            name = "image_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_movie_image", foreignKeyDefinition = "FOREIGN KEY (image_id) REFERENCES image(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private Image image;

    @ManyToMany(mappedBy = "films")
    private List<Realisateur> realisateurs;
}
