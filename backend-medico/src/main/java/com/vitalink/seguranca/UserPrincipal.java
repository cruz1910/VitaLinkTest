package com.vitalink.seguranca;

import com.vitalink.modelos.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {
    
    private Long id;
    private String email;
    private String nome;
    private String senha;
    private Collection<? extends GrantedAuthority> authorities;
    
    public UserPrincipal(Long id, String email, String nome, String senha, 
                        Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.authorities = authorities;
    }
    
    public static UserPrincipal create(Usuario usuario) {
        Collection<GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority("ROLE_" + usuario.getTipo().name())
        );
        
        return new UserPrincipal(
            usuario.getId(),
            usuario.getEmail(),
            usuario.getNome(),
            usuario.getSenha(),
            authorities
        );
    }
    
    public Long getId() {
        return id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getNome() {
        return nome;
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public String getPassword() {
        return senha;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
}
