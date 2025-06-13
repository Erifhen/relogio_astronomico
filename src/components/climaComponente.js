import React, {useState, useEffect} from "react";
import axios from 'axios';


const ClimaAtual = () => {
    const [climaAgora, setClimaAgora] = useState(null);


    useEffect(() =>{

        const buscarClima = async () => {
            try{
                const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;;
                const city = 'Sao Paulo';
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`);
                setClimaAgora(response.data);
            } catch (error){
                console.log("Erro em descobrir o clima, brow...", error);
            }
        };
        buscarClima();

        const intervaloBusca = setInterval(buscarClima, 3 * 60 * 60 * 1000);
        return () => clearInterval(intervaloBusca);
    }, []);

    if (!climaAgora) {
        return <div>Carregando informações do clima...</div>;
    }
    return(
        <div>
            <h2>Clima Atual:</h2>
            <p>Temperatura: {climaAgora.main.temp} °C</p>
            <p>Condição do tempo: {climaAgora.weather[0].description}</p>
            {climaAgora.main.temp_max && (
            <p>Temperatura Máxima: {climaAgora.main.temp_max} °C</p>
            )}
            {climaAgora.main.temp_min && (
             <p>Temperatura Mínima: {climaAgora.main.temp_min} °C</p>
            )}
        </div>
    )
};

export default ClimaAtual;