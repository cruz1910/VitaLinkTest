package com.vitalink.modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "convenios")
public class Convenio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    @Column(unique = true)
    private String nome;
    
    @Column(name = "descricao", columnDefinition = "TEXT")
    private String descricao;
    
    @Column(name = "ativo")
    private Boolean ativo = true;
    
    @ManyToMany(mappedBy = "convenios")
    private Set<Medico> medicos = new HashSet<>();
    
    // Construtores
    public Convenio() {}
    
    public Convenio(String nome) {
        this.nome = nome;
    }
    
    public Convenio(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
    
    public Set<Medico> getMedicos() { return medicos; }
    public void setMedicos(Set<Medico> medicos) { this.medicos = medicos; }
}
