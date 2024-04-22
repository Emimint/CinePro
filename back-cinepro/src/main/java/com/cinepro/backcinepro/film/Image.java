package com.cinepro.backcinepro.film;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.*;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String imageUrl;
    private String imageId;

    @OneToOne(mappedBy = "image")
    @JsonIgnore
    private Film film;


    public Image(String name, String imageUrl, String imageId) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.imageId = imageId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, imageUrl, imageId); // Assuming id, name, imageUrl, and imageId uniquely identify an image
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Image)) return false;
        Image other = (Image) obj;
        return id != null && id.equals(other.getId());
    }


}
