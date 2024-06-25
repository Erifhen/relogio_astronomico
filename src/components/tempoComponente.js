import React, { useState, useEffect } from "react";


const TempoAtual = () => {
    const [tempo, setTempo] = useState(new Date());

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTempo(new Date());
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const formatarData = (date) => {
        const pad = (num, size) =>{
            let s = "000" + num;
            return s.substr(s.length - size);
        };
        const dia = pad(date.getDate(), 2);
        const mes = pad(date.getMonth() + 1, 2);
        const ano = date.getFullYear();
        const horas = pad(date.getHours(), 2);
        const minutos = pad(date.getMinutes(), 2);
        const segundos = pad(date.getSeconds(), 2);

        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`
    }

    return (
        <div>
            <h2>Data e hora atual:</h2>
            <p>{formatarData(tempo)}</p>
        </div>
    );
};

export default TempoAtual;
