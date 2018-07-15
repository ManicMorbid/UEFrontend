package com.umsa.unidadeducativa.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Imagen.
 */
@Entity
@Table(name = "imagen")
public class Imagen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @ManyToOne
    private Actividad actividad;

    @ManyToOne
    private Anuncio anuncio;

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

    public Imagen nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Imagen fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public byte[] getImg() {
        return img;
    }

    public Imagen img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Imagen imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public Actividad getActividad() {
        return actividad;
    }

    public Imagen actividad(Actividad actividad) {
        this.actividad = actividad;
        return this;
    }

    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }

    public Anuncio getAnuncio() {
        return anuncio;
    }

    public Imagen anuncio(Anuncio anuncio) {
        this.anuncio = anuncio;
        return this;
    }

    public void setAnuncio(Anuncio anuncio) {
        this.anuncio = anuncio;
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
        Imagen imagen = (Imagen) o;
        if (imagen.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imagen.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Imagen{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + getImgContentType() + "'" +
            "}";
    }
}
