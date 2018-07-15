package com.umsa.unidadeducativa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Anuncio.
 */
@Entity
@Table(name = "anuncio")
public class Anuncio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "anuncio")
    @JsonIgnore
    private Set<Imagen> imagens = new HashSet<>();

    @ManyToOne
    private Curso curso;

    @ManyToOne
    private Materia materia;

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

    public Anuncio nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Anuncio descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Imagen> getImagens() {
        return imagens;
    }

    public Anuncio imagens(Set<Imagen> imagens) {
        this.imagens = imagens;
        return this;
    }

    public Anuncio addImagen(Imagen imagen) {
        this.imagens.add(imagen);
        imagen.setAnuncio(this);
        return this;
    }

    public Anuncio removeImagen(Imagen imagen) {
        this.imagens.remove(imagen);
        imagen.setAnuncio(null);
        return this;
    }

    public void setImagens(Set<Imagen> imagens) {
        this.imagens = imagens;
    }

    public Curso getCurso() {
        return curso;
    }

    public Anuncio curso(Curso curso) {
        this.curso = curso;
        return this;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Materia getMateria() {
        return materia;
    }

    public Anuncio materia(Materia materia) {
        this.materia = materia;
        return this;
    }

    public void setMateria(Materia materia) {
        this.materia = materia;
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
        Anuncio anuncio = (Anuncio) o;
        if (anuncio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), anuncio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Anuncio{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
