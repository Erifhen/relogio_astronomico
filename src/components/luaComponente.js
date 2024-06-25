import React, { useEffect, useState } from 'react';
import { Hemisphere, Moon } from 'lunarphase-js';

const traduzirFase = (faseIngles) =>{
    const traducoes = {
        'New': 'Nova',
        'Waxing Crescent': 'Crescente',
        'First Quarter': 'Quarto Crescente',
        'Waxing Gibbous': 'Gibosa Crescente',
        'Full': 'Cheia',
        'Waning Gibbous': 'Gibosa Minguante',
        'Last Quarter': 'Quarto Minguante',
        'Waning Crescent': 'Minguante'
    };

    return traducoes[faseIngles] || faseIngles;
}


const LuaAtual = () => {
    const [fase, setFase] = useState('');
    const [faseEmoji, setFaseEmoji] = useState('');

    useEffect(() => {
        const calcularFase = () => {
            const dataAtual = new Date();
            const faseAtual = Moon.lunarPhase(dataAtual, Hemisphere.SOUTHERN);
            const emojiAtual = Moon.lunarPhaseEmoji(dataAtual, Hemisphere.SOUTHERN);
            const faseTraduzida = traduzirFase(faseAtual);
            setFase(faseTraduzida); 
            setFaseEmoji(emojiAtual);
        };

        calcularFase();
        const intervaloBusca = setInterval(calcularFase, 3 * 60 * 60 * 1000);
        return () => clearInterval(intervaloBusca);
    }, []);
    if (!fase) {
        return <div>Procurando a fase da lua...</div>;
    }
    return (
        <div>
            <h2>Fase da lua:</h2>
            <p>{fase} {faseEmoji}</p>
        </div>
    );
};

export default LuaAtual;
