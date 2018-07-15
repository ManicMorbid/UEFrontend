package com.umsa.unidadeducativa.web.rest;

import com.umsa.unidadeducativa.UnidadEducativaBackendApp;

import com.umsa.unidadeducativa.domain.Actividad;
import com.umsa.unidadeducativa.repository.ActividadRepository;
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
 * Test class for the ActividadResource REST controller.
 *
 * @see ActividadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UnidadEducativaBackendApp.class)
public class ActividadResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private ActividadRepository actividadRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restActividadMockMvc;

    private Actividad actividad;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ActividadResource actividadResource = new ActividadResource(actividadRepository);
        this.restActividadMockMvc = MockMvcBuilders.standaloneSetup(actividadResource)
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
    public static Actividad createEntity(EntityManager em) {
        Actividad actividad = new Actividad()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return actividad;
    }

    @Before
    public void initTest() {
        actividad = createEntity(em);
    }

    @Test
    @Transactional
    public void createActividad() throws Exception {
        int databaseSizeBeforeCreate = actividadRepository.findAll().size();

        // Create the Actividad
        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isCreated());

        // Validate the Actividad in the database
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeCreate + 1);
        Actividad testActividad = actividadList.get(actividadList.size() - 1);
        assertThat(testActividad.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testActividad.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createActividadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = actividadRepository.findAll().size();

        // Create the Actividad with an existing ID
        actividad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActividadMockMvc.perform(post("/api/actividads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isBadRequest());

        // Validate the Actividad in the database
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllActividads() throws Exception {
        // Initialize the database
        actividadRepository.saveAndFlush(actividad);

        // Get all the actividadList
        restActividadMockMvc.perform(get("/api/actividads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(actividad.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getActividad() throws Exception {
        // Initialize the database
        actividadRepository.saveAndFlush(actividad);

        // Get the actividad
        restActividadMockMvc.perform(get("/api/actividads/{id}", actividad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(actividad.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingActividad() throws Exception {
        // Get the actividad
        restActividadMockMvc.perform(get("/api/actividads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateActividad() throws Exception {
        // Initialize the database
        actividadRepository.saveAndFlush(actividad);
        int databaseSizeBeforeUpdate = actividadRepository.findAll().size();

        // Update the actividad
        Actividad updatedActividad = actividadRepository.findOne(actividad.getId());
        // Disconnect from session so that the updates on updatedActividad are not directly saved in db
        em.detach(updatedActividad);
        updatedActividad
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restActividadMockMvc.perform(put("/api/actividads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedActividad)))
            .andExpect(status().isOk());

        // Validate the Actividad in the database
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeUpdate);
        Actividad testActividad = actividadList.get(actividadList.size() - 1);
        assertThat(testActividad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testActividad.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingActividad() throws Exception {
        int databaseSizeBeforeUpdate = actividadRepository.findAll().size();

        // Create the Actividad

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restActividadMockMvc.perform(put("/api/actividads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actividad)))
            .andExpect(status().isCreated());

        // Validate the Actividad in the database
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteActividad() throws Exception {
        // Initialize the database
        actividadRepository.saveAndFlush(actividad);
        int databaseSizeBeforeDelete = actividadRepository.findAll().size();

        // Get the actividad
        restActividadMockMvc.perform(delete("/api/actividads/{id}", actividad.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Actividad> actividadList = actividadRepository.findAll();
        assertThat(actividadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Actividad.class);
        Actividad actividad1 = new Actividad();
        actividad1.setId(1L);
        Actividad actividad2 = new Actividad();
        actividad2.setId(actividad1.getId());
        assertThat(actividad1).isEqualTo(actividad2);
        actividad2.setId(2L);
        assertThat(actividad1).isNotEqualTo(actividad2);
        actividad1.setId(null);
        assertThat(actividad1).isNotEqualTo(actividad2);
    }
}
