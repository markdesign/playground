import { useEffect } from 'react';
import { useAnimate, usePresence } from 'motion/react';
import figureSplashton from './assets/figure_splashton.png';

export const MarkerCharacter = () => {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (isPresent) {
            const enterAnimation = async () => {
                await animate(scope.current, { opacity: 1 }, { duration: 1 });
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
        <div key="closed" ref={scope} className="opacity-0">
            <div className="rounded-md bg-white px-2 py-1">
                <p className="font-base font-bold">Splashton</p>
            </div>
            <img src={figureSplashton} alt="Marker" className="absolute bottom-5 w-[90px] !max-w-full" />
        </div>
    );
};
