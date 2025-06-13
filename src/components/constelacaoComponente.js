import React, { useState, useEffect } from "react";
import axios from 'axios';



const MapaAstroAtual = () => {
    const [mapaUrl, setMapaUrl] = useState('');

    useEffect(() => {
        const ceuAgora = new Date()

        const requestData = {
            style: "default",
            observer: {
                latitude: -23.55052, //utilize suas coordenas, botei hardcode sp só pra testar
                longitude: -46.633308,
                date: ceuAgora.toISOString().split('T')[0]
            },
            view: {
                type: "area",
                parameters: {
                    position: {
                        equatorial: {
                            rightAscension: 0,
                            declination: 0,
                             zoom: 8
                        }
                    }
                   
                }
            }
        };

        const gerarMapa = async () => {
            try {
                const response = await axios.post(
                    'https://api.astronomyapi.com/api/v2/studio/star-chart',
                    JSON.stringify(requestData), 
                    {
                        headers: {
                            'Authorization': 'Basic MmJjMmE2YjktZGY4MC00NWJjLWEyM2YtYjNhNTBiNzExNzZiOmE4NDc4ZjcxZjdkYjc2MTFmNGZkNjNkMGE3MWUwNWFmNDBhNzRiODk4OTIzMDQyODg1MTA3ODdhNGZmYzc2M2IzYzg4NDE5ZDc5ZDAyNGMyMWRjYzY5ZjRiYzU4ZmM0ZDJhYTBkMzA5ODM5YzA0ZWRiNTdkNDNhMjJiZDA1MzYxYWFkZjk2ZTNjNjMzYzA0M2ZlMDM5MWJkZTdhYmVkZGJmYzk1M2RhNjlmYWVhZDZjOWNkNTRlN2YwNzJiZjliNWEyNjhiZmE5N2RkMDdkZDkxNjJhM2I3ZGFlNjYyYTVi',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setMapaUrl(response.data.data.imageUrl);
            } catch (error) {
                console.error('Erro ao buscar mapa de estrelas:', error);
            }
        };
        
        gerarMapa();
        const intervaloBusca = setInterval(gerarMapa, 3 * 60 * 60 * 1000);
        return () => clearInterval(intervaloBusca);

    }, []);

    if (!mapaUrl) {
        return <div>Carregando mapa de estrelas...</div>;
    }

    return (
        <div>
            <h2>Mapa Atual das Estrelas:</h2>
            <img src={mapaUrl} alt="Mapa das Estrelas" className="mapaEstrelas"/>
        </div>
    );
};

export default MapaAstroAtual;
