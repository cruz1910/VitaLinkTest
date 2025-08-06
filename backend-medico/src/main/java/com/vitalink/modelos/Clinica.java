package com.vitalink.modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "clinicas")
public class Clinica {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    private String nome;
    
    @NotBlank
    @Size(max = 200)
    private String endereco;
    
    @NotBlank
    @Size(max = 100)
    private String cidade;
    
    @NotBlank
    @Size(max = 2)
    private String estado;
    
    @Size(max = 10)
    private String cep;
    
    @Size(max = 20)
    private String telefone;
    
    @Size(max = 100)
    private String email;
    
    @Column(name = "descricao", columnDefinition = "TEXT")
    private String descricao;
    
    @Column(name = "ativa")
    private Boolean ativa = true;
    
    @OneToMany(mappedBy = "clinica", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<MedicoClinica> medicos = new HashSet<>();
    
    // Construtores
    public Clinica() {}
    
    public Clinica(String nome, String endereco, String cidade, String estado) {
        this.nome = nome;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    
    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }
    
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    
    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public Boolean getAtiva() { return ativa; }
    public void setAtiva(Boolean ativa) { this.ativa = ativa; }
    
    public Set<MedicoClinica> getMedicos() { return medicos; }
    public void setMedicos(Set<MedicoClinica> medicos) { this.medicos = medicos; }
}
