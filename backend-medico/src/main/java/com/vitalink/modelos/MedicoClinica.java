package com.vitalink.modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "medico_clinicas")
public class MedicoClinica {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medico_id")
    private Medico medico;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinica_id")
    private Clinica clinica;
    
    @Size(max = 100)
    @Column(name = "cargo")
    private String cargo; // Ex: "Médico Titular", "Médico Consultor"
    
    @Column(name = "ativo")
    private Boolean ativo = true;
    
    @Column(name = "observacoes", columnDefinition = "TEXT")
    private String observacoes;
    
    // Construtores
    public MedicoClinica() {}
    
    public MedicoClinica(Medico medico, Clinica clinica) {
        this.medico = medico;
        this.clinica = clinica;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Medico getMedico() { return medico; }
    public void setMedico(Medico medico) { this.medico = medico; }
    
    public Clinica getClinica() { return clinica; }
    public void setClinica(Clinica clinica) { this.clinica = clinica; }
    
    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }
    
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
    
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}
