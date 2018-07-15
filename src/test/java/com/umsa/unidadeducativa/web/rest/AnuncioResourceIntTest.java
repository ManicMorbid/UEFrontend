package com.umsa.unidadeducativa.web.rest;

import com.umsa.unidadeducativa.UnidadEducativaBackendApp;

import com.umsa.unidadeducativa.domain.Anuncio;
import com.umsa.unidadeducativa.repository.AnuncioRepository;
import com.umsa.unidadeducativa.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.umsa.unidadeducativa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AnuncioResource REST controller.
 *
 * @see AnuncioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UnidadEducativaBackendApp.class)
public class AnuncioResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private AnuncioRepository anuncioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnuncioMockMvc;

    private Anuncio anuncio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnuncioResource anuncioResource = new AnuncioResource(anuncioRepository);
        this.restAnuncioMockMvc = MockMvcBuilders.standaloneSetup(anuncioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Anuncio createEntity(EntityManager em) {
        Anuncio anuncio = new Anuncio()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return anuncio;
    }

    @Before
    public void initTest() {
        anuncio = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnuncio() throws Exception {
        int databaseSizeBeforeCreate = anuncioRepository.findAll().size();

        // Create the Anuncio
        restAnuncioMockMvc.perform(post("/api/anuncios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anuncio)))
            .andExpect(status().isCreated());

        // Validate the Anuncio in the database
        List<Anuncio> anuncioList = anuncioRepository.findAll();
        assertThat(anuncioList).hasSize(databaseSizeBeforeCreate + 1);
        Anuncio testAnuncio = anuncioList.get(anuncioList.size() - 1);
        assertThat(testAnuncio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAnuncio.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createAnuncioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anuncioRepository.findAll().size();

        // Create the Anuncio with an existing ID
        anuncio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnuncioMockMvc.perform(post("/api/anuncios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anuncio)))
            .andExpect(status().isBadRequest());

        // Validate the Anuncio in the database
        List<Anuncio> anuncioList = anuncioRepository.findAll();
        assertThat(anuncioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAnuncios() throws Exception {
        // Initialize the database
        anuncioRepository.saveAndFlush(anuncio);

        // Get all the anuncioList
        restAnuncioMockMvc.perform(get("/api/anuncios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anuncio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getAnuncio() throws Exception {
        // Initialize the database
        anuncioRepository.saveAndFlush(anuncio);

        // Get the anuncio
        restAnuncioMockMvc.perform(get("/api/anuncios/{id}", anuncio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(anuncio.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnuncio() throws Exception {
        // Get the anuncio
        restAnuncioMockMvc.perform(get("/api/anuncios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnuncio() throws Exception {
        // Initialize the database
        anuncioRepository.saveAndFlush(anuncio);
        int databaseSizeBeforeUpdate = anuncioRepository.findAll().size();

        // Update the anuncio
        Anuncio updatedAnuncio = anuncioRepository.findOne(anuncio.getId());
        // Disconnect from session so that the updates on updatedAnuncio are not directly saved in db
        em.detach(updatedAnuncio);
        updatedAnuncio
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restAnuncioMockMvc.perform(put("/api/anuncios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnuncio)))
            .andExpect(status().isOk());

        // Validate the Anuncio in the database
        List<Anuncio> anuncioList = anuncioRepository.findAll();
        assertThat(anuncioList).hasSize(databaseSizeBeforeUpdate);
        Anuncio testAnuncio = anuncioList.get(anuncioList.size() - 1);
        assertThat(testAnuncio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAnuncio.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingAnuncio() throws Exception {
        int databaseSizeBeforeUpdate = anuncioRepository.findAll().size();

        // Create the Anuncio

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAnuncioMockMvc.perform(put("/api/anuncios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anuncio)))
            .andExpect(status().isCreated());

        // Validate the Anuncio in the database
        List<Anuncio> anuncioList = anuncioRepository.findAll();
        assertThat(anuncioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAnuncio() throws Exception {
        // Initialize the database
        anuncioRepository.saveAndFlush(anuncio);
        int databaseSizeBeforeDelete = anuncioRepository.findAll().size();

        // Get the anuncio
        restAnuncioMockMvc.perform(delete("/api/anuncios/{id}", anuncio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Anuncio> anuncioList = anuncioRepository.findAll();
        assertThat(anuncioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Anuncio.class);
        Anuncio anuncio1 = new Anuncio();
        anuncio1.setId(1L);
        Anuncio anuncio2 = new Anuncio();
        anuncio2.setId(anuncio1.getId());
        assertThat(anuncio1).isEqualTo(anuncio2);
        anuncio2.setId(2L);
        assertThat(anuncio1).isNotEqualTo(anuncio2);
        anuncio1.setId(null);
        assertThat(anuncio1).isNotEqualTo(anuncio2);
    }
}
