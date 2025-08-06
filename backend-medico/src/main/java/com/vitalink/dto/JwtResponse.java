package com.vitalink.dto;

import com.vitalink.modelos.TipoUsuario;

public class JwtResponse {
    
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String nome;
    private TipoUsuario tipoUsuario;
    
    public JwtResponse(String accessToken, Long id, String email, String nome, TipoUsuario tipoUsuario) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.nome = nome;
        this.tipoUsuario = tipoUsuario;
    }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public TipoUsuario getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(TipoUsuario tipoUsuario) { this.tipoUsuario = tipoUsuario; }
}
