package com.umsa.unidadeducativa.repository;

import com.umsa.unidadeducativa.domain.Actividad;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Actividad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Long> {

}
