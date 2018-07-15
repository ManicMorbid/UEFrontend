package com.umsa.unidadeducativa.repository;

import com.umsa.unidadeducativa.domain.Calificacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Calificacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    @Query("select calificacion from Calificacion calificacion where calificacion.userestudiante.login = ?#{principal.username}")
    List<Calificacion> findByUserestudianteIsCurrentUser();

}
