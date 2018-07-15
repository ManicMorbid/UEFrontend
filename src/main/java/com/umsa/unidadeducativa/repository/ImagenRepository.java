package com.umsa.unidadeducativa.repository;

import com.umsa.unidadeducativa.domain.Imagen;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Imagen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long> {

}
