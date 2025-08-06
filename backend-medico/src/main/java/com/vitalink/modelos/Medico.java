package com.vitalink.modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "medicos")
public class Medico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;
    
    @NotBlank
    @Size(max = 20)
    @Column(name = "crm", unique = true)
    private String crm;
    
    @NotBlank
    @Size(max = 2)
    @Column(name = "uf_crm")
    private String ufCrm;
    
    @Size(max = 20)
    @Column(name = "telefone")
    private String telefone;
    
    @Column(name = "descricao", columnDefinition = "TEXT")
    private String descricao;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "medico_especialidades",
               joinColumns = @JoinColumn(name = "medico_id"),
               inverseJoinColumns = @JoinColumn(name = "especialidade_id"))
    private Set<Especialidade> especialidades = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "medico_convenios",
               joinColumns = @JoinColumn(name = "medico_id"),
               inverseJoinColumns = @JoinColumn(name = "convenio_id"))
    private Set<Convenio> convenios = new HashSet<>();
    
    @OneToMany(mappedBy = "medico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<MedicoClinica> clinicas = new HashSet<>();
    
    // Construtores
    public Medico() {}
    
    public Medico(Usuario usuario, String crm, String ufCrm) {
        this.usuario = usuario;
        this.crm = crm;
        this.ufCrm = ufCrm;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public String getCrm() { return crm; }
    public void setCrm(String crm) { this.crm = crm; }
    
    public String getUfCrm() { return ufCrm; }
    public void setUfCrm(String ufCrm) { this.ufCrm = ufCrm; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public Set<Especialidade> getEspecialidades() { return especialidades; }
    public void setEspecialidades(Set<Especialidade> especialidades) { this.especialidades = especialidades; }
    
    public Set<Convenio> getConvenios() { return convenios; }
    public void setConvenios(Set<Convenio> convenios) { this.convenios = convenios; }
    
    public Set<MedicoClinica> getClinicas() { return clinicas; }
    public void setClinicas(Set<MedicoClinica> clinicas) { this.clinicas = clinicas; }
}
