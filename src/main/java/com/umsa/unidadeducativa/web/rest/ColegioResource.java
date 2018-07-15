package com.umsa.unidadeducativa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.umsa.unidadeducativa.domain.Colegio;

import com.umsa.unidadeducativa.repository.ColegioRepository;
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
 * REST controller for managing Colegio.
 */
@RestController
@RequestMapping("/api")
public class ColegioResource {

    private final Logger log = LoggerFactory.getLogger(ColegioResource.class);

    private static final String ENTITY_NAME = "colegio";

    private final ColegioRepository colegioRepository;

    public ColegioResource(ColegioRepository colegioRepository) {
        this.colegioRepository = colegioRepository;
    }

    /**
     * POST  /colegios : Create a new colegio.
     *
     * @param colegio the colegio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new colegio, or with status 400 (Bad Request) if the colegio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/colegios")
    @Timed
    public ResponseEntity<Colegio> createColegio(@RequestBody Colegio colegio) throws URISyntaxException {
        log.debug("REST request to save Colegio : {}", colegio);
        if (colegio.getId() != null) {
            throw new BadRequestAlertException("A new colegio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colegio result = colegioRepository.save(colegio);
        return ResponseEntity.created(new URI("/api/colegios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /colegios : Updates an existing colegio.
     *
     * @param colegio the colegio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated colegio,
     * or with status 400 (Bad Request) if the colegio is not valid,
     * or with status 500 (Internal Server Error) if the colegio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/colegios")
    @Timed
    public ResponseEntity<Colegio> updateColegio(@RequestBody Colegio colegio) throws URISyntaxException {
        log.debug("REST request to update Colegio : {}", colegio);
        if (colegio.getId() == null) {
            return createColegio(colegio);
        }
        Colegio result = colegioRepository.save(colegio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, colegio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /colegios : get all the colegios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of colegios in body
     */
    @GetMapping("/colegios")
    @Timed
    public List<Colegio> getAllColegios() {
        log.debug("REST request to get all Colegios");
        return colegioRepository.findAll();
        }

    /**
     * GET  /colegios/:id : get the "id" colegio.
     *
     * @param id the id of the colegio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the colegio, or with status 404 (Not Found)
     */
    @GetMapping("/colegios/{id}")
    @Timed
    public ResponseEntity<Colegio> getColegio(@PathVariable Long id) {
        log.debug("REST request to get Colegio : {}", id);
        Colegio colegio = colegioRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(colegio));
    }

    /**
     * DELETE  /colegios/:id : delete the "id" colegio.
     *
     * @param id the id of the colegio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/colegios/{id}")
    @Timed
    public ResponseEntity<Void> deleteColegio(@PathVariable Long id) {
        log.debug("REST request to delete Colegio : {}", id);
        colegioRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
