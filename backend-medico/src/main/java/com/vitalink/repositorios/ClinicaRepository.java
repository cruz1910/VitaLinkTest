package com.vitalink.repositorios;

import com.vitalink.modelos.Clinica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClinicaRepository extends JpaRepository<Clinica, Long> {
    
    List<Clinica> findByNomeContainingIgnoreCase(String nome);
    
    List<Clinica> findByCidade(String cidade);
    
    List<Clinica> findByEstado(String estado);
    
    List<Clinica> findByCidadeAndEstado(String cidade, String estado);
    
    List<Clinica> findByAtivaTrue();
    
    List<Clinica> findAllByOrderByNomeAsc();
}
