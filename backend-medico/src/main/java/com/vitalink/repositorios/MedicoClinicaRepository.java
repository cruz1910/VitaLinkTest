package com.vitalink.repositorios;

import com.vitalink.modelos.MedicoClinica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicoClinicaRepository extends JpaRepository<MedicoClinica, Long> {
    
    List<MedicoClinica> findByMedicoId(Long medicoId);
    
    List<MedicoClinica> findByClinicaId(Long clinicaId);
    
    List<MedicoClinica> findByMedicoIdAndAtivoTrue(Long medicoId);
    
    List<MedicoClinica> findByClinicaIdAndAtivoTrue(Long clinicaId);
    
    List<MedicoClinica> findByAtivoTrue();
}
