package com.vitalink.controladores;

import com.vitalink.dto.*;
import com.vitalink.modelos.*;
import com.vitalink.seguranca.JwtUtils;
import com.vitalink.seguranca.UserPrincipal;
import com.vitalink.servicos.MedicoService;
import com.vitalink.servicos.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UsuarioService usuarioService;
    
    @Autowired
    MedicoService medicoService;
    
    @Autowired
    JwtUtils jwtUtils;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getSenha()));
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            
            return ResponseEntity.ok(new JwtResponse(jwt,
                                                   userPrincipal.getId(),
                                                   userPrincipal.getEmail(),
                                                   userPrincipal.getNome(),
                                                   usuarioService.buscarPorId(userPrincipal.getId()).get().getTipo()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Erro: Email ou senha inválidos!"));
        }
    }
    
    @PostMapping("/cadastro")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            // Criar usuário
            Usuario usuario = usuarioService.criarUsuario(
                signUpRequest.getEmail(),
                signUpRequest.getNome(),
                signUpRequest.getSenha(),
                signUpRequest.getTipo()
            );
            
            // Se for médico, criar perfil de médico
            if (signUpRequest.getTipo() == TipoUsuario.MEDICO) {
                if (signUpRequest.getCrm() == null || signUpRequest.getUfCrm() == null) {
                    return ResponseEntity.badRequest()
                        .body(new MessageResponse("Erro: CRM e UF são obrigatórios para médicos!"));
                }
                
                medicoService.criarMedico(
                    usuario.getId(),
                    signUpRequest.getCrm(),
                    signUpRequest.getUfCrm(),
                    signUpRequest.getTelefone(),
                    signUpRequest.getDescricao()
                );
            }
            
            return ResponseEntity.ok(new MessageResponse("Usuário registrado com sucesso!"));
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Erro: " + e.getMessage()));
        }
    }
    
    @PostMapping("/verificar-token")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7); // Remove "Bearer "
            if (jwtUtils.validateJwtToken(jwt)) {
                String email = jwtUtils.getUserEmailFromJwtToken(jwt);
                Usuario usuario = usuarioService.buscarPorEmail(email).orElse(null);
                
                if (usuario != null && usuario.getAtivo()) {
                    return ResponseEntity.ok(new MessageResponse("Token válido"));
                }
            }
            return ResponseEntity.badRequest().body(new MessageResponse("Token inválido"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Token inválido"));
        }
    }
}
