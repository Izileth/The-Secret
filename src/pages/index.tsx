import { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { JSX } from 'react';
import { SplashScreen } from '../components/SplashScreen.js';

interface Particle {
    id: number;
    x: number;
    y: number;
}

interface BackgroundParticle {
    id: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
}

// Gerador pseudo-aleatório determinístico
function seededRandom(seed: number): number {
    const x = (seed * 9301 + 49297) % 233280;
    return x / 233280;
}

// Dados pré-computados para partículas de fundo
const backgroundParticlesData: BackgroundParticle[] = Array.from(
    { length: 50 },
    (_, i): BackgroundParticle => {
        const seed1 = i * 123;
        const seed2 = i * 456;
        const seed3 = i * 789;
        const seed4 = i * 321;

        return {
            id: i,
            left: seededRandom(seed1) * 100,
            top: seededRandom(seed2) * 100,
            delay: seededRandom(seed3) * 3,
            duration: 2 + seededRandom(seed4) * 3
        };
    }
);

function App(): JSX.Element {
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const backgroundParticles = useMemo<BackgroundParticle[]>(
        () => backgroundParticlesData,
        []
    );

    if (loading) {
        return <SplashScreen onFinish={() => setLoading(false)} />;
    }

    const handleReveal = (): void => {
        if (!isRevealed) {
            setIsRevealed(true);

            // Criar partículas de comemoração deterministicamente
            const timestamp = Date.now();
            const newParticles: Particle[] = Array.from(
                { length: 30 },
                (_, i): Particle => ({
                    id: timestamp + i,
                    x: seededRandom(timestamp + i * 111) * 100,
                    y: seededRandom(timestamp + i * 222) * 100
                })
            );
            setParticles(newParticles);

            setTimeout(() => {
                setParticles([]);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-light relative overflow-hidden flex items-center justify-center p-6">
            {/* Partículas flutuantes de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {backgroundParticles.map((particle: BackgroundParticle) => (
                    <div
                        key={particle.id}
                        className="absolute w-px h-px bg-white rounded-full opacity-20 animate-float"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`
                        }}
                    />
                ))}
            </div>

            {/* Partículas de celebração */}
            {particles.map((particle: Particle) => (
                <div
                    key={particle.id}
                    className="absolute pointer-events-none animate-ping"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                >
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
            ))}

            {/* Conteúdo principal */}
            <div className="max-w-4xl w-full">
                {/* Card principal */}
                <div className="flex justify-center mb-12">
                    <div
                        onClick={handleReveal}
                        className={`relative w-full max-w-2xl h-96 cursor-pointer overflow-hidden transition-all duration-700 ${
                            isRevealed
                                ? 'bg-white text-black border-2 border-white shadow-2xl shadow-white/20'
                                : 'bg-black border-2 border-white/30 hover:border-white/60'
                        }`}
                    >
                        {/* Estado inicial */}
                        {!isRevealed && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <div className="w-20 h-20 border-2 border-white rounded-full mb-6 flex items-center justify-center">
                                    <div className="w-10 h-10 border-t-2 border-white rounded-full animate-spin" />
                                </div>
                                <h2 className="text-3xl tracking-wide text-white/90 mb-3 font-extralight">
                                    Clique para começar
                                </h2>
                                <p className="text-gray-400 text-sm tracking-wider uppercase">
                                    Uma experiência minimalista
                                </p>
                            </div>
                        )}

                        {/* Conteúdo revelado */}
                        <div
                            className={`absolute inset-0 flex flex-col items-center justify-center px-12 transition-all duration-1000 ${
                                isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            <div className="text-center space-y-8">
                                <div className="w-16 h-px bg-black/20 mx-auto" />
                                
                                <h1 className="text-4xl tracking-[0.2em] text-black font-extralight uppercase">
                                    Simplicidade
                                </h1>
                                
                                <p className="text-black/60 text-sm tracking-[0.3em] uppercase">
                                    É a sofisticação máxima
                                </p>
                                
                                <div className="w-16 h-px bg-black/20 mx-auto" />
                            </div>
                        </div>

                        {/* Bordas decorativas quando revelado */}
                        {isRevealed && (
                            <>
                                <div className="absolute top-8 left-8 right-8 h-px bg-black/10" />
                                <div className="absolute bottom-8 left-8 right-8 h-px bg-black/10" />
                                <div className="absolute left-8 top-8 bottom-8 w-px bg-black/10" />
                                <div className="absolute right-8 top-8 bottom-8 w-px bg-black/10" />
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-gray-500 text-xs tracking-[0.3em] uppercase">
                    Design minimalista — Teste de conceito
                </footer>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                .animate-float {
                    animation: float linear infinite;
                }
            `}</style>
        </div>
    );
}

export default App;