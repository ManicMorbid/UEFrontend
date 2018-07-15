package com.umsa.unidadeducativa.repository;

import com.umsa.unidadeducativa.domain.Colegio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Colegio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColegioRepository extends JpaRepository<Colegio, Long> {

}
