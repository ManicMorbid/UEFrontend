package com.umsa.unidadeducativa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Actividad.
 */
@Entity
@Table(name = "actividad")
public class Actividad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "actividad")
    @JsonIgnore
    private Set<Imagen> imagens = new HashSet<>();

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

    public Actividad nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Actividad descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Imagen> getImagens() {
        return imagens;
    }

    public Actividad imagens(Set<Imagen> imagens) {
        this.imagens = imagens;
        return this;
    }

    public Actividad addImagen(Imagen imagen) {
        this.imagens.add(imagen);
        imagen.setActividad(this);
        return this;
    }

    public Actividad removeImagen(Imagen imagen) {
        this.imagens.remove(imagen);
        imagen.setActividad(null);
        return this;
    }

    public void setImagens(Set<Imagen> imagens) {
        this.imagens = imagens;
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
        Actividad actividad = (Actividad) o;
        if (actividad.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), actividad.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Actividad{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
