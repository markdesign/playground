import React, { useRef } from 'react';
import { motion, useAnimate } from 'motion/react';

// === BASIC ANIMATION ===
function BasicAnimationExample() {
    const [scope, animate] = useAnimate();

    const handleAnimate = () => {
        // animate('div', { opacity: 1, x: 100 }, { duration: 1 });
        animate([
            ['.first-item', { opacity: 1, x: 200 }, { duration: 1, at: 0 }],
            ['.second-item', { opacity: 1, x: 200 }, { duration: 1, at: 1 }],
            ['.third-item', { opacity: 1, x: 200 }, { duration: 1, at: '-0.5' }],
        ]);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Animation</h2>

            <button onClick={handleAnimate} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Animate
            </button>

            <div ref={scope} className="rounded bg-gray-100">
                <div className="first-item h-20 w-20 rounded bg-blue-500 opacity-50" />
                <div className="second-item h-20 w-20 rounded bg-red-500 opacity-50" />
                <div className="third-item h-20 w-20 rounded bg-green-500 opacity-50" />
            </div>

            <p className="mt-2 text-sm text-gray-600">Basic animation with target, keyframes, and options</p>
        </div>
    );
}

// === TARGETING ELEMENTS ===
function TargetingElementsExample() {
    const [scope, animate] = useAnimate();

    const animateById = () => {
        animate('#box1', { x: 100 }, { duration: 0.5 });
    };

    const animateByClass = () => {
        animate('.box', { y: 50 }, { duration: 0.5 });
    };

    const animateByCombination = () => {
        animate('.box#box2', { scale: 1.5 }, { duration: 0.5 });
    };

    const resetAll = () => {
        animate('.box', { x: 0, y: 0, scale: 1 }, { duration: 0.3 });
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Targeting Elements</h2>

            <div className="mb-4 flex gap-2">
                <button onClick={animateById} className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
                    Target #box1
                </button>

                <button onClick={animateByClass} className="rounded bg-green-500 px-3 py-1 text-sm text-white">
                    Target .box
                </button>

                <button onClick={animateByCombination} className="rounded bg-purple-500 px-3 py-1 text-sm text-white">
                    Target .box#box2
                </button>

                <button onClick={resetAll} className="rounded bg-gray-500 px-3 py-1 text-sm text-white">
                    Reset
                </button>
            </div>

            <div ref={scope} className="relative h-40 rounded bg-gray-100 p-4">
                <div id="box1" className="box absolute top-4 left-4 h-16 w-16 rounded bg-blue-500" />
                <div id="box2" className="box absolute top-16 left-16 h-16 w-16 rounded bg-green-500" />
                <div id="box3" className="box absolute top-4 left-28 h-16 w-16 rounded bg-purple-500" />
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Target elements with CSS selectors (ID, class, or combinations)
            </p>
        </div>
    );
}

// === SEQUENCING ANIMATIONS ===
function SequencingAnimationsExample() {
    const [scope, animate] = useAnimate();

    const runSequence = async () => {
        // Reset
        animate('.box', { x: 0, scale: 1, opacity: 1 }, { duration: 0 });

        // Run sequence
        await animate('.box.one', { x: 100 }, { duration: 0.5 });
        await animate('.box.two', { scale: 1.5 }, { duration: 0.5 });
        await animate('.box.three', { opacity: 0.3 }, { duration: 0.5 });
        await animate('.box', { x: 0, scale: 1, opacity: 1 }, { duration: 0.5 });
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Sequencing Animations</h2>

            <button onClick={runSequence} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Run Sequence
            </button>

            <div ref={scope} className="flex h-40 items-center justify-center gap-4 rounded bg-gray-100 p-4">
                <div className="box one h-16 w-16 rounded bg-red-500" />
                <div className="box two h-16 w-16 rounded bg-amber-500" />
                <div className="box three h-16 w-16 rounded bg-emerald-500" />
            </div>

            <p className="mt-2 text-sm text-gray-600">Chain animations in sequence with await</p>
        </div>
    );
}

// === PARALLEL ANIMATIONS ===
function ParallelAnimationsExample() {
    const [scope, animate] = useAnimate();

    const runParallel = async () => {
        // Reset
        animate('div div', { x: 0, y: 0, opacity: 1 }, { duration: 0 });

        // Animate in parallel
        animate('.box-1', { x: 100 }, { duration: 0.8 });
        animate('.box-2', { y: 50 }, { duration: 0.5 });
        animate('.box-3', { opacity: 0.3 }, { duration: 1.2 });

        // After all animations
        await animate('.box-4', { scale: 1.2 }, { duration: 0.7 });
        animate('div div', { x: 0, y: 0, opacity: 1, scale: 1 }, { duration: 0.5 });
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Parallel Animations</h2>

            <button onClick={runParallel} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Run Parallel
            </button>

            <div ref={scope} className="grid h-40 grid-cols-2 gap-4 rounded bg-gray-100 p-4">
                <div className="box-1 h-16 w-16 rounded bg-blue-500" />
                <div className="box-2 h-16 w-16 rounded bg-green-500" />
                <div className="box-3 h-16 w-16 rounded bg-purple-500" />
                <div className="box-4 h-16 w-16 rounded bg-pink-500" />
            </div>

            <p className="mt-2 text-sm text-gray-600">Run multiple animations at the same time</p>
        </div>
    );
}

