package com.cinepro.backcinepro.film;

import com.cinepro.backcinepro.acteur.Acteur;
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
    private Date dateDeSortie;
//    private List<Realisateur> realisateurs;
    private int classement;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(
            name = "image_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_film_image", foreignKeyDefinition = "FOREIGN KEY (image_id) REFERENCES image(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private Image image;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(
            name = "film_acteur",
            joinColumns = @JoinColumn(name = "film_id"),
            inverseJoinColumns = @JoinColumn(name = "acteur_id")
    )
    private Set<Acteur> acteurs=new HashSet<>();
}
