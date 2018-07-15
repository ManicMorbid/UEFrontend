package com.umsa.unidadeducativa.repository;

import com.umsa.unidadeducativa.domain.Ambiente;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ambiente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AmbienteRepository extends JpaRepository<Ambiente, Long> {

}
