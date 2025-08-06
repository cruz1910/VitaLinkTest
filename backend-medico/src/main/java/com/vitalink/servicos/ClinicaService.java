package com.vitalink.servicos;

import com.vitalink.modelos.Clinica;
import com.vitalink.repositorios.ClinicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClinicaService {
    
    @Autowired
    private ClinicaRepository clinicaRepository;
    
    public Clinica criarClinica(String nome, String endereco, String cidade, String estado, 
                               String cep, String telefone, String email, String descricao) {
        Clinica clinica = new Clinica();
        clinica.setNome(nome);
        clinica.setEndereco(endereco);
        clinica.setCidade(cidade);
        clinica.setEstado(estado);
        clinica.setCep(cep);
        clinica.setTelefone(telefone);
        clinica.setEmail(email);
        clinica.setDescricao(descricao);
        
        return clinicaRepository.save(clinica);
    }
    
    public Optional<Clinica> buscarPorId(Long id) {
        return clinicaRepository.findById(id);
    }
    
    public List<Clinica> listarTodas() {
        return clinicaRepository.findAllByOrderByNomeAsc();
    }
    
    public List<Clinica> listarAtivas() {
        return clinicaRepository.findByAtivaTrue();
    }
    
    public List<Clinica> buscarPorNome(String nome) {
        return clinicaRepository.findByNomeContainingIgnoreCase(nome);
    }
    
    public List<Clinica> buscarPorCidade(String cidade) {
        return clinicaRepository.findByCidade(cidade);
    }
    
    public List<Clinica> buscarPorEstado(String estado) {
        return clinicaRepository.findByEstado(estado);
    }
    
    public List<Clinica> buscarPorCidadeEEstado(String cidade, String estado) {
        return clinicaRepository.findByCidadeAndEstado(cidade, estado);
    }
    
    public Clinica atualizarClinica(Long id, String nome, String endereco, String cidade, String estado,
                                   String cep, String telefone, String email, String descricao) {
        Clinica clinica = clinicaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Clínica não encontrada"));
        
        clinica.setNome(nome);
        clinica.setEndereco(endereco);
        clinica.setCidade(cidade);
        clinica.setEstado(estado);
        clinica.setCep(cep);
        clinica.setTelefone(telefone);
        clinica.setEmail(email);
        clinica.setDescricao(descricao);
        
        return clinicaRepository.save(clinica);
    }
    
    public void desativarClinica(Long id) {
        Clinica clinica = clinicaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Clínica não encontrada"));
        
        clinica.setAtiva(false);
        clinicaRepository.save(clinica);
    }
    
    public void ativarClinica(Long id) {
        Clinica clinica = clinicaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Clínica não encontrada"));
        
        clinica.setAtiva(true);
        clinicaRepository.save(clinica);
    }
}
