import { useState, useMemo } from 'react';
import { Sparkles, Lock, Unlock } from 'lucide-react';
import { JSX } from 'react';
// import SplashScreen from '../components/SplashScreen';
interface Particle {
    id: number;
    x: number;
    y: number;
}

interface Secret {
    symbol: string;
    hint: string;
    content: string;
}


const backgroundParticlesData = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3
}));


function App(): JSX.Element {
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [particles, setParticles] = useState<Particle[]>([]);
   // const [loading, setLoading] = useState(true);


    const backgroundParticles = useMemo(() => backgroundParticlesData, []);
    // Personalize aqui com sua mensagem!
    const secret: Secret = {
        symbol: '💖',
        hint: 'Uma Mensagem Especial',
        content: 'Desde o momento que te conheci, minha vida ganhou um novo significado. Você é a razão do meu sorriso, a luz dos meus dias, e a pessoa que me faz querer ser melhor a cada dia. Te amo mais do que as palavras podem expressar.'
    };

    //  if (loading) {
      //  return <SplashScreen onFinish={() => setLoading(false)} />;
    //  }
    const handleReveal = (): void => {
        if (!isRevealed) {
            setIsRevealed(true);

            // Criar partículas de comemoração
            const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
                id: Date.now() + i,
                x: Math.random() * 100,
                y: Math.random() * 100
            }));
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
                {backgroundParticles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-px h-px bg-white rounded-full opacity-20"
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
            {particles.map(particle => (
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
                {/* Carta principal */}
                <div className="flex justify-center mb-12">
                    <div
                        onClick={handleReveal}
                        className={`relative w-full max-w-2xl h-96 rounded-none cursor-pointer overflow-hidden transition-all duration-700 ${isRevealed
                            ? 'bg-white text-black border-2 border-white shadow-2xl shadow-white/20'
                            : 'bg-black border-2 border-white/30 hover:border-white/60'
                            }`}
                    >
                        {/* Símbolo de fundo */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-5 scale-150' : 'opacity-20 scale-100'
                            }`}>
                            <span className="text-[12rem] grayscale">
                                {isRevealed ? secret.symbol : '💌'}
                            </span>
                        </div>

                        {/* Estado bloqueado */}
                        {!isRevealed && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <Lock className="w-20 h-20 text-white mb-6" />
                                <h2 className="text-3xl tracking-wide text-white/90 mb-3 font-extralight">
                                    {secret.hint}
                                </h2>
                                <p className="text-gray-400 text-sm tracking-wider uppercase">
                                    Clique para revelar
                                </p>
                            </div>
                        )}

                        {/* Conteúdo revelado */}
                        <div className={`absolute max-w-2xl inset-0 flex flex-col items-center justify-center px-12 transition-all duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}>
                            <Unlock className="w-12 h-12 text-black mb-6" />
                            <h2 className="text-2xl tracking-wide text-black mb-6 font-light">
                                {secret.hint}
                            </h2>
                            <p className="text-center text-black leading-relaxed text-lg max-w-xl font-light">
                                {secret.content}
                            </p>
                        </div>

                        {/* Linhas decorativas */}
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
                <footer className="mt-12 text-center text-gray-500 text-xs tracking-[0.3em]">
                    FEITO COM AMOR PARA VOCÊ
                </footer>
            </div>

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
        </div>
    );
}

export default App;