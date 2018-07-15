package com.umsa.unidadeducativa.repository;

import com.umsa.unidadeducativa.domain.Anuncio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Anuncio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {

}
