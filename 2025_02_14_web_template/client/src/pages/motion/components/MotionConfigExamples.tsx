import React, { useState } from 'react';
import { motion, MotionConfig, AnimatePresence } from 'motion/react';

// === BASIC MOTION CONFIG ===
function BasicMotionConfigExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic MotionConfig</h2>

            <MotionConfig
                transition={{
                    duration: 1,
                    ease: 'easeInOut',
                }}
            >
                <div className="flex gap-4">
                    <motion.div
                        className="h-20 w-20 rounded bg-blue-500"
                        animate={{ x: 100 }}
                        // No transition specified, uses MotionConfig default
                    >
                        <p className="p-1 text-xs text-white">1 second</p>
                    </motion.div>

                    <motion.div
                        className="h-20 w-20 rounded bg-green-500"
                        animate={{ rotate: 180 }}
                        // No transition specified, uses MotionConfig default
                    >
                        <p className="p-1 text-xs text-white">1 second</p>
                    </motion.div>
                </div>
            </MotionConfig>
        </div>
    );
}

// === TRANSITION OVERRIDE ===
function TransitionOverrideExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Transition Override</h2>

            <MotionConfig
                transition={{
                    duration: 2,
                    ease: 'linear',
                }}
            >
                <div className="flex gap-4">
                    <motion.div
                        className="h-20 w-20 rounded bg-purple-500"
                        animate={{ x: 100 }}
                        // Uses MotionConfig default (2 seconds, linear)
                    >
                        <p className="p-1 text-xs text-white">2 sec linear</p>
                    </motion.div>

                    <motion.div
                        className="h-20 w-20 rounded bg-pink-500"
                        animate={{ x: 100 }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeOut',
                        }}
                        // Overrides the MotionConfig
                    >
                        <p className="p-1 text-xs text-white">0.5 sec easeOut</p>
                    </motion.div>
                </div>
            </MotionConfig>
        </div>
    );
}

// === REDUCED MOTION ===
function ReducedMotionExample() {
    const [reduceMotion, setReduceMotion] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Reduced Motion</h2>

            <button onClick={() => setReduceMotion(!reduceMotion)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {reduceMotion ? 'Enable Motion' : 'Reduce Motion'}
            </button>

            <MotionConfig reducedMotion={reduceMotion ? 'user' : 'never'}>
                <div className="flex gap-4">
                    <motion.div
                        className="h-20 w-20 rounded bg-orange-500"
                        animate={{
                            x: 100,
                            rotate: 180,
                        }}
                        transition={{ duration: 1 }}
                    >
                        <p className="p-1 text-xs text-white">{reduceMotion ? 'Reduced' : 'Normal'}</p>
                    </motion.div>

                    <motion.div
                        className="h-20 w-20 rounded bg-cyan-500"
                        animate={{
                            scale: 1.5,
                        }}
                        transition={{ duration: 1 }}
                    >
                        <p className="p-1 text-xs text-white">{reduceMotion ? 'Reduced' : 'Normal'}</p>
                    </motion.div>
                </div>
            </MotionConfig>

            <p className="mt-2 text-sm text-gray-600">
                When reduced motion is active, animations are disabled or simplified.
            </p>
        </div>
    );
}

// === NESTED MOTION CONFIG ===
function NestedMotionConfigExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Nested MotionConfig</h2>

            <MotionConfig
                transition={{
                    duration: 2,
                    ease: 'easeInOut',
                }}
            >
                <div className="space-y-4">
                    <div>
                        <h3 className="mb-1 text-sm font-semibold">Outer MotionConfig (2s)</h3>
                        <motion.div
                            className="h-16 w-16 rounded bg-indigo-500"
                            animate={{ x: 100 }}
                            // Uses outer MotionConfig
                        />
                    </div>

                    <div>
                        <h3 className="mb-1 text-sm font-semibold">Inner MotionConfig (0.5s)</h3>
                        <MotionConfig
                            transition={{
                                duration: 0.5,
                                ease: 'backOut',
                            }}
                        >
                            <motion.div
                                className="h-16 w-16 rounded bg-emerald-500"
                                animate={{ x: 100 }}
                                // Uses inner MotionConfig
                            />
                        </MotionConfig>
                    </div>
                </div>
            </MotionConfig>
        </div>
    );
}