// === STAGGERED ANIMATIONS ===
function StaggeredAnimationsExample() {
    const [scope, animate] = useAnimate();

    const runStaggered = async () => {
        // Reset
        animate('.item', { y: 0, opacity: 1 }, { duration: 0 });

        // Fade out with stagger
        await animate('.item', { y: 20, opacity: 0 }, { duration: 0.3, delay: stagger(0.1) });

        // Fade in with stagger
        animate('.item', { y: 0, opacity: 1 }, { duration: 0.3, delay: stagger(0.1, { from: 'last' }) });
    };

    // Stagger helper function (simplified version for the example)
    const stagger = (delay: number, options: { from?: 'first' | 'last' | 'center' } = {}) => {
        const { from = 'first' } = options;
        return (i: number, total: number) => {
            if (from === 'first') return i * delay;
            if (from === 'last') return (total - 1 - i) * delay;
            if (from === 'center') {
                const center = Math.floor(total / 2);
                return Math.abs(i - center) * delay;
            }
            return 0;
        };
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Staggered Animations</h2>

            <button onClick={runStaggered} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Run Staggered
            </button>

            <div ref={scope} className="space-y-2 rounded bg-gray-100 p-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="item h-8 rounded bg-indigo-500" />
                ))}
            </div>

            <p className="mt-2 text-sm text-gray-600">Create staggered animations with custom delays</p>
        </div>
    );
}

// === ANIMATION CONTROLS ===
function AnimationControlsExample() {
    const [scope, animate] = useAnimate();
    const animationRef = useRef<{ stop: () => void } | null>(null);

    const startAnimation = () => {
        const animation = animate(
            '.control-box',
            {
                rotate: [0, 180, 360],
                backgroundColor: ['#3b82f6', '#8b5cf6', '#ef4444'],
            },
            {
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
            },
        );
        animationRef.current = animation;
    };

    const stopAnimation = () => {
        if (animationRef.current) {
            animationRef.current.stop();
            animationRef.current = null;
        }
    };

    const resetAnimation = () => {
        stopAnimation();
        animate('.control-box', { rotate: 0, backgroundColor: '#3b82f6' }, { duration: 0.3 });
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animation Controls</h2>

            <div className="mb-4 flex gap-2">
                <button onClick={startAnimation} className="rounded bg-green-500 px-3 py-1 text-sm text-white">
                    Start
                </button>

                <button onClick={stopAnimation} className="rounded bg-red-500 px-3 py-1 text-sm text-white">
                    Stop
                </button>

                <button onClick={resetAnimation} className="rounded bg-gray-500 px-3 py-1 text-sm text-white">
                    Reset
                </button>
            </div>

            <div ref={scope} className="flex h-40 items-center justify-center rounded bg-gray-100">
                <div className="control-box h-24 w-24 rounded bg-blue-500" />
            </div>

            <p className="mt-2 text-sm text-gray-600">Control animations with start, stop, and reset</p>
        </div>
    );
}

export default AnimationControlsExample;

// === ANIMATION VARIANTS ===
function AnimationVariantsExample() {
    const [scope, animate] = useAnimate();

    const showSuccess = () => {
        animate('div', { backgroundColor: '#10b981' }, { duration: 0.3 });
        animate('.circle', { pathLength: 1 }, { duration: 0.5 });
    };

    const showError = () => {
        animate('div', { backgroundColor: '#ef4444' }, { duration: 0.3 });
        animate('.cross-1', { pathLength: 1 }, { duration: 0.3 });
        animate('.cross-2', { pathLength: 1 }, { duration: 0.3, delay: 0.15 });
    };

    const reset = () => {
        animate('div', { backgroundColor: '#f3f4f6' }, { duration: 0.3 });
        animate('path', { pathLength: 0 }, { duration: 0.3 });
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animation Variants</h2>

            <div className="mb-4 flex gap-2">
                <button onClick={showSuccess} className="rounded bg-green-500 px-3 py-1 text-sm text-white">
                    Success
                </button>

                <button onClick={showError} className="rounded bg-red-500 px-3 py-1 text-sm text-white">
                    Error
                </button>

                <button onClick={reset} className="rounded bg-gray-500 px-3 py-1 text-sm text-white">
                    Reset
                </button>
            </div>

            <div ref={scope} className="flex h-40 items-center justify-center rounded bg-gray-100">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                    <svg viewBox="0 0 32 32" width="32" height="32">
                        <path
                            className="circle"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            d="M16,4 C22.6274,4 28,9.37258 28,16 C28,22.6274 22.6274,28 16,28 C9.37258,28 4,22.6274 4,16 C4,9.37258 9.37258,4 16,4 Z"
                            pathLength="0"
                        />
                        <path
                            className="circle"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            d="M10,16 L14,20 L22,12"
                            pathLength="0"
                        />
                        <path
                            className="cross-1"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            d="M10,10 L22,22"
                            pathLength="0"
                        />
                        <path
                            className="cross-2"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            d="M22,10 L10,22"
                            pathLength="0"
                        />
                    </svg>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Create predefined animation sequences for different states</p>
        </div>
    );
}

