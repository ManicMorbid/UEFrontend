package com.umsa.unidadeducativa.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
public class Curso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nivel")
    private String nivel;

    @Column(name = "grado")
    private String grado;

    @Column(name = "paralelo")
    private String paralelo;

    @Column(name = "gestion")
    private Integer gestion;

    @OneToOne
    @JoinColumn(unique = true)
    private Ambiente ambiente;

    @ManyToMany
    @JoinTable(name = "curso_materia",
               joinColumns = @JoinColumn(name="cursos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="materias_id", referencedColumnName="id"))
    private Set<Materia> materias = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "curso_estudiante",
               joinColumns = @JoinColumn(name="cursos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="estudiantes_id", referencedColumnName="id"))
    private Set<User> estudiantes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNivel() {
        return nivel;
    }

    public Curso nivel(String nivel) {
        this.nivel = nivel;
        return this;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getGrado() {
        return grado;
    }

    public Curso grado(String grado) {
        this.grado = grado;
        return this;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public String getParalelo() {
        return paralelo;
    }

    public Curso paralelo(String paralelo) {
        this.paralelo = paralelo;
        return this;
    }

    public void setParalelo(String paralelo) {
        this.paralelo = paralelo;
    }

    public Integer getGestion() {
        return gestion;
    }

    public Curso gestion(Integer gestion) {
        this.gestion = gestion;
        return this;
    }

    public void setGestion(Integer gestion) {
        this.gestion = gestion;
    }

    public Ambiente getAmbiente() {
        return ambiente;
    }

    public Curso ambiente(Ambiente ambiente) {
        this.ambiente = ambiente;
        return this;
    }

    public void setAmbiente(Ambiente ambiente) {
        this.ambiente = ambiente;
    }

    public Set<Materia> getMaterias() {
        return materias;
    }

    public Curso materias(Set<Materia> materias) {
        this.materias = materias;
        return this;
    }

    public Curso addMateria(Materia materia) {
        this.materias.add(materia);
        materia.getCursos().add(this);
        return this;
    }

    public Curso removeMateria(Materia materia) {
        this.materias.remove(materia);
        materia.getCursos().remove(this);
        return this;
    }

    public void setMaterias(Set<Materia> materias) {
        this.materias = materias;
    }

    public Set<User> getEstudiantes() {
        return estudiantes;
    }

    public Curso estudiantes(Set<User> users) {
        this.estudiantes = users;
        return this;
    }

    public Curso addEstudiante(User user) {
        this.estudiantes.add(user);
        return this;
    }

    public Curso removeEstudiante(User user) {
        this.estudiantes.remove(user);
        return this;
    }

    public void setEstudiantes(Set<User> users) {
        this.estudiantes = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Curso curso = (Curso) o;
        if (curso.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), curso.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Curso{" +
            "id=" + getId() +
            ", nivel='" + getNivel() + "'" +
            ", grado='" + getGrado() + "'" +
            ", paralelo='" + getParalelo() + "'" +
            ", gestion=" + getGestion() +
            "}";
    }
}
