package com.vitalink.repositorios;

import com.vitalink.modelos.Usuario;
import com.vitalink.modelos.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    Boolean existsByEmail(String email);
    
    List<Usuario> findByTipo(TipoUsuario tipo);
    
    List<Usuario> findByAtivoTrue();
    
    List<Usuario> findByTipoAndAtivoTrue(TipoUsuario tipo);
}
