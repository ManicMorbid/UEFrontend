package com.umsa.unidadeducativa.web.rest;

import com.umsa.unidadeducativa.UnidadEducativaBackendApp;

import com.umsa.unidadeducativa.domain.Calificacion;
import com.umsa.unidadeducativa.repository.CalificacionRepository;
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
 * Test class for the CalificacionResource REST controller.
 *
 * @see CalificacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UnidadEducativaBackendApp.class)
public class CalificacionResourceIntTest {

    private static final Integer DEFAULT_PRIMERBIMESTRECUANTITATIVO = 1;
    private static final Integer UPDATED_PRIMERBIMESTRECUANTITATIVO = 2;

    private static final Integer DEFAULT_SEGUNDOBIMESTRECUANTITATIVO = 1;
    private static final Integer UPDATED_SEGUNDOBIMESTRECUANTITATIVO = 2;

    private static final Integer DEFAULT_TERCERBIMESTRECUANTITATIVO = 1;
    private static final Integer UPDATED_TERCERBIMESTRECUANTITATIVO = 2;

    private static final Integer DEFAULT_CUARTOBIMESTRECUANTITATIVO = 1;
    private static final Integer UPDATED_CUARTOBIMESTRECUANTITATIVO = 2;

    private static final String DEFAULT_PRIMERBIMESTRECUALITATIVO = "AAAAAAAAAA";
    private static final String UPDATED_PRIMERBIMESTRECUALITATIVO = "BBBBBBBBBB";

    private static final String DEFAULT_SEGUNDOBIMESTRECUALITATIVO = "AAAAAAAAAA";
    private static final String UPDATED_SEGUNDOBIMESTRECUALITATIVO = "BBBBBBBBBB";

    private static final String DEFAULT_TERCERBIMESTRECUALITATIVO = "AAAAAAAAAA";
    private static final String UPDATED_TERCERBIMESTRECUALITATIVO = "BBBBBBBBBB";

    private static final String DEFAULT_CUARTOBIMESTRECUALITATIVO = "AAAAAAAAAA";
    private static final String UPDATED_CUARTOBIMESTRECUALITATIVO = "BBBBBBBBBB";

    @Autowired
    private CalificacionRepository calificacionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCalificacionMockMvc;

    private Calificacion calificacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CalificacionResource calificacionResource = new CalificacionResource(calificacionRepository);
        this.restCalificacionMockMvc = MockMvcBuilders.standaloneSetup(calificacionResource)
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
    public static Calificacion createEntity(EntityManager em) {
        Calificacion calificacion = new Calificacion()
            .primerbimestrecuantitativo(DEFAULT_PRIMERBIMESTRECUANTITATIVO)
            .segundobimestrecuantitativo(DEFAULT_SEGUNDOBIMESTRECUANTITATIVO)
            .tercerbimestrecuantitativo(DEFAULT_TERCERBIMESTRECUANTITATIVO)
            .cuartobimestrecuantitativo(DEFAULT_CUARTOBIMESTRECUANTITATIVO)
            .primerbimestrecualitativo(DEFAULT_PRIMERBIMESTRECUALITATIVO)
            .segundobimestrecualitativo(DEFAULT_SEGUNDOBIMESTRECUALITATIVO)
            .tercerbimestrecualitativo(DEFAULT_TERCERBIMESTRECUALITATIVO)
            .cuartobimestrecualitativo(DEFAULT_CUARTOBIMESTRECUALITATIVO);
        return calificacion;
    }

