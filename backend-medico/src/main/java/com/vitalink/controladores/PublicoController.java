package com.vitalink.controladores;

import com.vitalink.modelos.*;
import com.vitalink.servicos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/publico")
public class PublicoController {
    
    @Autowired
    private MedicoService medicoService;
    
    @Autowired
    private EspecialidadeService especialidadeService;
    
    @Autowired
    private ConvenioService convenioService;
    
    @Autowired
    private ClinicaService clinicaService;
    
    @GetMapping("/medicos")
    public ResponseEntity<List<Medico>> listarMedicos() {
        List<Medico> medicos = medicoService.listarTodos();
        return ResponseEntity.ok(medicos);
    }
    
    @GetMapping("/medicos/buscar")
    public ResponseEntity<List<Medico>> buscarMedicos(
            @RequestParam(required = false) Long especialidadeId,
            @RequestParam(required = false) Long convenioId,
            @RequestParam(required = false) Long clinicaId,
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) String estado) {
        
        List<Medico> medicos = medicoService.buscarPorFiltros(
            especialidadeId, convenioId, clinicaId, cidade, estado);
        return ResponseEntity.ok(medicos);
    }
    
    @GetMapping("/medicos/{id}")
    public ResponseEntity<Medico> obterMedico(@PathVariable Long id) {
        return medicoService.buscarPorId(id)
            .map(medico -> ResponseEntity.ok(medico))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/especialidades")
    public ResponseEntity<List<Especialidade>> listarEspecialidades() {
        List<Especialidade> especialidades = especialidadeService.listarTodas();
        return ResponseEntity.ok(especialidades);
    }
    
    @GetMapping("/convenios")
    public ResponseEntity<List<Convenio>> listarConvenios() {
        List<Convenio> convenios = convenioService.listarAtivos();
        return ResponseEntity.ok(convenios);
    }
    
    @GetMapping("/clinicas")
    public ResponseEntity<List<Clinica>> listarClinicas() {
        List<Clinica> clinicas = clinicaService.listarAtivas();
        return ResponseEntity.ok(clinicas);
    }
    
    @GetMapping("/clinicas/cidade/{cidade}")
    public ResponseEntity<List<Clinica>> listarClinicasPorCidade(@PathVariable String cidade) {
        List<Clinica> clinicas = clinicaService.buscarPorCidade(cidade);
        return ResponseEntity.ok(clinicas);
    }
    
    @GetMapping("/clinicas/estado/{estado}")
    public ResponseEntity<List<Clinica>> listarClinicasPorEstado(@PathVariable String estado) {
        List<Clinica> clinicas = clinicaService.buscarPorEstado(estado);
        return ResponseEntity.ok(clinicas);
    }
}
