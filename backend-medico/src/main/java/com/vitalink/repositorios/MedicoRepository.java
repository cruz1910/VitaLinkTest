package com.vitalink.repositorios;

import com.vitalink.modelos.Medico;
import com.vitalink.modelos.Especialidade;
import com.vitalink.modelos.Convenio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    
    Optional<Medico> findByCrm(String crm);
    
    Boolean existsByCrm(String crm);
    
    Optional<Medico> findByUsuarioId(Long usuarioId);
    
    @Query("SELECT m FROM Medico m JOIN m.especialidades e WHERE e.id = :especialidadeId")
    List<Medico> findByEspecialidadeId(@Param("especialidadeId") Long especialidadeId);
    
    @Query("SELECT m FROM Medico m JOIN m.convenios c WHERE c.id = :convenioId")
    List<Medico> findByConvenioId(@Param("convenioId") Long convenioId);
    
    @Query("SELECT m FROM Medico m JOIN m.clinicas mc JOIN mc.clinica c WHERE c.id = :clinicaId")
    List<Medico> findByClinicaId(@Param("clinicaId") Long clinicaId);
    
    @Query("SELECT m FROM Medico m JOIN m.clinicas mc JOIN mc.clinica c WHERE c.cidade = :cidade")
    List<Medico> findByCidade(@Param("cidade") String cidade);
    
    @Query("SELECT m FROM Medico m JOIN m.clinicas mc JOIN mc.clinica c WHERE c.estado = :estado")
    List<Medico> findByEstado(@Param("estado") String estado);
    
    @Query("SELECT DISTINCT m FROM Medico m " +
           "LEFT JOIN m.especialidades e " +
           "LEFT JOIN m.convenios conv " +
           "LEFT JOIN m.clinicas mc " +
           "LEFT JOIN mc.clinica c " +
           "WHERE (:especialidadeId IS NULL OR e.id = :especialidadeId) " +
           "AND (:convenioId IS NULL OR conv.id = :convenioId) " +
           "AND (:clinicaId IS NULL OR c.id = :clinicaId) " +
           "AND (:cidade IS NULL OR c.cidade = :cidade) " +
           "AND (:estado IS NULL OR c.estado = :estado)")
    List<Medico> findByFiltros(@Param("especialidadeId") Long especialidadeId,
                               @Param("convenioId") Long convenioId,
                               @Param("clinicaId") Long clinicaId,
                               @Param("cidade") String cidade,
                               @Param("estado") String estado);
}
