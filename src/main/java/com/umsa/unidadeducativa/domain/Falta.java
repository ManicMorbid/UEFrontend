package com.umsa.unidadeducativa.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Falta.
 */
@Entity
@Table(name = "falta")
public class Falta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "licencia")
    private Boolean licencia;

    @ManyToOne
    private User userestudiante;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Falta fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Boolean isLicencia() {
        return licencia;
    }

    public Falta licencia(Boolean licencia) {
        this.licencia = licencia;
        return this;
    }

    public void setLicencia(Boolean licencia) {
        this.licencia = licencia;
    }

    public User getUserestudiante() {
        return userestudiante;
    }

    public Falta userestudiante(User user) {
        this.userestudiante = user;
        return this;
    }

    public void setUserestudiante(User user) {
        this.userestudiante = user;
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
        Falta falta = (Falta) o;
        if (falta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), falta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Falta{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", licencia='" + isLicencia() + "'" +
            "}";
    }
}
