package com.vitalink.controladores;

import com.vitalink.dto.MessageResponse;
import com.vitalink.modelos.*;
import com.vitalink.servicos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private MedicoService medicoService;
    
    @Autowired
    private EspecialidadeService especialidadeService;
    
    @Autowired
    private ConvenioService convenioService;
    
    @Autowired
    private ClinicaService clinicaService;
    
    // Gerenciamento de Usuários
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarTodos();
        return ResponseEntity.ok(usuarios);
    }
    
    @PutMapping("/usuarios/{id}/ativar")
    public ResponseEntity<?> ativarUsuario(@PathVariable Long id) {
        try {
            usuarioService.ativarUsuario(id);
            return ResponseEntity.ok(new MessageResponse("Usuário ativado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PutMapping("/usuarios/{id}/desativar")
    public ResponseEntity<?> desativarUsuario(@PathVariable Long id) {
        try {
            usuarioService.desativarUsuario(id);
            return ResponseEntity.ok(new MessageResponse("Usuário desativado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    // Gerenciamento de Especialidades
    @PostMapping("/especialidades")
    public ResponseEntity<?> criarEspecialidade(@RequestParam String nome,
                                               @RequestParam(required = false) String descricao) {
        try {
            Especialidade especialidade = especialidadeService.criarEspecialidade(nome, descricao);
            return ResponseEntity.ok(especialidade);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PutMapping("/especialidades/{id}")
    public ResponseEntity<?> atualizarEspecialidade(@PathVariable Long id,
                                                   @RequestParam String nome,
                                                   @RequestParam(required = false) String descricao) {
        try {
            Especialidade especialidade = especialidadeService.atualizarEspecialidade(id, nome, descricao);
            return ResponseEntity.ok(especialidade);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/especialidades/{id}")
    public ResponseEntity<?> excluirEspecialidade(@PathVariable Long id) {
        try {
            especialidadeService.excluirEspecialidade(id);
            return ResponseEntity.ok(new MessageResponse("Especialidade excluída com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    // Gerenciamento de Convênios
    @PostMapping("/convenios")
    public ResponseEntity<?> criarConvenio(@RequestParam String nome,
                                          @RequestParam(required = false) String descricao) {
        try {
            Convenio convenio = convenioService.criarConvenio(nome, descricao);
            return ResponseEntity.ok(convenio);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PutMapping("/convenios/{id}")
    public ResponseEntity<?> atualizarConvenio(@PathVariable Long id,
                                              @RequestParam String nome,
                                              @RequestParam(required = false) String descricao) {
        try {
            Convenio convenio = convenioService.atualizarConvenio(id, nome, descricao);
            return ResponseEntity.ok(convenio);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PutMapping("/convenios/{id}/ativar")
    public ResponseEntity<?> ativarConvenio(@PathVariable Long id) {
        try {
            convenioService.ativarConvenio(id);
            return ResponseEntity.ok(new MessageResponse("Convênio ativado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PutMapping("/convenios/{id}/desativar")
    public ResponseEntity<?> desativarConvenio(@PathVariable Long id) {
        try {
            convenioService.desativarConvenio(id);
            return ResponseEntity.ok(new MessageResponse("Convênio desativado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    // Gerenciamento de Clínicas
    @PostMapping("/clinicas")
    public ResponseEntity<?> criarClinica(@RequestParam String nome,
                                         @RequestParam String endereco,
                                         @RequestParam String cidade,
                                         @RequestParam String estado,
                                         @RequestParam(required = false) String cep,
                                         @RequestParam(required = false) String telefone,
                                         @RequestParam(required = false) String email,
                                         @RequestParam(required = false) String descricao) {
        try {
            Clinica clinica = clinicaService.criarClinica(nome, endereco, cidade, estado, cep, telefone, email, descricao);
            return ResponseEntity.ok(clinica);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PutMapping("/clinicas/{id}")
    public ResponseEntity<?> atualizarClinica(@PathVariable Long id,
                                             @RequestParam String nome,
                                             @RequestParam String endereco,
                                             @RequestParam String cidade,
                                             @RequestParam String estado,
                                             @RequestParam(required = false) String cep,
                                             @RequestParam(required = false) String telefone,
                                             @RequestParam(required = false) String email,
                                             @RequestParam(required = false) String descricao) {
        try {
            Clinica clinica = clinicaService.atualizarClinica(id, nome, endereco, cidade, estado, cep, telefone, email, descricao);
            return ResponseEntity.ok(clinica);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PutMapping("/clinicas/{id}/ativar")
    public ResponseEntity<?> ativarClinica(@PathVariable Long id) {
        try {
            clinicaService.ativarClinica(id);
            return ResponseEntity.ok(new MessageResponse("Clínica ativada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PutMapping("/clinicas/{id}/desativar")
    public ResponseEntity<?> desativarClinica(@PathVariable Long id) {
        try {
            clinicaService.desativarClinica(id);
            return ResponseEntity.ok(new MessageResponse("Clínica desativada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    // Estatísticas
    @GetMapping("/estatisticas")
    public ResponseEntity<?> obterEstatisticas() {
        try {
            List<Usuario> usuarios = usuarioService.listarTodos();
            List<Medico> medicos = medicoService.listarTodos();
            List<Especialidade> especialidades = especialidadeService.listarTodas();
            List<Convenio> convenios = convenioService.listarTodos();
            List<Clinica> clinicas = clinicaService.listarTodas();
            
            return ResponseEntity.ok(new Object() {
                public final int totalUsuarios = usuarios.size();
                public final int totalMedicos = medicos.size();
                public final int totalEspecialidades = especialidades.size();
                public final int totalConvenios = convenios.size();
                public final int totalClinicas = clinicas.size();
            });
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao obter estatísticas: " + e.getMessage()));
        }
    }
}
