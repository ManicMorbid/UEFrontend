package com.umsa.unidadeducativa.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Calificacion.
 */
@Entity
@Table(name = "calificacion")
public class Calificacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "primerbimestrecuantitativo")
    private Integer primerbimestrecuantitativo;

    @Column(name = "segundobimestrecuantitativo")
    private Integer segundobimestrecuantitativo;

    @Column(name = "tercerbimestrecuantitativo")
    private Integer tercerbimestrecuantitativo;

    @Column(name = "cuartobimestrecuantitativo")
    private Integer cuartobimestrecuantitativo;

    @Column(name = "primerbimestrecualitativo")
    private String primerbimestrecualitativo;

    @Column(name = "segundobimestrecualitativo")
    private String segundobimestrecualitativo;

    @Column(name = "tercerbimestrecualitativo")
    private String tercerbimestrecualitativo;

    @Column(name = "cuartobimestrecualitativo")
    private String cuartobimestrecualitativo;

    @ManyToOne
    private Materia materia;

    @ManyToOne
    private User userestudiante;

    @ManyToOne
    private Curso curso;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrimerbimestrecuantitativo() {
        return primerbimestrecuantitativo;
    }

    public Calificacion primerbimestrecuantitativo(Integer primerbimestrecuantitativo) {
        this.primerbimestrecuantitativo = primerbimestrecuantitativo;
        return this;
    }

    public void setPrimerbimestrecuantitativo(Integer primerbimestrecuantitativo) {
        this.primerbimestrecuantitativo = primerbimestrecuantitativo;
    }

    public Integer getSegundobimestrecuantitativo() {
        return segundobimestrecuantitativo;
    }

    public Calificacion segundobimestrecuantitativo(Integer segundobimestrecuantitativo) {
        this.segundobimestrecuantitativo = segundobimestrecuantitativo;
        return this;
    }

    public void setSegundobimestrecuantitativo(Integer segundobimestrecuantitativo) {
        this.segundobimestrecuantitativo = segundobimestrecuantitativo;
    }

    public Integer getTercerbimestrecuantitativo() {
        return tercerbimestrecuantitativo;
    }

    public Calificacion tercerbimestrecuantitativo(Integer tercerbimestrecuantitativo) {
        this.tercerbimestrecuantitativo = tercerbimestrecuantitativo;
        return this;
    }

    public void setTercerbimestrecuantitativo(Integer tercerbimestrecuantitativo) {
        this.tercerbimestrecuantitativo = tercerbimestrecuantitativo;
    }

    public Integer getCuartobimestrecuantitativo() {
        return cuartobimestrecuantitativo;
    }

    public Calificacion cuartobimestrecuantitativo(Integer cuartobimestrecuantitativo) {
        this.cuartobimestrecuantitativo = cuartobimestrecuantitativo;
        return this;
    }

    public void setCuartobimestrecuantitativo(Integer cuartobimestrecuantitativo) {
        this.cuartobimestrecuantitativo = cuartobimestrecuantitativo;
    }

    public String getPrimerbimestrecualitativo() {
        return primerbimestrecualitativo;
    }

    public Calificacion primerbimestrecualitativo(String primerbimestrecualitativo) {
        this.primerbimestrecualitativo = primerbimestrecualitativo;
        return this;
    }

    public void setPrimerbimestrecualitativo(String primerbimestrecualitativo) {
        this.primerbimestrecualitativo = primerbimestrecualitativo;
    }

    public String getSegundobimestrecualitativo() {
        return segundobimestrecualitativo;
    }

    public Calificacion segundobimestrecualitativo(String segundobimestrecualitativo) {
        this.segundobimestrecualitativo = segundobimestrecualitativo;
        return this;
    }

    public void setSegundobimestrecualitativo(String segundobimestrecualitativo) {
        this.segundobimestrecualitativo = segundobimestrecualitativo;
    }

    public String getTercerbimestrecualitativo() {
        return tercerbimestrecualitativo;
    }

    public Calificacion tercerbimestrecualitativo(String tercerbimestrecualitativo) {
        this.tercerbimestrecualitativo = tercerbimestrecualitativo;
        return this;
    }

    public void setTercerbimestrecualitativo(String tercerbimestrecualitativo) {
        this.tercerbimestrecualitativo = tercerbimestrecualitativo;
    }

    public String getCuartobimestrecualitativo() {
        return cuartobimestrecualitativo;
    }

    public Calificacion cuartobimestrecualitativo(String cuartobimestrecualitativo) {
        this.cuartobimestrecualitativo = cuartobimestrecualitativo;
        return this;
    }

    public void setCuartobimestrecualitativo(String cuartobimestrecualitativo) {
        this.cuartobimestrecualitativo = cuartobimestrecualitativo;
    }

    public Materia getMateria() {
        return materia;
    }

    public Calificacion materia(Materia materia) {
        this.materia = materia;
        return this;
    }

    public void setMateria(Materia materia) {
        this.materia = materia;
    }

    public User getUserestudiante() {
        return userestudiante;
    }

    public Calificacion userestudiante(User user) {
        this.userestudiante = user;
        return this;
    }

    public void setUserestudiante(User user) {
        this.userestudiante = user;
    }

    public Curso getCurso() {
        return curso;
    }

    public Calificacion curso(Curso curso) {
        this.curso = curso;
        return this;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
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
        Calificacion calificacion = (Calificacion) o;
        if (calificacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), calificacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Calificacion{" +
            "id=" + getId() +
            ", primerbimestrecuantitativo=" + getPrimerbimestrecuantitativo() +
            ", segundobimestrecuantitativo=" + getSegundobimestrecuantitativo() +
            ", tercerbimestrecuantitativo=" + getTercerbimestrecuantitativo() +
            ", cuartobimestrecuantitativo=" + getCuartobimestrecuantitativo() +
            ", primerbimestrecualitativo='" + getPrimerbimestrecualitativo() + "'" +
            ", segundobimestrecualitativo='" + getSegundobimestrecualitativo() + "'" +
            ", tercerbimestrecualitativo='" + getTercerbimestrecualitativo() + "'" +
            ", cuartobimestrecualitativo='" + getCuartobimestrecualitativo() + "'" +
            "}";
    }
}
