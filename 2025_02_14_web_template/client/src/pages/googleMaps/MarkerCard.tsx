import { useEffect } from 'react';
import { motion, useAnimate, usePresence } from 'motion/react';
import cardSplashton from './assets/card_splashton.png';
import star1 from './assets/star1.png';
import star2 from './assets/star2.png';

export const MarkerCard = () => {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (isPresent) {
            const enterAnimation = async () => {
                await animate(scope.current, { opacity: 1 }, { duration: 0.5 });
                await animate('.target-character', { opacity: 1, scale: 1 }, { duration: 0.25, ease: 'easeOut' });
            };
            enterAnimation();
        } else {
            const exitAnimation = async () => {
                await animate(scope.current, { opacity: 0 }, { duration: 1 });
            };
            exitAnimation();
        }
    }, [isPresent, animate, scope, safeToRemove]);

    return (
        <div key="open" ref={scope} className="opacity-0">
            <div className="relative w-44 rounded-xl bg-white">
                {/* Top section - Orange/Red Gradient - 112px */}
                <div className="target-top relative">
                    {/* Gradient background - behind the image */}
                    <div
                        className="absolute bottom-0 left-0 h-full w-full rounded-tl-xl rounded-tr-xl"
                        style={{
                            background: 'linear-gradient(115.51deg, #FF7826 4.21%, #CE372E 98.13%)',
                        }}
                    />
                    <motion.img
                        src={star1}
                        className="absolute top-4 left-2 w-[42px]"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Character Image - Bottom aligned to the gradient section */}
                    <div
                        className="target-character relative flex h-28 w-full origin-bottom items-end opacity-0"
                        style={{ transform: 'scale(0.8)' }}
                    >
                        <img src={cardSplashton} className="!max-w-full" />
                    </div>

                    <motion.img
                        src={star2}
                        className="absolute right-2 bottom-4 w-[50px]"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                {/* Middle section - White - Flexible height */}
                <div className="flex-grow bg-white p-4 text-center">
                    <h1 className="font-black">SPLASHTON</h1>
                    <p className="text-[9px]">ROCK SPRINGS / KELLY PARK</p>
                    <p className="mt-2 text-[10px]">
                        In the sparkling waters of Rock Springs, our new aquatic ambassador awaits.
                    </p>
                </div>

                {/* Bottom section - Blue - 32px */}
                <div className="">
                    <div className="flex h-[32px] w-full items-center justify-center rounded-br-xl rounded-bl-xl bg-[#062E8B]">
                        <p className="text-[11px] font-bold text-white">{`SAY HELLO >`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
