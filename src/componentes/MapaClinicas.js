import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { publicoService } from '../servicos/api';

// Fix para ícones do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Ícone personalizado para clínicas
const clinicaIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Coordenadas aproximadas das clínicas em Florianópolis
const coordenadasClinicas = {
  'Hospital Universitário': { lat: -27.6006, lng: -48.5194 },
  'Clínica Centro': { lat: -27.5954, lng: -48.5480 },
  'Hospital São José': { lat: -27.5969, lng: -48.5495 },
  'Clínica Trindade': { lat: -27.5717, lng: -48.5065 },
  'Hospital Infantil Joana de Gusmão': { lat: -27.5944, lng: -48.5550 },
  'Clínica Lagoa da Conceição': { lat: -27.5992, lng: -48.4587 },
  'Hospital Governador Celso Ramos': { lat: -27.5838, lng: -48.5054 },
  'Clínica Canasvieiras': { lat: -27.4389, lng: -48.4644 }
};

function MapaClinicas({ filtros = {}, altura = '400px' }) {
  const [clinicas, setClinicas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarClinicas();
  }, [filtros]);

  const carregarClinicas = async () => {
    try {
      setCarregando(true);
      const response = await publicoService.listarClinicas();
      
      // Filtrar clínicas de Florianópolis
      const clinicasFloripa = response.data.filter(clinica => 
        clinica.cidade?.toLowerCase().includes('florianópolis') ||
        clinica.cidade?.toLowerCase().includes('florianopolis')
      );

      // Adicionar coordenadas às clínicas
      const clinicasComCoordenadas = clinicasFloripa.map(clinica => ({
        ...clinica,
        coordenadas: coordenadasClinicas[clinica.nome] || {
          lat: -27.5954 + (Math.random() - 0.5) * 0.1, // Coordenadas aleatórias próximas ao centro
          lng: -48.5480 + (Math.random() - 0.5) * 0.1
        }
      }));

      setClinicas(clinicasComCoordenadas);
    } catch (error) {
      console.error('Erro ao carregar clínicas:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Centro do mapa: Florianópolis
  const centroFlorianopolis = [-27.5954, -48.5480];

  if (carregando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: altura }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando mapa...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mapa-clinicas">
      <div className="mb-3">
        <h5 className="mb-2">
          <i className="fas fa-map-marker-alt text-primary me-2"></i>
          Clínicas em Florianópolis - SC
        </h5>
        <p className="text-muted small mb-0">
          {clinicas.length} clínica{clinicas.length !== 1 ? 's' : ''} encontrada{clinicas.length !== 1 ? 's' : ''}
        </p>
      </div>

      <MapContainer
        center={centroFlorianopolis}
        zoom={11}
        style={{ height: altura, width: '100%', borderRadius: '8px' }}
        className="shadow-sm"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {clinicas.map((clinica) => (
          <Marker
            key={clinica.id}
            position={[clinica.coordenadas.lat, clinica.coordenadas.lng]}
            icon={clinicaIcon}
          >
            <Popup maxWidth={300}>
              <div className="popup-clinica">
                <h6 className="mb-2 text-primary">
                  <i className="fas fa-hospital me-2"></i>
                  {clinica.nome}
                </h6>
                
                <div className="mb-2">
                  <small className="text-muted d-block">
                    <i className="fas fa-map-marker-alt me-1"></i>
                    {clinica.endereco}
                  </small>
                  <small className="text-muted d-block">
                    {clinica.cidade} - {clinica.estado}
                  </small>
                  {clinica.cep && (
                    <small className="text-muted d-block">
                      CEP: {clinica.cep}
                    </small>
                  )}
                </div>

                {clinica.telefone && (
                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="fas fa-phone me-1"></i>
                      {clinica.telefone}
                    </small>
                  </div>
                )}

                {clinica.email && (
                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="fas fa-envelope me-1"></i>
                      {clinica.email}
                    </small>
                  </div>
                )}

                {clinica.descricao && (
                  <div className="mt-2">
                    <small className="text-muted">
                      {clinica.descricao}
                    </small>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="mt-2">
        <small className="text-muted">
          <i className="fas fa-info-circle me-1"></i>
          Clique nos marcadores para ver mais informações sobre cada clínica
        </small>
      </div>
    </div>
  );
}

export default MapaClinicas;
