package com.umsa.unidadeducativa.web.rest;

import com.umsa.unidadeducativa.UnidadEducativaBackendApp;

import com.umsa.unidadeducativa.domain.Colegio;
import com.umsa.unidadeducativa.repository.ColegioRepository;
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
 * Test class for the ColegioResource REST controller.
 *
 * @see ColegioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UnidadEducativaBackendApp.class)
public class ColegioResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_SIE = "AAAAAAAAAA";
    private static final String UPDATED_SIE = "BBBBBBBBBB";

    @Autowired
    private ColegioRepository colegioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restColegioMockMvc;

    private Colegio colegio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColegioResource colegioResource = new ColegioResource(colegioRepository);
        this.restColegioMockMvc = MockMvcBuilders.standaloneSetup(colegioResource)
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
    public static Colegio createEntity(EntityManager em) {
        Colegio colegio = new Colegio()
            .nombre(DEFAULT_NOMBRE)
            .direccion(DEFAULT_DIRECCION)
            .telefono(DEFAULT_TELEFONO)
            .email(DEFAULT_EMAIL)
            .sie(DEFAULT_SIE);
        return colegio;
    }

    @Before
    public void initTest() {
        colegio = createEntity(em);
    }

    @Test
    @Transactional
    public void createColegio() throws Exception {
        int databaseSizeBeforeCreate = colegioRepository.findAll().size();

        // Create the Colegio
        restColegioMockMvc.perform(post("/api/colegios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colegio)))
            .andExpect(status().isCreated());

        // Validate the Colegio in the database
        List<Colegio> colegioList = colegioRepository.findAll();
        assertThat(colegioList).hasSize(databaseSizeBeforeCreate + 1);
        Colegio testColegio = colegioList.get(colegioList.size() - 1);
        assertThat(testColegio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testColegio.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testColegio.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testColegio.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testColegio.getSie()).isEqualTo(DEFAULT_SIE);
    }

    @Test
    @Transactional
    public void createColegioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = colegioRepository.findAll().size();

        // Create the Colegio with an existing ID
        colegio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restColegioMockMvc.perform(post("/api/colegios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colegio)))
            .andExpect(status().isBadRequest());

        // Validate the Colegio in the database
        List<Colegio> colegioList = colegioRepository.findAll();
        assertThat(colegioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllColegios() throws Exception {
        // Initialize the database
        colegioRepository.saveAndFlush(colegio);

        // Get all the colegioList
        restColegioMockMvc.perform(get("/api/colegios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(colegio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].sie").value(hasItem(DEFAULT_SIE.toString())));
    }

    @Test
    @Transactional
    public void getColegio() throws Exception {
        // Initialize the database
        colegioRepository.saveAndFlush(colegio);

        // Get the colegio
        restColegioMockMvc.perform(get("/api/colegios/{id}", colegio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(colegio.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.sie").value(DEFAULT_SIE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingColegio() throws Exception {
        // Get the colegio
        restColegioMockMvc.perform(get("/api/colegios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateColegio() throws Exception {
        // Initialize the database
        colegioRepository.saveAndFlush(colegio);
        int databaseSizeBeforeUpdate = colegioRepository.findAll().size();

        // Update the colegio
        Colegio updatedColegio = colegioRepository.findOne(colegio.getId());
        // Disconnect from session so that the updates on updatedColegio are not directly saved in db
        em.detach(updatedColegio);
        updatedColegio
            .nombre(UPDATED_NOMBRE)
            .direccion(UPDATED_DIRECCION)
            .telefono(UPDATED_TELEFONO)
            .email(UPDATED_EMAIL)
            .sie(UPDATED_SIE);

        restColegioMockMvc.perform(put("/api/colegios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedColegio)))
            .andExpect(status().isOk());

        // Validate the Colegio in the database
        List<Colegio> colegioList = colegioRepository.findAll();
        assertThat(colegioList).hasSize(databaseSizeBeforeUpdate);
        Colegio testColegio = colegioList.get(colegioList.size() - 1);
        assertThat(testColegio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testColegio.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testColegio.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testColegio.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testColegio.getSie()).isEqualTo(UPDATED_SIE);
    }

    @Test
    @Transactional
    public void updateNonExistingColegio() throws Exception {
        int databaseSizeBeforeUpdate = colegioRepository.findAll().size();

        // Create the Colegio

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restColegioMockMvc.perform(put("/api/colegios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colegio)))
            .andExpect(status().isCreated());

        // Validate the Colegio in the database
        List<Colegio> colegioList = colegioRepository.findAll();
        assertThat(colegioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteColegio() throws Exception {
        // Initialize the database
        colegioRepository.saveAndFlush(colegio);
        int databaseSizeBeforeDelete = colegioRepository.findAll().size();

        // Get the colegio
        restColegioMockMvc.perform(delete("/api/colegios/{id}", colegio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Colegio> colegioList = colegioRepository.findAll();
        assertThat(colegioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Colegio.class);
        Colegio colegio1 = new Colegio();
        colegio1.setId(1L);
        Colegio colegio2 = new Colegio();
        colegio2.setId(colegio1.getId());
        assertThat(colegio1).isEqualTo(colegio2);
        colegio2.setId(2L);
        assertThat(colegio1).isNotEqualTo(colegio2);
        colegio1.setId(null);
        assertThat(colegio1).isNotEqualTo(colegio2);
    }
}