    @Before
    public void initTest() {
        calificacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCalificacion() throws Exception {
        int databaseSizeBeforeCreate = calificacionRepository.findAll().size();

        // Create the Calificacion
        restCalificacionMockMvc.perform(post("/api/calificacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isCreated());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeCreate + 1);
        Calificacion testCalificacion = calificacionList.get(calificacionList.size() - 1);
        assertThat(testCalificacion.getPrimerbimestrecuantitativo()).isEqualTo(DEFAULT_PRIMERBIMESTRECUANTITATIVO);
        assertThat(testCalificacion.getSegundobimestrecuantitativo()).isEqualTo(DEFAULT_SEGUNDOBIMESTRECUANTITATIVO);
        assertThat(testCalificacion.getTercerbimestrecuantitativo()).isEqualTo(DEFAULT_TERCERBIMESTRECUANTITATIVO);
        assertThat(testCalificacion.getCuartobimestrecuantitativo()).isEqualTo(DEFAULT_CUARTOBIMESTRECUANTITATIVO);
        assertThat(testCalificacion.getPrimerbimestrecualitativo()).isEqualTo(DEFAULT_PRIMERBIMESTRECUALITATIVO);
        assertThat(testCalificacion.getSegundobimestrecualitativo()).isEqualTo(DEFAULT_SEGUNDOBIMESTRECUALITATIVO);
        assertThat(testCalificacion.getTercerbimestrecualitativo()).isEqualTo(DEFAULT_TERCERBIMESTRECUALITATIVO);
        assertThat(testCalificacion.getCuartobimestrecualitativo()).isEqualTo(DEFAULT_CUARTOBIMESTRECUALITATIVO);
    }

    @Test
    @Transactional
    public void createCalificacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = calificacionRepository.findAll().size();

        // Create the Calificacion with an existing ID
        calificacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCalificacionMockMvc.perform(post("/api/calificacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isBadRequest());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCalificacions() throws Exception {
        // Initialize the database
        calificacionRepository.saveAndFlush(calificacion);

        // Get all the calificacionList
        restCalificacionMockMvc.perform(get("/api/calificacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calificacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].primerbimestrecuantitativo").value(hasItem(DEFAULT_PRIMERBIMESTRECUANTITATIVO)))
            .andExpect(jsonPath("$.[*].segundobimestrecuantitativo").value(hasItem(DEFAULT_SEGUNDOBIMESTRECUANTITATIVO)))
            .andExpect(jsonPath("$.[*].tercerbimestrecuantitativo").value(hasItem(DEFAULT_TERCERBIMESTRECUANTITATIVO)))
            .andExpect(jsonPath("$.[*].cuartobimestrecuantitativo").value(hasItem(DEFAULT_CUARTOBIMESTRECUANTITATIVO)))
            .andExpect(jsonPath("$.[*].primerbimestrecualitativo").value(hasItem(DEFAULT_PRIMERBIMESTRECUALITATIVO.toString())))
            .andExpect(jsonPath("$.[*].segundobimestrecualitativo").value(hasItem(DEFAULT_SEGUNDOBIMESTRECUALITATIVO.toString())))
            .andExpect(jsonPath("$.[*].tercerbimestrecualitativo").value(hasItem(DEFAULT_TERCERBIMESTRECUALITATIVO.toString())))
            .andExpect(jsonPath("$.[*].cuartobimestrecualitativo").value(hasItem(DEFAULT_CUARTOBIMESTRECUALITATIVO.toString())));
    }

    @Test
    @Transactional
    public void getCalificacion() throws Exception {
        // Initialize the database
        calificacionRepository.saveAndFlush(calificacion);

        // Get the calificacion
        restCalificacionMockMvc.perform(get("/api/calificacions/{id}", calificacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(calificacion.getId().intValue()))
            .andExpect(jsonPath("$.primerbimestrecuantitativo").value(DEFAULT_PRIMERBIMESTRECUANTITATIVO))
            .andExpect(jsonPath("$.segundobimestrecuantitativo").value(DEFAULT_SEGUNDOBIMESTRECUANTITATIVO))
            .andExpect(jsonPath("$.tercerbimestrecuantitativo").value(DEFAULT_TERCERBIMESTRECUANTITATIVO))
            .andExpect(jsonPath("$.cuartobimestrecuantitativo").value(DEFAULT_CUARTOBIMESTRECUANTITATIVO))
            .andExpect(jsonPath("$.primerbimestrecualitativo").value(DEFAULT_PRIMERBIMESTRECUALITATIVO.toString()))
            .andExpect(jsonPath("$.segundobimestrecualitativo").value(DEFAULT_SEGUNDOBIMESTRECUALITATIVO.toString()))
            .andExpect(jsonPath("$.tercerbimestrecualitativo").value(DEFAULT_TERCERBIMESTRECUALITATIVO.toString()))
            .andExpect(jsonPath("$.cuartobimestrecualitativo").value(DEFAULT_CUARTOBIMESTRECUALITATIVO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCalificacion() throws Exception {
        // Get the calificacion
        restCalificacionMockMvc.perform(get("/api/calificacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCalificacion() throws Exception {
        // Initialize the database
        calificacionRepository.saveAndFlush(calificacion);
        int databaseSizeBeforeUpdate = calificacionRepository.findAll().size();

        // Update the calificacion
        Calificacion updatedCalificacion = calificacionRepository.findOne(calificacion.getId());
        // Disconnect from session so that the updates on updatedCalificacion are not directly saved in db
        em.detach(updatedCalificacion);
        updatedCalificacion
            .primerbimestrecuantitativo(UPDATED_PRIMERBIMESTRECUANTITATIVO)
            .segundobimestrecuantitativo(UPDATED_SEGUNDOBIMESTRECUANTITATIVO)
            .tercerbimestrecuantitativo(UPDATED_TERCERBIMESTRECUANTITATIVO)
            .cuartobimestrecuantitativo(UPDATED_CUARTOBIMESTRECUANTITATIVO)
            .primerbimestrecualitativo(UPDATED_PRIMERBIMESTRECUALITATIVO)
            .segundobimestrecualitativo(UPDATED_SEGUNDOBIMESTRECUALITATIVO)
            .tercerbimestrecualitativo(UPDATED_TERCERBIMESTRECUALITATIVO)
            .cuartobimestrecualitativo(UPDATED_CUARTOBIMESTRECUALITATIVO);

        restCalificacionMockMvc.perform(put("/api/calificacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCalificacion)))
            .andExpect(status().isOk());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeUpdate);
        Calificacion testCalificacion = calificacionList.get(calificacionList.size() - 1);
        assertThat(testCalificacion.getPrimerbimestrecuantitativo()).isEqualTo(UPDATED_PRIMERBIMESTRECUANTITATIVO);
        assertThat(testCalificacion.getSegundobimestrecuantitativo()).isEqualTo(UPDATED_SEGUNDOBIMESTRECUANTITATIVO);
        assertThat(testCalificacion.getTercerbimestrecuantitativo()).isEqualTo(UPDATED_TERCERBIMESTRECUANTITATIVO);
        assertThat(testCalificacion.getCuartobimestrecuantitativo()).isEqualTo(UPDATED_CUARTOBIMESTRECUANTITATIVO);
        assertThat(testCalificacion.getPrimerbimestrecualitativo()).isEqualTo(UPDATED_PRIMERBIMESTRECUALITATIVO);
        assertThat(testCalificacion.getSegundobimestrecualitativo()).isEqualTo(UPDATED_SEGUNDOBIMESTRECUALITATIVO);
        assertThat(testCalificacion.getTercerbimestrecualitativo()).isEqualTo(UPDATED_TERCERBIMESTRECUALITATIVO);
        assertThat(testCalificacion.getCuartobimestrecualitativo()).isEqualTo(UPDATED_CUARTOBIMESTRECUALITATIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingCalificacion() throws Exception {
        int databaseSizeBeforeUpdate = calificacionRepository.findAll().size();

        // Create the Calificacion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCalificacionMockMvc.perform(put("/api/calificacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isCreated());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCalificacion() throws Exception {
        // Initialize the database
        calificacionRepository.saveAndFlush(calificacion);
        int databaseSizeBeforeDelete = calificacionRepository.findAll().size();

        // Get the calificacion
        restCalificacionMockMvc.perform(delete("/api/calificacions/{id}", calificacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Calificacion.class);
        Calificacion calificacion1 = new Calificacion();
        calificacion1.setId(1L);
        Calificacion calificacion2 = new Calificacion();
        calificacion2.setId(calificacion1.getId());
        assertThat(calificacion1).isEqualTo(calificacion2);
        calificacion2.setId(2L);
        assertThat(calificacion1).isNotEqualTo(calificacion2);
        calificacion1.setId(null);
        assertThat(calificacion1).isNotEqualTo(calificacion2);
    }
}
