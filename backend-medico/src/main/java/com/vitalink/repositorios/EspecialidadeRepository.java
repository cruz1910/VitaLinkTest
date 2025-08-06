package com.vitalink.repositorios;

import com.vitalink.modelos.Especialidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long> {
    
    Optional<Especialidade> findByNome(String nome);
    
    Boolean existsByNome(String nome);
    
    List<Especialidade> findByNomeContainingIgnoreCase(String nome);
    
    List<Especialidade> findAllByOrderByNomeAsc();
}
