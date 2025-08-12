package com.vitalink.servicos;

import com.vitalink.modelos.Convenio;
import com.vitalink.repositorios.ConvenioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ConvenioService {
    
    @Autowired
    private ConvenioRepository convenioRepository;
    
    public Convenio criarConvenio(String nome, String descricao) {
        if (convenioRepository.existsByNome(nome)) {
            throw new RuntimeException("Convênio já cadastrado no sistema");
        }
        
        Convenio convenio = new Convenio();
        convenio.setNome(nome);
        convenio.setDescricao(descricao);
        
        return convenioRepository.save(convenio);
    }
    
    public Optional<Convenio> buscarPorId(Long id) {
        return convenioRepository.findById(id);
    }
    
    public Optional<Convenio> buscarPorNome(String nome) {
        return convenioRepository.findByNome(nome);
    }
    
    public List<Convenio> listarTodos() {
        return convenioRepository.findAllByOrderByNomeAsc();
    }
    
    public List<Convenio> listarAtivos() {
        return convenioRepository.findByAtivoTrue();
    }
    
    public List<Convenio> buscarPorNomeParcial(String termoBusca) {
        return convenioRepository.findByNomeContainingIgnoreCase(termoBusca);
    }
    
    public Convenio atualizarConvenio(Long id, String nome, String descricao) {
        Convenio convenio = convenioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Convênio não encontrado"));
        
        // Verifica se o nome já existe para outro convênio
        Optional<Convenio> convenioExistente = convenioRepository.findByNome(nome);
        if (convenioExistente.isPresent() && !convenioExistente.get().getId().equals(id)) {
            throw new RuntimeException("Nome do convênio já cadastrado");
        }
        
        convenio.setNome(nome);
        convenio.setDescricao(descricao);
        
        return convenioRepository.save(convenio);
    }
    
    public void desativarConvenio(Long id) {
        Convenio convenio = convenioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Convênio não encontrado"));
        
        convenio.setAtivo(false);
        convenioRepository.save(convenio);
    }
    
    public void ativarConvenio(Long id) {
        Convenio convenio = convenioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Convênio não encontrado"));
        
        convenio.setAtivo(true);
        convenioRepository.save(convenio);
    }
}
