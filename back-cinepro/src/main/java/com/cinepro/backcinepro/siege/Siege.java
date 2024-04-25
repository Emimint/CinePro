package com.cinepro.backcinepro.siege;

import com.cinepro.backcinepro.reservation.Reservation;
import com.cinepro.backcinepro.seance.Seance;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Siege {
    @Id
    @GeneratedValue
    private Long id;
    private String numeroSiege;
    private String rangeeSiege;
    private String sectionSiege;
    private boolean estReserve;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(
            name = "reservation_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "FK_siege_reservation", foreignKeyDefinition = "FOREIGN KEY (reservation_id) REFERENCES reservation(id) ON DELETE CASCADE")
    )
    @JsonIgnore
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(
            name = "seance_id"
    )
    private Seance seance;
}
