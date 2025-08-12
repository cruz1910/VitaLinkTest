package com.vitalink.servicos;

import com.vitalink.modelos.Especialidade;
import com.vitalink.repositorios.EspecialidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EspecialidadeService {
    
    @Autowired
    private EspecialidadeRepository especialidadeRepository;
    
    public Especialidade criarEspecialidade(String nome, String descricao) {
        if (especialidadeRepository.existsByNome(nome)) {
            throw new RuntimeException("Especialidade já cadastrada no sistema");
        }
        
        Especialidade especialidade = new Especialidade();
        especialidade.setNome(nome);
        especialidade.setDescricao(descricao);
        
        return especialidadeRepository.save(especialidade);
    }
    
    public Optional<Especialidade> buscarPorId(Long id) {
        return especialidadeRepository.findById(id);
    }
    
    public Optional<Especialidade> buscarPorNome(String nome) {
        return especialidadeRepository.findByNome(nome);
    }
    
    public List<Especialidade> listarTodas() {
        return especialidadeRepository.findAllByOrderByNomeAsc();
    }
    
    public List<Especialidade> buscarPorNomeParcial(String termoBusca) {
        return especialidadeRepository.findByNomeContainingIgnoreCase(termoBusca);
    }
    
    public Especialidade atualizarEspecialidade(Long id, String nome, String descricao) {
        Especialidade especialidade = especialidadeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Especialidade não encontrada"));
        
        // Verifica se o nome já existe para outra especialidade
        Optional<Especialidade> especialidadeExistente = especialidadeRepository.findByNome(nome);
        if (especialidadeExistente.isPresent() && !especialidadeExistente.get().getId().equals(id)) {
            throw new RuntimeException("Nome da especialidade já cadastrado");
        }
        
        especialidade.setNome(nome);
        especialidade.setDescricao(descricao);
        
        return especialidadeRepository.save(especialidade);
    }
    
    public void excluirEspecialidade(Long id) {
        Especialidade especialidade = especialidadeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Especialidade não encontrada"));
        
        if (!especialidade.getMedicos().isEmpty()) {
            throw new RuntimeException("Não é possível excluir especialidade que possui médicos associados");
        }
        
        especialidadeRepository.delete(especialidade);
    }
}
