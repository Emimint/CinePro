package com.cinepro.backcinepro.siege;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiegeRepository extends JpaRepository<Siege, Long> {

}
