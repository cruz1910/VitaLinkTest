package com.vitalink.dto;

import com.vitalink.modelos.TipoUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    
    @NotBlank
    @Size(max = 100)
    @Email
    private String email;
    
    @NotBlank
    @Size(max = 100)
    private String nome;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String senha;
    
    private TipoUsuario tipo = TipoUsuario.PACIENTE;
    
    // Para médicos
    private String crm;
    private String ufCrm;
    private String telefone;
    private String descricao;
    
    public SignupRequest() {}
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    
    public TipoUsuario getTipo() { return tipo; }
    public void setTipo(TipoUsuario tipo) { this.tipo = tipo; }
    
    public String getCrm() { return crm; }
    public void setCrm(String crm) { this.crm = crm; }
    
    public String getUfCrm() { return ufCrm; }
    public void setUfCrm(String ufCrm) { this.ufCrm = ufCrm; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}