// === MOTION CONFIG WITH VARIANTS ===
function MotionConfigVariantsExample() {
    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">MotionConfig with Variants</h2>

            <button onClick={() => setIsOpen(!isOpen)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isOpen ? 'Hide' : 'Show'}
            </button>

            <MotionConfig
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                }}
            >
                <motion.div
                    initial="hidden"
                    animate={isOpen ? 'visible' : 'hidden'}
                    variants={variants}
                    className="overflow-hidden rounded bg-amber-100"
                >
                    <div className="p-4">
                        <h3 className="mb-2 font-bold">Spring Physics Applied</h3>
                        <p>All animations within this component use the spring configuration from MotionConfig.</p>
                        <p className="mt-2">
                            This makes it easy to maintain consistent animation physics across your UI.
                        </p>
                    </div>
                </motion.div>
            </MotionConfig>
        </div>
    );
}

// === MOTION CONFIG WITH ANIMATE PRESENCE ===
function MotionConfigWithPresenceExample() {
    const [activeCard, setActiveCard] = useState('a');

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">MotionConfig with AnimatePresence</h2>

            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setActiveCard('a')}
                    className={`rounded px-4 py-2 ${activeCard === 'a' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Card A
                </button>
                <button
                    onClick={() => setActiveCard('b')}
                    className={`rounded px-4 py-2 ${activeCard === 'b' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Card B
                </button>
                <button
                    onClick={() => setActiveCard('c')}
                    className={`rounded px-4 py-2 ${activeCard === 'c' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Card C
                </button>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <MotionConfig
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                    }}
                >
                    <AnimatePresence mode="wait">
                        {activeCard === 'a' && (
                            <motion.div
                                key="a"
                                className="absolute inset-0 rounded bg-blue-100 p-4"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                            >
                                <h3 className="font-bold">Card A</h3>
                                <p>All enter/exit animations use the same spring physics.</p>
                            </motion.div>
                        )}

                        {activeCard === 'b' && (
                            <motion.div
                                key="b"
                                className="absolute inset-0 rounded bg-green-100 p-4"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                            >
                                <h3 className="font-bold">Card B</h3>
                                <p>MotionConfig settings are applied to AnimatePresence children.</p>
                            </motion.div>
                        )}

                        {activeCard === 'c' && (
                            <motion.div
                                key="c"
                                className="absolute inset-0 rounded bg-purple-100 p-4"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                            >
                                <h3 className="font-bold">Card C</h3>
                                <p>This makes transitions consistent throughout your application.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </MotionConfig>
            </div>
        </div>
    );
}

// === MOTION CONFIG WITH ORCHESTRATION ===
function OrchestrationExample() {
    const [isOpen, setIsOpen] = useState(false);

    const data = ['Dashboard', 'Profile', 'Settings', 'Logout'];

    const containerVariants = {
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0 },
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Orchestration with MotionConfig</h2>

            <button onClick={() => setIsOpen(!isOpen)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>

            <MotionConfig
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="closed"
                    animate={isOpen ? 'open' : 'closed'}
                    className="w-64 overflow-hidden rounded-lg bg-white shadow-lg"
                >
                    {isOpen && (
                        <div className="p-2">
                            {data.map((item) => (
                                <motion.div
                                    key={item}
                                    variants={itemVariants}
                                    className="cursor-pointer rounded px-4 py-2 hover:bg-gray-100"
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </MotionConfig>
        </div>
    );
}

const MotionConfigExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicMotionConfigExample />
            {/* <TransitionOverrideExample /> */}
            {/* <ReducedMotionExample /> */}
            {/* <NestedMotionConfigExample /> */}
            {/* <MotionConfigVariantsExample /> */}
            {/* <MotionConfigWithPresenceExample /> */}
            {/* <OrchestrationExample /> */}
        </div>
    );
};

export { MotionConfigExamples };
