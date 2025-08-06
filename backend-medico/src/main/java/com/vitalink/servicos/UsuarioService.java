package com.vitalink.servicos;

import com.vitalink.modelos.Usuario;
import com.vitalink.modelos.TipoUsuario;
import com.vitalink.repositorios.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Usuario criarUsuario(String email, String nome, String senha, TipoUsuario tipo) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new RuntimeException("Email já cadastrado no sistema");
        }
        
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setNome(nome);
        usuario.setSenha(passwordEncoder.encode(senha));
        usuario.setTipo(tipo);
        
        return usuarioRepository.save(usuario);
    }
    
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
    
    public List<Usuario> listarAtivos() {
        return usuarioRepository.findByAtivoTrue();
    }
    
    public List<Usuario> listarPorTipo(TipoUsuario tipo) {
        return usuarioRepository.findByTipoAndAtivoTrue(tipo);
    }
    
    public Usuario atualizarUsuario(Long id, String nome, String email) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Verifica se o email já existe para outro usuário
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(email);
        if (usuarioExistente.isPresent() && !usuarioExistente.get().getId().equals(id)) {
            throw new RuntimeException("Email já cadastrado para outro usuário");
        }
        
        usuario.setNome(nome);
        usuario.setEmail(email);
        
        return usuarioRepository.save(usuario);
    }
    
    public void alterarSenha(Long id, String senhaAtual, String novaSenha) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (!passwordEncoder.matches(senhaAtual, usuario.getSenha())) {
            throw new RuntimeException("Senha atual incorreta");
        }
        
        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
    }
    
    public void desativarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        usuario.setAtivo(false);
        usuarioRepository.save(usuario);
    }
    
    public void ativarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        usuario.setAtivo(true);
        usuarioRepository.save(usuario);
    }
    
    public boolean verificarSenha(String email, String senha) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        if (usuario.isPresent() && usuario.get().getAtivo()) {
            return passwordEncoder.matches(senha, usuario.get().getSenha());
        }
        return false;
    }
}
