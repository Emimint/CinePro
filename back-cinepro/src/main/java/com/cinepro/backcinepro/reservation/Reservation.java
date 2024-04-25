package com.cinepro.backcinepro.reservation;

import com.cinepro.backcinepro.siege.Siege;
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
public class Reservation {
    @Id
    @GeneratedValue
    private Long id;
    private String codeReservation;
    private String qrCode;

    @OneToOne(mappedBy = "reservation")
    @JoinColumn(
            name = "siege_id"
    )
    @JsonIgnore
    private Siege siege;
}
