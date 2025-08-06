package com.vitalink.controladores;

import com.vitalink.dto.MessageResponse;
import com.vitalink.modelos.*;
import com.vitalink.seguranca.UserPrincipal;
import com.vitalink.servicos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/medico")
public class MedicoController {
    
    @Autowired
    private MedicoService medicoService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private EspecialidadeService especialidadeService;
    
    @Autowired
    private ConvenioService convenioService;
    
    @Autowired
    private ClinicaService clinicaService;
    
    @GetMapping("/perfil")
    public ResponseEntity<?> obterPerfil(Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Optional<Medico> medico = medicoService.buscarPorUsuarioId(userPrincipal.getId());
            
            if (medico.isPresent()) {
                return ResponseEntity.ok(medico.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao obter perfil: " + e.getMessage()));
        }
    }
    
    @PutMapping("/perfil")
    public ResponseEntity<?> atualizarPerfil(Authentication authentication,
                                            @RequestParam String telefone,
                                            @RequestParam String descricao) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Optional<Medico> medicoOpt = medicoService.buscarPorUsuarioId(userPrincipal.getId());
            
            if (medicoOpt.isPresent()) {
                Medico medico = medicoService.atualizarMedico(medicoOpt.get().getId(), telefone, descricao);
                return ResponseEntity.ok(medico);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao atualizar perfil: " + e.getMessage()));
        }
    }
    
    @PostMapping("/especialidades/{especialidadeId}")
    public ResponseEntity<?> adicionarEspecialidade(Authentication authentication,
                                                   @PathVariable Long especialidadeId) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Optional<Medico> medicoOpt = medicoService.buscarPorUsuarioId(userPrincipal.getId());
            
            if (medicoOpt.isPresent()) {
                Medico medico = medicoService.adicionarEspecialidade(medicoOpt.get().getId(), especialidadeId);
                return ResponseEntity.ok(medico);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao adicionar especialidade: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/especialidades/{especialidadeId}")
    public ResponseEntity<?> removerEspecialidade(Authentication authentication,
                                                 @PathVariable Long especialidadeId) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Optional<Medico> medicoOpt = medicoService.buscarPorUsuarioId(userPrincipal.getId());
            
            if (medicoOpt.isPresent()) {
                Medico medico = medicoService.removerEspecialidade(medicoOpt.get().getId(), especialidadeId);
                return ResponseEntity.ok(medico);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao remover especialidade: " + e.getMessage()));
        }
    }
    
    @PostMapping("/convenios/{convenioId}")
    public ResponseEntity<?> adicionarConvenio(Authentication authentication,
                                              @PathVariable Long convenioId) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Optional<Medico> medicoOpt = medicoService.buscarPorUsuarioId(userPrincipal.getId());
            
            if (medicoOpt.isPresent()) {
                Medico medico = medicoService.adicionarConvenio(medicoOpt.get().getId(), convenioId);
                return ResponseEntity.ok(medico);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao adicionar convênio: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/convenios/{convenioId}")
    public ResponseEntity<?> removerConvenio(Authentication authentication,
                                            @PathVariable Long convenioId) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Optional<Medico> medicoOpt = medicoService.buscarPorUsuarioId(userPrincipal.getId());
            
            if (medicoOpt.isPresent()) {
                Medico medico = medicoService.removerConvenio(medicoOpt.get().getId(), convenioId);
                return ResponseEntity.ok(medico);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao remover convênio: " + e.getMessage()));
        }
    }
    
    @PostMapping("/clinicas")
    public ResponseEntity<?> adicionarClinica(Authentication authentication,
                                             @RequestParam Long clinicaId,
                                             @RequestParam(required = false) String cargo,
                                             @RequestParam(required = false) String observacoes) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Optional<Medico> medicoOpt = medicoService.buscarPorUsuarioId(userPrincipal.getId());
            
            if (medicoOpt.isPresent()) {
                MedicoClinica medicoClinica = medicoService.adicionarClinica(
                    medicoOpt.get().getId(), clinicaId, cargo, observacoes);
                return ResponseEntity.ok(medicoClinica);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao adicionar clínica: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/clinicas/{medicoClinicaId}")
    public ResponseEntity<?> removerClinica(Authentication authentication,
                                           @PathVariable Long medicoClinicaId) {
        try {
            medicoService.removerClinica(medicoClinicaId);
            return ResponseEntity.ok(new MessageResponse("Clínica removida com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao remover clínica: " + e.getMessage()));
        }
    }
}
