package com.umsa.unidadeducativa.web.rest;

import com.umsa.unidadeducativa.UnidadEducativaBackendApp;

import com.umsa.unidadeducativa.domain.Curso;
import com.umsa.unidadeducativa.repository.CursoRepository;
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
 * Test class for the CursoResource REST controller.
 *
 * @see CursoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UnidadEducativaBackendApp.class)
public class CursoResourceIntTest {

    private static final String DEFAULT_NIVEL = "AAAAAAAAAA";
    private static final String UPDATED_NIVEL = "BBBBBBBBBB";

    private static final String DEFAULT_GRADO = "AAAAAAAAAA";
    private static final String UPDATED_GRADO = "BBBBBBBBBB";

    private static final String DEFAULT_PARALELO = "AAAAAAAAAA";
    private static final String UPDATED_PARALELO = "BBBBBBBBBB";

    private static final Integer DEFAULT_GESTION = 1;
    private static final Integer UPDATED_GESTION = 2;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCursoMockMvc;

    private Curso curso;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CursoResource cursoResource = new CursoResource(cursoRepository);
        this.restCursoMockMvc = MockMvcBuilders.standaloneSetup(cursoResource)
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
    public static Curso createEntity(EntityManager em) {
        Curso curso = new Curso()
            .nivel(DEFAULT_NIVEL)
            .grado(DEFAULT_GRADO)
            .paralelo(DEFAULT_PARALELO)
            .gestion(DEFAULT_GESTION);
        return curso;
    }

    @Before
    public void initTest() {
        curso = createEntity(em);
    }

    @Test
    @Transactional
    public void createCurso() throws Exception {
        int databaseSizeBeforeCreate = cursoRepository.findAll().size();

        // Create the Curso
        restCursoMockMvc.perform(post("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isCreated());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeCreate + 1);
        Curso testCurso = cursoList.get(cursoList.size() - 1);
        assertThat(testCurso.getNivel()).isEqualTo(DEFAULT_NIVEL);
        assertThat(testCurso.getGrado()).isEqualTo(DEFAULT_GRADO);
        assertThat(testCurso.getParalelo()).isEqualTo(DEFAULT_PARALELO);
        assertThat(testCurso.getGestion()).isEqualTo(DEFAULT_GESTION);
    }

    @Test
    @Transactional
    public void createCursoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cursoRepository.findAll().size();

        // Create the Curso with an existing ID
        curso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCursoMockMvc.perform(post("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isBadRequest());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCursos() throws Exception {
        // Initialize the database
        cursoRepository.saveAndFlush(curso);

        // Get all the cursoList
        restCursoMockMvc.perform(get("/api/cursos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(curso.getId().intValue())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL.toString())))
            .andExpect(jsonPath("$.[*].grado").value(hasItem(DEFAULT_GRADO.toString())))
            .andExpect(jsonPath("$.[*].paralelo").value(hasItem(DEFAULT_PARALELO.toString())))
            .andExpect(jsonPath("$.[*].gestion").value(hasItem(DEFAULT_GESTION)));
    }

    @Test
    @Transactional
    public void getCurso() throws Exception {
        // Initialize the database
        cursoRepository.saveAndFlush(curso);

        // Get the curso
        restCursoMockMvc.perform(get("/api/cursos/{id}", curso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(curso.getId().intValue()))
            .andExpect(jsonPath("$.nivel").value(DEFAULT_NIVEL.toString()))
            .andExpect(jsonPath("$.grado").value(DEFAULT_GRADO.toString()))
            .andExpect(jsonPath("$.paralelo").value(DEFAULT_PARALELO.toString()))
            .andExpect(jsonPath("$.gestion").value(DEFAULT_GESTION));
    }

    @Test
    @Transactional
    public void getNonExistingCurso() throws Exception {
        // Get the curso
        restCursoMockMvc.perform(get("/api/cursos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCurso() throws Exception {
        // Initialize the database
        cursoRepository.saveAndFlush(curso);
        int databaseSizeBeforeUpdate = cursoRepository.findAll().size();

        // Update the curso
        Curso updatedCurso = cursoRepository.findOne(curso.getId());
        // Disconnect from session so that the updates on updatedCurso are not directly saved in db
        em.detach(updatedCurso);
        updatedCurso
            .nivel(UPDATED_NIVEL)
            .grado(UPDATED_GRADO)
            .paralelo(UPDATED_PARALELO)
            .gestion(UPDATED_GESTION);

        restCursoMockMvc.perform(put("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCurso)))
            .andExpect(status().isOk());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeUpdate);
        Curso testCurso = cursoList.get(cursoList.size() - 1);
        assertThat(testCurso.getNivel()).isEqualTo(UPDATED_NIVEL);
        assertThat(testCurso.getGrado()).isEqualTo(UPDATED_GRADO);
        assertThat(testCurso.getParalelo()).isEqualTo(UPDATED_PARALELO);
        assertThat(testCurso.getGestion()).isEqualTo(UPDATED_GESTION);
    }

    @Test
    @Transactional
    public void updateNonExistingCurso() throws Exception {
        int databaseSizeBeforeUpdate = cursoRepository.findAll().size();

        // Create the Curso

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCursoMockMvc.perform(put("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isCreated());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCurso() throws Exception {
        // Initialize the database
        cursoRepository.saveAndFlush(curso);
        int databaseSizeBeforeDelete = cursoRepository.findAll().size();

        // Get the curso
        restCursoMockMvc.perform(delete("/api/cursos/{id}", curso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Curso.class);
        Curso curso1 = new Curso();
        curso1.setId(1L);
        Curso curso2 = new Curso();
        curso2.setId(curso1.getId());
        assertThat(curso1).isEqualTo(curso2);
        curso2.setId(2L);
        assertThat(curso1).isNotEqualTo(curso2);
        curso1.setId(null);
        assertThat(curso1).isNotEqualTo(curso2);
    }
}
