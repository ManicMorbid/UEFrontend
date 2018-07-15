package com.umsa.unidadeducativa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.umsa.unidadeducativa.domain.Ambiente;

import com.umsa.unidadeducativa.repository.AmbienteRepository;
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
 * REST controller for managing Ambiente.
 */
@RestController
@RequestMapping("/api")
public class AmbienteResource {

    private final Logger log = LoggerFactory.getLogger(AmbienteResource.class);

    private static final String ENTITY_NAME = "ambiente";

    private final AmbienteRepository ambienteRepository;

    public AmbienteResource(AmbienteRepository ambienteRepository) {
        this.ambienteRepository = ambienteRepository;
    }

    /**
     * POST  /ambientes : Create a new ambiente.
     *
     * @param ambiente the ambiente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ambiente, or with status 400 (Bad Request) if the ambiente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ambientes")
    @Timed
    public ResponseEntity<Ambiente> createAmbiente(@RequestBody Ambiente ambiente) throws URISyntaxException {
        log.debug("REST request to save Ambiente : {}", ambiente);
        if (ambiente.getId() != null) {
            throw new BadRequestAlertException("A new ambiente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ambiente result = ambienteRepository.save(ambiente);
        return ResponseEntity.created(new URI("/api/ambientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ambientes : Updates an existing ambiente.
     *
     * @param ambiente the ambiente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ambiente,
     * or with status 400 (Bad Request) if the ambiente is not valid,
     * or with status 500 (Internal Server Error) if the ambiente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ambientes")
    @Timed
    public ResponseEntity<Ambiente> updateAmbiente(@RequestBody Ambiente ambiente) throws URISyntaxException {
        log.debug("REST request to update Ambiente : {}", ambiente);
        if (ambiente.getId() == null) {
            return createAmbiente(ambiente);
        }
        Ambiente result = ambienteRepository.save(ambiente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ambiente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ambientes : get all the ambientes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ambientes in body
     */
    @GetMapping("/ambientes")
    @Timed
    public List<Ambiente> getAllAmbientes() {
        log.debug("REST request to get all Ambientes");
        return ambienteRepository.findAll();
        }

    /**
     * GET  /ambientes/:id : get the "id" ambiente.
     *
     * @param id the id of the ambiente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ambiente, or with status 404 (Not Found)
     */
    @GetMapping("/ambientes/{id}")
    @Timed
    public ResponseEntity<Ambiente> getAmbiente(@PathVariable Long id) {
        log.debug("REST request to get Ambiente : {}", id);
        Ambiente ambiente = ambienteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ambiente));
    }

    /**
     * DELETE  /ambientes/:id : delete the "id" ambiente.
     *
     * @param id the id of the ambiente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ambientes/{id}")
    @Timed
    public ResponseEntity<Void> deleteAmbiente(@PathVariable Long id) {
        log.debug("REST request to delete Ambiente : {}", id);
        ambienteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
