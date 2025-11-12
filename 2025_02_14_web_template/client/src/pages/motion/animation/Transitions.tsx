import React, { useState } from 'react';
import { motion } from 'motion/react';
import { delay } from 'motion';

// === BASIC TRANSITION ===
function BasicTransition() {
    const [position, setPosition] = useState(false);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Transition</h2>
            <button className="mb-2 rounded bg-neutral-500 px-3 py-1 text-white" onClick={() => setPosition(!position)}>
                Toggle position
            </button>
            <motion.div
                className="h-30 w-30 bg-blue-400 p-4"
                animate={{ x: position ? 100 : 0 }}
                transition={{ duration: 2 }}
            >
                Basic transition (0.5s)
            </motion.div>
        </div>
    );
}

// === EASING PRESETS ===
function EasingPresets() {
    const [position, setPosition] = useState(false);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Easing Presets</h2>
            <div className="space-y-4">
                <button
                    className="mb-2 rounded bg-purple-500 px-3 py-1 text-white"
                    onClick={() => setPosition(!position)}
                >
                    Toggle All Easings
                </button>
                <motion.div
                    className="h-30 w-30 bg-purple-400 p-4"
                    animate={{ x: position ? 200 : 0 }}
                    transition={{ ease: 'linear', duration: 1 }}
                >
                    Linear easing
                </motion.div>
                <motion.div
                    className="h-30 w-30 bg-purple-300 p-4"
                    animate={{ x: position ? 200 : 0 }}
                    transition={{ ease: 'easeIn', duration: 1 }}
                >
                    Ease in
                </motion.div>
                <motion.div
                    className="h-30 w-30 bg-purple-200 p-4"
                    animate={{ x: position ? 200 : 0 }}
                    transition={{ ease: 'easeOut', duration: 1 }}
                >
                    Ease out
                </motion.div>
                <motion.div
                    className="h-30 w-30 bg-purple-100 p-4"
                    animate={{ x: position ? 200 : 0 }}
                    transition={{ ease: 'easeInOut', duration: 1 }}
                >
                    Ease in out
                </motion.div>
            </div>
        </div>
    );
}

// === CUBIC BEZIER ===
function CubicBezier() {
    const [position, setPosition] = useState(false);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Cubic Bezier</h2>
            <button className="mb-2 rounded bg-green-500 px-3 py-1 text-white" onClick={() => setPosition(!position)}>
                Toggle Animation
            </button>
            <motion.div
                className="h-30 w-30 bg-green-400 p-4"
                animate={{ x: position ? 200 : 0 }}
                transition={{ ease: [0.22, 0.68, 0.36, 1.05], duration: 1 }}
            >
                Cubic bezier [0.22, 0.68, 0.36, 1.05]
            </motion.div>
        </div>
    );
}

// === SPRING PHYSICS TRANSITION ===
function SpringTransition() {
    const [isAnimating, setIsAnimating] = useState(false);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Spring Physics</h2>
            <div className="space-y-4">
                <button
                    className="mb-2 rounded bg-yellow-500 px-3 py-1 text-white"
                    onClick={() => setIsAnimating(!isAnimating)}
                >
                    Toggle Spring
                </button>
                <motion.div
                    className="h-30 w-30 bg-yellow-400 p-4"
                    animate={{
                        x: isAnimating ? 100 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 10,
                    }}
                >
                    Spring (stiffness: 100, damping: 10)
                </motion.div>
                <motion.div
                    className="h-30 w-30 bg-yellow-300 p-4"
                    animate={{
                        x: isAnimating ? 100 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 5,
                    }}
                >
                    Bouncy spring (stiffness: 400, damping: 5)
                </motion.div>
                <motion.div
                    className="h-30 w-30 bg-yellow-200 p-4"
                    animate={{
                        x: isAnimating ? 100 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        bounce: 0.6,
                    }}
                >
                    Bounce: 0.6 spring
                </motion.div>
            </div>
        </div>
    );
}

// === INERTIA TRANSITION ===
function InertiaTransition() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Inertia</h2>
            <motion.div
                className="h-30 w-30 bg-orange-400 p-4"
                drag
                transition={{
                    type: 'inertia',
                    velocity: 50,
                    power: 0.3,
                    timeConstant: 400,
                }}
            >
                Inertia transition (drag me)
            </motion.div>
        </div>
    );
}

// === CATEGORY-SPECIFIC TRANSITIONS ===
function CategorySpecificTransitions() {
    const [isAnimating, setIsAnimating] = useState(false);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Category-Specific Transitions</h2>
            <button
                className="mb-2 rounded bg-red-500 px-3 py-1 text-white"
                onClick={() => setIsAnimating(!isAnimating)}
            >
                Toggle Animation
            </button>
            <motion.div
                className="h-30 w-30 bg-red-400 p-4"
                animate={{
                    x: isAnimating ? 200 : 0,
                    backgroundColor: isAnimating ? '#60a5fa' : '#f87171',
                    scale: isAnimating ? 1.2 : 1,
                    transition: { duration: 1, delay: 1 },
                }}
            >
                Category-specific transitions
            </motion.div>
        </div>
    );
}

