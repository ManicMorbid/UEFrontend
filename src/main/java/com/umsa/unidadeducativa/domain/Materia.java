package com.umsa.unidadeducativa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Materia.
 */
@Entity
@Table(name = "materia")
public class Materia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "grado")
    private String grado;

    @OneToOne
    @JoinColumn(unique = true)
    private User profesor;

    @ManyToMany(mappedBy = "materias")
    @JsonIgnore
    private Set<Curso> cursos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Materia nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Materia descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getGrado() {
        return grado;
    }

    public Materia grado(String grado) {
        this.grado = grado;
        return this;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public User getProfesor() {
        return profesor;
    }

    public Materia profesor(User user) {
        this.profesor = user;
        return this;
    }

    public void setProfesor(User user) {
        this.profesor = user;
    }

    public Set<Curso> getCursos() {
        return cursos;
    }

    public Materia cursos(Set<Curso> cursos) {
        this.cursos = cursos;
        return this;
    }

    public Materia addCurso(Curso curso) {
        this.cursos.add(curso);
        curso.getMaterias().add(this);
        return this;
    }

    public Materia removeCurso(Curso curso) {
        this.cursos.remove(curso);
        curso.getMaterias().remove(this);
        return this;
    }

    public void setCursos(Set<Curso> cursos) {
        this.cursos = cursos;
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
        Materia materia = (Materia) o;
        if (materia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), materia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Materia{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", grado='" + getGrado() + "'" +
            "}";
    }
}
