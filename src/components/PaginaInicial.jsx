import React, { useState, useEffect, useRef } from 'react';

// Tamanhos estáticos para os botões
const BUTTON_WIDTH = 100;
const BUTTON_HEIGHT = 50;

// Lista de GIFs aleatórios APENAS PARA O BOTÃO "NÃO"
const gifListNao = [
    'https://media.giphy.com/media/cfuL5gqas4Cv6/giphy.gif', // Gato no PC
    'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif', // Homer sumindo
    'https://media.giphy.com/media/C21GGDOpKT6Z4VuXyn/giphy.gif', // Elmo em chamas
    'https://media.giphy.com/media/5C2aHYut0NBHW/giphy.gif'  // Gato dançando
];

const gifListSim = [
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2JjeDVrbXlrcG1nMnByY29mdGxlbWRobnU0cXRzc3pnNjBsMjdoMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LZfnGqS8d3Bt8WMnLF/giphy.gif",
    'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
];

const listGifBg = [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2I5eTQ4dmQ5a2t6ZHVtZDdxamZka2Nza2czcW9kbmg1YzN2MGVubyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LyeWkfTWOIkn6i7GzX/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExazJ2cWh6aWZrbmp1aGR3Z3g1eTEzdDF0ZmNodjZxdncwczByb2NpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PGSMYXweBYubh8NWoA/giphy.gif"

];

const youtubeVideoUrl = 'https://www.youtube.com/embed/tAGnKpE4NCI?autoplay=1';

export default function PaginaInicial() {
    
    const [posicaoBotaoNao, setPosicaoBotaoNao] = useState(getRandomPosition());
    const [posicaoBotaoSim, setPosicaoBotaoSim] = useState(getRandomPosition());
    const [activeGifSim, setActiveGifSim] = useState(false);
    const [activeGifNao, setActiveGifNao] = useState(null);
    const timerRef = useRef(null);
    const [backgroundGif, setBackgroundGif] = useState(listGifBg[0]);
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const [mostrarBotoes, setMostrarBotoes] = useState(true);


    // 2. useEffect para criar o loop do background.
    useEffect(() => {
        let currentIndex = 0;
        // Inicia um intervalo que vai rodar a cada 2 segundos (2000 ms)
        const intervalId = setInterval(() => {
            // Calcula o próximo índice da lista, voltando ao início se chegar ao fim.
            currentIndex = (currentIndex + 1) % listGifBg.length;
            // Atualiza o estado com a URL do próximo GIF.
            setBackgroundGif(listGifBg[currentIndex]);
        }, 2000);

        // Função de limpeza: Quando o componente for desmontado, o intervalo é cancelado.
        // Isso é MUITO importante para evitar vazamentos de memória.
        return () => clearInterval(intervalId);
    }, []); // O array vazio [] garante que este efeito rode apenas uma vez, quando o componente é montado.


    // --- FUNÇÕES E HANDLERS EXISTENTES ---
    
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    // Limpeza do timer quando o componente for desmontado
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);
    
    // Função para gerar posição aleatória
    function getRandomPosition() {
        return {
            top: Math.random() * (window.innerHeight - BUTTON_HEIGHT),
            left: Math.random() * (window.innerWidth - BUTTON_WIDTH),
        }
    }

    const showRandomGif = (SetGif,listaGif) => {
        clearTimeout(timerRef.current);
        const randomIndex = Math.floor(Math.random() * listaGif.length);
        const randomGifUrl = listaGif[randomIndex];
        SetGif(randomGifUrl);
        timerRef.current = setTimeout(() => {
            SetGif(null);
        }, 2000);
    };

    // --- HANDLERS DE CADA BOTÃO ---

    // Handler do "Não": move o botão e mostra o GIF aleatório temporário
    const handleNaoInteraction = () => {
        showRandomGif(setActiveGifNao,gifListNao);
        setPosicaoBotaoNao(getRandomPosition());
    };
    
    // Handler do "Sim": move o botão e mostra o GIF de comemoração permanente
    const handleSimClick = () => {
        showRandomGif(setActiveGifSim, gifListSim);
        setMostrarVideo(true); // Mostra o vídeo
        setMostrarBotoes(false); // Esconde os botões
        
    };

    useEffect(() => {
        function handleResize() {
            setTamanhoTela({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <div
                style={{
                    position: 'fixed', // Cobre a tela inteira
                    top: 0,
                    left: 0,
                    width: '70vw',
                    height: '90vh',
                    zIndex: -1, // Fica atrás de todo o conteúdo (botões, etc.)
                    backgroundImage: `url(${backgroundGif})`, // URL dinâmica do nosso estado
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 0.5s ease-in-out' // Transição suave (opcional)
                }}
            />
            {/* Botões (sem alteração na estrutura) */}
            <button
                className="fixed bg-red-500 hover:bg-red-700 text-white font-bold rounded flex items-center justify-center"
                style={{ top: `${posicaoBotaoNao.top}px`, left: `${posicaoBotaoNao.left}px`, width: `${BUTTON_WIDTH}px`, height: `${BUTTON_HEIGHT}px` }}
                onTouchStart={handleNaoInteraction}
                onMouseOver={handleNaoInteraction}
            >
                Não
            </button>

            <button
                className="fixed bg-green-500 hover:bg-green-700 text-white font-bold rounded flex items-center justify-center"
                style={{ top: `${posicaoBotaoSim.top}px`, left: `${posicaoBotaoSim.left}px`, width: `${BUTTON_WIDTH}px`, height: `${BUTTON_HEIGHT}px` }}
                onClick={handleSimClick}
            >
                Sim
            </button>
            
            {/* 3. JSX separado para cada GIF */}

            {/* GIF do "Sim" (permanente) */}
            {activeGifSim && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                    <img src={activeGifSim} alt="Comemoração" style={{ maxHeight: '80vh', maxWidth: '80vw' }} />
                </div>
            )}

            {/* GIF do "Não" (temporário e aleatório) */}
            {activeGifNao && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                    <img src={activeGifNao} alt="GIF aleatório" style={{ maxHeight: '80vh', maxWidth: '80vw' }} />
                </div>
            )}
            {mostrarVideo && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20, // zIndex alto para ficar na frente de tudo
                    boxShadow: '0 0 30px rgba(0,0,0,0.5)' // Sombra para destacar
                }}>
                    <iframe 
                        width="560" 
                        height="315" 
                        src={youtubeVideoUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </>
    );
}