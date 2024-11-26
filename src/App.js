import React, { useState, useEffect } from 'react';
import './App.css'; // Importa el archivo CSS

const JuegoContador = () => {
  // Estados del juego
  const [maxScore, setMaxScore] = useState(0); // Puntaje máximo
  const [currentScore, setCurrentScore] = useState(0); // Puntaje actual
  const [isGameActive, setIsGameActive] = useState(false); // Estado de si el juego está activo
  const [countdown, setCountdown] = useState(null); // Cuenta regresiva
  const [gameTimeLeft, setGameTimeLeft] = useState(0); // Tiempo restante para hacer clic

  // Inicia el juego
  const startGame = () => {
    setIsGameActive(false);
    setCurrentScore(0);
    setCountdown(3);
  };

  // Lógica de la cuenta regresiva
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setIsGameActive(true);
      setGameTimeLeft(5);
    }
  }, [countdown]);

  // Lógica para decrementar el tiempo del juego
  useEffect(() => {
    if (!isGameActive || gameTimeLeft <= 0) return;

    const timer = setTimeout(() => setGameTimeLeft(gameTimeLeft - 1), 1000);
    if (gameTimeLeft === 1) {
      setIsGameActive(false);
      if (currentScore > maxScore) setMaxScore(currentScore);
    }
    return () => clearTimeout(timer);
  }, [gameTimeLeft, isGameActive]);

  // Maneja el clic del jugador
  const handleClick = () => {
    if (isGameActive) {
      setCurrentScore(currentScore + 1);
    }
  };

  return (
    <div className="container">
      <h1>Juego Contador</h1>
      <h2>Puntaje máximo: {maxScore}</h2>

      {/* Botón para iniciar el juego */}
      <button
        onClick={startGame}
        disabled={countdown !== null || isGameActive}
        className="start-game"
      >
        Iniciar juego
      </button>

      {/* Mostrar los mensajes de la cuenta regresiva */}
      {countdown !== null && (
        <h2 className={`status ${countdown === 3 ? 'ready' : countdown === 2 ? 'set' : 'go'}`}>
          {countdown === 3 ? '¡Preparados!' : countdown === 2 ? '¡Listos!' : '¡Ya!'}
        </h2>
      )}

      {/* Mostrar el puntaje actual y el tiempo restante en juego */}
      {isGameActive && (
        <>
          <h3>Tiempo restante: {gameTimeLeft} segundos</h3>
          <h3>Puntaje actual: {currentScore}</h3>
        </>
      )}

      {/* Área de clic */}
      <button
        onClick={handleClick}
        disabled={!isGameActive}
        className="clicker-area"
      >
        ¡Click!
      </button>
    </div>
  );
};

export default JuegoContador;
