import React, { useEffect, useState } from "react";
import axios from 'axios';


const FaseLuaImagem = () => {
    const [faseLua, setFaseLua] = useState(null);

    useEffect(() => {
        const ceuAgora = new Date();
        const requestData = {
            style: {
                moonStyle: "default",
                backgroundStyle: "stars",
                backgroundColor: "#000000",
                headingColor: "#ffffff",
                textColor: "#ffffff"
            },
            observer: {
                latitude: -23.55052, //utilize suas coordenas, botei hardcode sp só pra testar
                longitude: -46.633308,
                date: ceuAgora.toISOString().split('T')[0]
            },
            view: {
                type: "portrait-simple",
                parameters: {}
            }
        };

        const gerarLuaImagem = async () => {
            try {
                const response = await axios.post(
                    'https://api.astronomyapi.com/api/v2/studio/moon-phase',
                    requestData, // Remove o JSON.stringify
                    {
                        headers: {
                            'Authorization': 'Basic sua_chave_api',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setFaseLua(response.data.data.imageUrl);
            } catch (error) {
                console.error('Erro ao buscar imagem da lua:', error);
            }
        };

        gerarLuaImagem();
        const intervaloBusca = setInterval(gerarLuaImagem, 3 * 60 * 60 * 1000);
        return () => clearInterval(intervaloBusca);

    }, []);

    if (!faseLua) {
        return <div>Carregando imagem da lua...</div>;
    }

    return (
        <div>
            <h2>Imagem da lua:</h2>
            <img src={faseLua} alt="Lua agora" />
        </div>
    );
};

export default FaseLuaImagem;