// === ANIMATION SCOPES ===
function AnimationScopesExample() {
    const [scope1, animate1] = useAnimate();
    const [scope2, animate2] = useAnimate();

    const animateScope1 = () => {
        animate1('.box', { x: 100 }, { duration: 0.5 });
    };

    const animateScope2 = () => {
        animate2('.box', { y: 50 }, { duration: 0.5 });
    };

    const animateBoth = () => {
        animate1('.box', { rotate: 180 }, { duration: 0.5 });
        animate2('.box', { scale: 1.2 }, { duration: 0.5 });
    };

    const reset = () => {
        animate1('.box', { x: 0, rotate: 0 }, { duration: 0.3 });
        animate2('.box', { y: 0, scale: 1 }, { duration: 0.3 });
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animation Scopes</h2>

            <div className="mb-4 flex gap-2">
                <button onClick={animateScope1} className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
                    Scope 1
                </button>

                <button onClick={animateScope2} className="rounded bg-green-500 px-3 py-1 text-sm text-white">
                    Scope 2
                </button>

                <button onClick={animateBoth} className="rounded bg-purple-500 px-3 py-1 text-sm text-white">
                    Both Scopes
                </button>

                <button onClick={reset} className="rounded bg-gray-500 px-3 py-1 text-sm text-white">
                    Reset
                </button>
            </div>

            <div className="flex gap-4">
                <div ref={scope1} className="flex h-40 w-1/2 items-center justify-center rounded bg-blue-100 p-4">
                    <div className="box h-20 w-20 rounded bg-blue-500" />
                    <p className="absolute bottom-2 text-xs text-blue-700">Scope 1</p>
                </div>

                <div ref={scope2} className="flex h-40 w-1/2 items-center justify-center rounded bg-green-100 p-4">
                    <div className="box h-20 w-20 rounded bg-green-500" />
                    <p className="absolute bottom-2 text-xs text-green-700">Scope 2</p>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Create isolated animation scopes with separate targets</p>
        </div>
    );
}

// === KEYFRAMES ANIMATION ===
function KeyframesAnimationExample() {
    const [scope, animate] = useAnimate();

    const runKeyframes = async () => {
        // Reset
        animate('.keyframe-box', { x: 0, y: 0, rotate: 0, backgroundColor: '#3b82f6' }, { duration: 0 });

        // Run keyframe animation
        await animate(
            scope.current.querySelector('.keyframe-box'),
            [
                { x: 100, backgroundColor: '#8b5cf6' },
                { y: 50, backgroundColor: '#ec4899' },
                { rotate: 180, backgroundColor: '#f59e0b' },
                { x: 0, y: 0, rotate: 360, backgroundColor: '#10b981' },
                { rotate: 0, backgroundColor: '#3b82f6' },
            ],
            {
                duration: 2,
                ease: 'easeInOut',
            },
        );
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Keyframes Animation</h2>

            <button onClick={runKeyframes} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Run Keyframes
            </button>

            <div ref={scope} className="relative h-60 rounded bg-gray-100">
                <div className="keyframe-box absolute top-4 left-4 h-20 w-20 rounded bg-blue-500" />
            </div>

            <p className="mt-2 text-sm text-gray-600">Create complex animations with multiple keyframes</p>
        </div>
    );
}

const UseAnimateExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicAnimationExample />
            <TargetingElementsExample />
            <SequencingAnimationsExample />
            <ParallelAnimationsExample />
            <StaggeredAnimationsExample />
            <AnimationControlsExample />
            <AnimationVariantsExample />
            <AnimationScopesExample />
            <KeyframesAnimationExample />
        </div>
    );
};

export { UseAnimateExamples };
