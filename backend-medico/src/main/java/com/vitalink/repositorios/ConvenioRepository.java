package com.vitalink.repositorios;

import com.vitalink.modelos.Convenio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ConvenioRepository extends JpaRepository<Convenio, Long> {
    
    Optional<Convenio> findByNome(String nome);
    
    Boolean existsByNome(String nome);
    
    List<Convenio> findByNomeContainingIgnoreCase(String nome);
    
    List<Convenio> findByAtivoTrue();
    
    List<Convenio> findAllByOrderByNomeAsc();
}
