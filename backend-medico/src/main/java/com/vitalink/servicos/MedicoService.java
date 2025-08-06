package com.vitalink.servicos;

import com.vitalink.modelos.*;
import com.vitalink.repositorios.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class MedicoService {
    
    @Autowired
    private MedicoRepository medicoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private EspecialidadeRepository especialidadeRepository;
    
    @Autowired
    private ConvenioRepository convenioRepository;
    
    @Autowired
    private ClinicaRepository clinicaRepository;
    
    @Autowired
    private MedicoClinicaRepository medicoClinicaRepository;
    
    public Medico criarMedico(Long usuarioId, String crm, String ufCrm, String telefone, String descricao) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (usuario.getTipo() != TipoUsuario.MEDICO) {
            throw new RuntimeException("Usuário deve ser do tipo MEDICO");
        }
        
        if (medicoRepository.existsByCrm(crm)) {
            throw new RuntimeException("CRM já cadastrado no sistema");
        }
        
        Medico medico = new Medico();
        medico.setUsuario(usuario);
        medico.setCrm(crm);
        medico.setUfCrm(ufCrm);
        medico.setTelefone(telefone);
        medico.setDescricao(descricao);
        
        return medicoRepository.save(medico);
    }
    
    public Optional<Medico> buscarPorId(Long id) {
        return medicoRepository.findById(id);
    }
    
    public Optional<Medico> buscarPorUsuarioId(Long usuarioId) {
        return medicoRepository.findByUsuarioId(usuarioId);
    }
    
    public Optional<Medico> buscarPorCrm(String crm) {
        return medicoRepository.findByCrm(crm);
    }
    
    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }
    
    public List<Medico> buscarPorFiltros(Long especialidadeId, Long convenioId, Long clinicaId, String cidade, String estado) {
        return medicoRepository.findByFiltros(especialidadeId, convenioId, clinicaId, cidade, estado);
    }
    
    public List<Medico> buscarPorEspecialidade(Long especialidadeId) {
        return medicoRepository.findByEspecialidadeId(especialidadeId);
    }
    
    public List<Medico> buscarPorConvenio(Long convenioId) {
        return medicoRepository.findByConvenioId(convenioId);
    }
    
    public List<Medico> buscarPorClinica(Long clinicaId) {
        return medicoRepository.findByClinicaId(clinicaId);
    }
    
    public List<Medico> buscarPorCidade(String cidade) {
        return medicoRepository.findByCidade(cidade);
    }
    
    public Medico atualizarMedico(Long id, String telefone, String descricao) {
        Medico medico = medicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        
        medico.setTelefone(telefone);
        medico.setDescricao(descricao);
        
        return medicoRepository.save(medico);
    }
    
    public Medico adicionarEspecialidade(Long medicoId, Long especialidadeId) {
        Medico medico = medicoRepository.findById(medicoId)
            .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        
        Especialidade especialidade = especialidadeRepository.findById(especialidadeId)
            .orElseThrow(() -> new RuntimeException("Especialidade não encontrada"));
        
        medico.getEspecialidades().add(especialidade);
        return medicoRepository.save(medico);
    }
    
    public Medico removerEspecialidade(Long medicoId, Long especialidadeId) {
        Medico medico = medicoRepository.findById(medicoId)
            .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        
        Especialidade especialidade = especialidadeRepository.findById(especialidadeId)
            .orElseThrow(() -> new RuntimeException("Especialidade não encontrada"));
        
        medico.getEspecialidades().remove(especialidade);
        return medicoRepository.save(medico);
    }
    
    public Medico adicionarConvenio(Long medicoId, Long convenioId) {
        Medico medico = medicoRepository.findById(medicoId)
            .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        
        Convenio convenio = convenioRepository.findById(convenioId)
            .orElseThrow(() -> new RuntimeException("Convênio não encontrado"));
        
        medico.getConvenios().add(convenio);
        return medicoRepository.save(medico);
    }
    
    public Medico removerConvenio(Long medicoId, Long convenioId) {
        Medico medico = medicoRepository.findById(medicoId)
            .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        
        Convenio convenio = convenioRepository.findById(convenioId)
            .orElseThrow(() -> new RuntimeException("Convênio não encontrado"));
        
        medico.getConvenios().remove(convenio);
        return medicoRepository.save(medico);
    }
    
    public MedicoClinica adicionarClinica(Long medicoId, Long clinicaId, String cargo, String observacoes) {
        Medico medico = medicoRepository.findById(medicoId)
            .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        
        Clinica clinica = clinicaRepository.findById(clinicaId)
            .orElseThrow(() -> new RuntimeException("Clínica não encontrada"));
        
        MedicoClinica medicoClinica = new MedicoClinica();
        medicoClinica.setMedico(medico);
        medicoClinica.setClinica(clinica);
        medicoClinica.setCargo(cargo);
        medicoClinica.setObservacoes(observacoes);
        
        return medicoClinicaRepository.save(medicoClinica);
    }
    
    public void removerClinica(Long medicoClinicaId) {
        MedicoClinica medicoClinica = medicoClinicaRepository.findById(medicoClinicaId)
            .orElseThrow(() -> new RuntimeException("Associação médico-clínica não encontrada"));
        
        medicoClinica.setAtivo(false);
        medicoClinicaRepository.save(medicoClinica);
    }
}
