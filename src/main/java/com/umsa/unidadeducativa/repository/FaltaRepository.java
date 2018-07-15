package com.umsa.unidadeducativa.repository;

import com.umsa.unidadeducativa.domain.Falta;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Falta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FaltaRepository extends JpaRepository<Falta, Long> {

    @Query("select falta from Falta falta where falta.userestudiante.login = ?#{principal.username}")
    List<Falta> findByUserestudianteIsCurrentUser();

}