// === PROPERTY-SPECIFIC TRANSITIONS ===
function PropertySpecificTransitions() {
    const [isAnimating, setIsAnimating] = useState(false);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Property-Specific Transitions</h2>
            <button
                className="mb-2 rounded bg-red-500 px-3 py-1 text-white"
                onClick={() => setIsAnimating(!isAnimating)}
            >
                Toggle Animation
            </button>
            <motion.div
                className="h-30 w-30 bg-red-400 p-4"
                animate={{
                    x: isAnimating ? 200 : 0,
                    backgroundColor: isAnimating ? '#60a5fa' : '#f87171',
                    scale: isAnimating ? 1.2 : 1,
                }}
                transition={{
                    x: { type: 'spring', stiffness: 300, delay: 2 },
                    backgroundColor: { duration: 1 },
                    scale: { duration: 5, delay: 0.2 },
                }}
            >
                Property-specific transitions
            </motion.div>
        </div>
    );
}

// === DEFAULT TRANSITIONS ===
function DefaultTransitions() {
    const [state, setState] = useState(false);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Default Transitions</h2>
            <button className="mb-2 rounded bg-indigo-500 px-3 py-1 text-white" onClick={() => setState(!state)}>
                Toggle Animation
            </button>

            <motion.div
                className="h-30 w-30 bg-indigo-400 p-4"
                animate={{
                    x: state ? 200 : 0,
                    opacity: state ? 0.5 : 1,
                    rotate: state ? 45 : 0,
                }}
                transition={{
                    default: {
                        duration: 0.8,
                        ease: 'easeInOut',
                    },
                }}
            >
                Default transitions for all properties
            </motion.div>
        </div>
    );
}

// === ORCHESTRATION ===
function Orchestration() {
    const [state, setState] = useState(false);

    const containerVariant = {
        open: {
            x: 200,
            opacity: 0.5,
            transition: {
                delayChildren: 1,
                staggerChildren: 2,
            },
        },
        closed: {
            x: 0,
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Orchestration (Delay, Stagger)</h2>
            <div className="space-y-4">
                <button
                    className="mb-2 cursor-pointer rounded bg-pink-500 px-3 py-1 text-white"
                    onClick={() => setState(!state)}
                >
                    Toggle Animation
                </button>

                <motion.div
                    className="h-30 w-30 bg-pink-400 p-4"
                    animate={{ x: state ? 200 : 0, opacity: state ? 0.5 : 1 }}
                    transition={{ delay: 1 }}
                >
                    Delay: 1s
                </motion.div>

                <motion.div
                    className="h-30 w-30 bg-pink-300 p-4"
                    variants={containerVariant}
                    animate={state ? 'open' : 'closed'}
                >
                    <motion.div
                        className="mb-2 h-4 w-full bg-white"
                        variants={{
                            open: { width: '50%' },
                            closed: { width: '100%' },
                        }}
                    />
                    <motion.div
                        className="mb-2 h-4 w-full bg-white"
                        variants={{
                            open: { width: '70%' },
                            closed: { width: '100%' },
                        }}
                    />
                    <motion.div
                        className="h-4 w-full bg-white"
                        variants={{
                            open: { width: '30%' },
                            closed: { width: '100%' },
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}

// === REPEATING ANIMATIONS ===
function RepeatingAnimations() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Repeating Animations</h2>

            <div className="space-y-4">
                <motion.div
                    className="h-30 w-30 bg-teal-400 p-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    Infinite repeat
                </motion.div>

                <motion.div
                    className="h-30 w-30 bg-teal-300 p-4"
                    animate={{ x: [0, 100, 0] }}
                    transition={{ repeat: 3, duration: 2 }}
                >
                    Repeat 3 times
                </motion.div>

                <motion.div
                    className="h-30 w-30 bg-teal-200 p-4"
                    animate={{ rotate: [0, 180, 0] }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                >
                    Repeat reverse
                </motion.div>

                <motion.div
                    className="h-30 w-30 bg-teal-100 p-4"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
                >
                    Repeat with delay
                </motion.div>
            </div>
        </div>
    );
}

// === TRANSITION END ===
function TransitionEnd() {
    const [message, setMessage] = useState('');
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Transition End</h2>
            <div>
                <motion.div
                    className="h-30 w-30 cursor-pointer bg-cyan-400 p-4"
                    whileHover={{ scale: 1.2 }}
                    onAnimationComplete={() => {
                        setMessage('Animation completed!');
                        setTimeout(() => setMessage(''), 2000);
                    }}
                >
                    Hover me
                </motion.div>
                <div className="mt-2 font-semibold text-cyan-600">{message}</div>
            </div>
        </div>
    );
}

// === KEYFRAMES TIMING ===
function KeyframesTiming() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Keyframes Timing</h2>

            <motion.div
                className="h-30 w-30 bg-emerald-400 p-4"
                animate={{
                    x: [0, 100, 50, 100, 0],
                    backgroundColor: ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#10b981'],
                }}
                transition={{
                    x: {
                        duration: 4,
                        times: [0, 0.1, 0.2, 0.3, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    },
                    backgroundColor: {
                        duration: 1,
                        times: [0, 0.1, 0.2, 0.3, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    },
                }}
            >
                Keyframes with custom timing
            </motion.div>
        </div>
    );
}

// Main component that exports all examples
const Transitions = () => {
    return (
        <div className="space-y-12 p-6">
            <BasicTransition />
            <EasingPresets />
            <CubicBezier />
            <SpringTransition />
            <InertiaTransition />
            <CategorySpecificTransitions />
            <PropertySpecificTransitions />
            <DefaultTransitions />
            <Orchestration />
            <RepeatingAnimations />
            <TransitionEnd />
            <KeyframesTiming />
        </div>
    );
};

export { Transitions };
