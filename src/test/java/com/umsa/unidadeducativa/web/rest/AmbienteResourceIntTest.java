package com.umsa.unidadeducativa.web.rest;

import com.umsa.unidadeducativa.UnidadEducativaBackendApp;

import com.umsa.unidadeducativa.domain.Ambiente;
import com.umsa.unidadeducativa.repository.AmbienteRepository;
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
 * Test class for the AmbienteResource REST controller.
 *
 * @see AmbienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UnidadEducativaBackendApp.class)
public class AmbienteResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACIDAD = 1;
    private static final Integer UPDATED_CAPACIDAD = 2;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private AmbienteRepository ambienteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAmbienteMockMvc;

    private Ambiente ambiente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AmbienteResource ambienteResource = new AmbienteResource(ambienteRepository);
        this.restAmbienteMockMvc = MockMvcBuilders.standaloneSetup(ambienteResource)
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
    public static Ambiente createEntity(EntityManager em) {
        Ambiente ambiente = new Ambiente()
            .nombre(DEFAULT_NOMBRE)
            .capacidad(DEFAULT_CAPACIDAD)
            .descripcion(DEFAULT_DESCRIPCION);
        return ambiente;
    }

    @Before
    public void initTest() {
        ambiente = createEntity(em);
    }

    @Test
    @Transactional
    public void createAmbiente() throws Exception {
        int databaseSizeBeforeCreate = ambienteRepository.findAll().size();

        // Create the Ambiente
        restAmbienteMockMvc.perform(post("/api/ambientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ambiente)))
            .andExpect(status().isCreated());

        // Validate the Ambiente in the database
        List<Ambiente> ambienteList = ambienteRepository.findAll();
        assertThat(ambienteList).hasSize(databaseSizeBeforeCreate + 1);
        Ambiente testAmbiente = ambienteList.get(ambienteList.size() - 1);
        assertThat(testAmbiente.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAmbiente.getCapacidad()).isEqualTo(DEFAULT_CAPACIDAD);
        assertThat(testAmbiente.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createAmbienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ambienteRepository.findAll().size();

        // Create the Ambiente with an existing ID
        ambiente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAmbienteMockMvc.perform(post("/api/ambientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ambiente)))
            .andExpect(status().isBadRequest());

        // Validate the Ambiente in the database
        List<Ambiente> ambienteList = ambienteRepository.findAll();
        assertThat(ambienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAmbientes() throws Exception {
        // Initialize the database
        ambienteRepository.saveAndFlush(ambiente);

        // Get all the ambienteList
        restAmbienteMockMvc.perform(get("/api/ambientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ambiente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].capacidad").value(hasItem(DEFAULT_CAPACIDAD)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getAmbiente() throws Exception {
        // Initialize the database
        ambienteRepository.saveAndFlush(ambiente);

        // Get the ambiente
        restAmbienteMockMvc.perform(get("/api/ambientes/{id}", ambiente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ambiente.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.capacidad").value(DEFAULT_CAPACIDAD))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAmbiente() throws Exception {
        // Get the ambiente
        restAmbienteMockMvc.perform(get("/api/ambientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAmbiente() throws Exception {
        // Initialize the database
        ambienteRepository.saveAndFlush(ambiente);
        int databaseSizeBeforeUpdate = ambienteRepository.findAll().size();

        // Update the ambiente
        Ambiente updatedAmbiente = ambienteRepository.findOne(ambiente.getId());
        // Disconnect from session so that the updates on updatedAmbiente are not directly saved in db
        em.detach(updatedAmbiente);
        updatedAmbiente
            .nombre(UPDATED_NOMBRE)
            .capacidad(UPDATED_CAPACIDAD)
            .descripcion(UPDATED_DESCRIPCION);

        restAmbienteMockMvc.perform(put("/api/ambientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAmbiente)))
            .andExpect(status().isOk());

        // Validate the Ambiente in the database
        List<Ambiente> ambienteList = ambienteRepository.findAll();
        assertThat(ambienteList).hasSize(databaseSizeBeforeUpdate);
        Ambiente testAmbiente = ambienteList.get(ambienteList.size() - 1);
        assertThat(testAmbiente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAmbiente.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
        assertThat(testAmbiente.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingAmbiente() throws Exception {
        int databaseSizeBeforeUpdate = ambienteRepository.findAll().size();

        // Create the Ambiente

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAmbienteMockMvc.perform(put("/api/ambientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ambiente)))
            .andExpect(status().isCreated());

        // Validate the Ambiente in the database
        List<Ambiente> ambienteList = ambienteRepository.findAll();
        assertThat(ambienteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAmbiente() throws Exception {
        // Initialize the database
        ambienteRepository.saveAndFlush(ambiente);
        int databaseSizeBeforeDelete = ambienteRepository.findAll().size();

        // Get the ambiente
        restAmbienteMockMvc.perform(delete("/api/ambientes/{id}", ambiente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ambiente> ambienteList = ambienteRepository.findAll();
        assertThat(ambienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ambiente.class);
        Ambiente ambiente1 = new Ambiente();
        ambiente1.setId(1L);
        Ambiente ambiente2 = new Ambiente();
        ambiente2.setId(ambiente1.getId());
        assertThat(ambiente1).isEqualTo(ambiente2);
        ambiente2.setId(2L);
        assertThat(ambiente1).isNotEqualTo(ambiente2);
        ambiente1.setId(null);
        assertThat(ambiente1).isNotEqualTo(ambiente2);
    }
}
