package com.umsa.unidadeducativa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.umsa.unidadeducativa.domain.Anuncio;

import com.umsa.unidadeducativa.repository.AnuncioRepository;
import com.umsa.unidadeducativa.web.rest.errors.BadRequestAlertException;
import com.umsa.unidadeducativa.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Anuncio.
 */
@RestController
@RequestMapping("/api")
public class AnuncioResource {

    private final Logger log = LoggerFactory.getLogger(AnuncioResource.class);

    private static final String ENTITY_NAME = "anuncio";

    private final AnuncioRepository anuncioRepository;

    public AnuncioResource(AnuncioRepository anuncioRepository) {
        this.anuncioRepository = anuncioRepository;
    }

    /**
     * POST  /anuncios : Create a new anuncio.
     *
     * @param anuncio the anuncio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new anuncio, or with status 400 (Bad Request) if the anuncio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/anuncios")
    @Timed
    public ResponseEntity<Anuncio> createAnuncio(@RequestBody Anuncio anuncio) throws URISyntaxException {
        log.debug("REST request to save Anuncio : {}", anuncio);
        if (anuncio.getId() != null) {
            throw new BadRequestAlertException("A new anuncio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Anuncio result = anuncioRepository.save(anuncio);
        return ResponseEntity.created(new URI("/api/anuncios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /anuncios : Updates an existing anuncio.
     *
     * @param anuncio the anuncio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated anuncio,
     * or with status 400 (Bad Request) if the anuncio is not valid,
     * or with status 500 (Internal Server Error) if the anuncio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/anuncios")
    @Timed
    public ResponseEntity<Anuncio> updateAnuncio(@RequestBody Anuncio anuncio) throws URISyntaxException {
        log.debug("REST request to update Anuncio : {}", anuncio);
        if (anuncio.getId() == null) {
            return createAnuncio(anuncio);
        }
        Anuncio result = anuncioRepository.save(anuncio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, anuncio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /anuncios : get all the anuncios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of anuncios in body
     */
    @GetMapping("/anuncios")
    @Timed
    public List<Anuncio> getAllAnuncios() {
        log.debug("REST request to get all Anuncios");
        return anuncioRepository.findAll();
        }

    /**
     * GET  /anuncios/:id : get the "id" anuncio.
     *
     * @param id the id of the anuncio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the anuncio, or with status 404 (Not Found)
     */
    @GetMapping("/anuncios/{id}")
    @Timed
    public ResponseEntity<Anuncio> getAnuncio(@PathVariable Long id) {
        log.debug("REST request to get Anuncio : {}", id);
        Anuncio anuncio = anuncioRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(anuncio));
    }

    /**
     * DELETE  /anuncios/:id : delete the "id" anuncio.
     *
     * @param id the id of the anuncio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/anuncios/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnuncio(@PathVariable Long id) {
        log.debug("REST request to delete Anuncio : {}", id);
        anuncioRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
