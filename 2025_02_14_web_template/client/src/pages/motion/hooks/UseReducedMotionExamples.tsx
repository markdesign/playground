import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';

// === BASIC USAGE ===
function BasicUsageExample() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Usage</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Current preference:{' '}
                    <span className="font-bold">{prefersReducedMotion ? 'Reduced motion' : 'Standard motion'}</span>
                </p>

                <motion.div
                    className="h-16 w-16 rounded bg-blue-500"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>

            <p className="mt-2 text-sm text-gray-600">
                To test, change reduced motion setting in your system preferences
            </p>
        </div>
    );
}

// === CONDITIONAL ANIMATIONS ===
function ConditionalAnimationsExample() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Conditional Animations</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Current preference:{' '}
                    <span className="font-bold">{prefersReducedMotion ? 'Reduced motion' : 'Standard motion'}</span>
                </p>

                <motion.div
                    className="h-16 w-16 rounded bg-purple-500"
                    animate={{
                        x: prefersReducedMotion ? 0 : 100,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Motion is conditionally disabled when reduced motion is preferred
            </p>
        </div>
    );
}

// === ALTERNATIVE ANIMATIONS ===
function AlternativeAnimationsExample() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Alternative Animations</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Current preference:{' '}
                    <span className="font-bold">{prefersReducedMotion ? 'Reduced motion' : 'Standard motion'}</span>
                </p>

                <motion.button
                    className="rounded bg-green-500 px-4 py-2 text-white focus:outline-none"
                    whileHover={
                        prefersReducedMotion
                            ? { backgroundColor: '#166534' } // Color change only
                            : { scale: 1.05, backgroundColor: '#166534' } // Scale + color
                    }
                    whileTap={
                        prefersReducedMotion
                            ? { backgroundColor: '#14532d' } // Color change only
                            : { scale: 0.95, backgroundColor: '#14532d' } // Scale + color
                    }
                >
                    Hover and tap me
                </motion.button>
            </div>

            <p className="mt-2 text-sm text-gray-600">Provides alternative animations based on motion preference</p>
        </div>
    );
}

// === DISABLING ANIMATIONS ===
function DisablingAnimationsExample() {
    const prefersReducedMotion = useReducedMotion();
    const [count, setCount] = useState(0);

    // Create animation or instant transition based on preference
    const transition = prefersReducedMotion
        ? { duration: 0 } // Instant
        : { type: 'spring', stiffness: 300, damping: 20 }; // Animated

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Disabling Animations</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Current preference:{' '}
                    <span className="font-bold">{prefersReducedMotion ? 'Reduced motion' : 'Standard motion'}</span>
                </p>

                <button onClick={() => setCount(count + 1)} className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
                    Increment: {count}
                </button>

                <div className="relative h-16 rounded border border-gray-300">
                    <motion.div
                        className="aspect-square h-full rounded bg-amber-500"
                        animate={{ x: (count % 3) * 100 }}
                        transition={transition}
                    />
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Completely disables animation duration for reduced motion preference
            </p>
        </div>
    );
}

// === THRESHOLD ADJUSTMENTS ===
function ThresholdAdjustmentsExample() {
    const prefersReducedMotion = useReducedMotion();

    // Adjust animation parameters based on preference
    const duration = prefersReducedMotion ? 2 : 0.5; // Slower = more gentle
    const distance = prefersReducedMotion ? 20 : 50; // Less movement
    const stiffness = prefersReducedMotion ? 100 : 300; // Less bouncy

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Threshold Adjustments</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Current preference:{' '}
                    <span className="font-bold">{prefersReducedMotion ? 'Reduced motion' : 'Standard motion'}</span>
                </p>

                <motion.div
                    className="h-16 w-16 rounded bg-indigo-500"
                    animate={{ y: [-distance, 0, distance] }}
                    transition={{
                        y: {
                            duration,
                            repeat: Infinity,
                            repeatType: 'mirror',
                            stiffness,
                        },
                    }}
                />
            </div>

            <p className="mt-2 text-sm text-gray-600">Reduces animation intensity instead of removing it completely</p>
        </div>
    );
}

// === GLOBAL MOTION CONTEXT ===
function GlobalMotionContextExample() {
    const systemPrefersReducedMotion = useReducedMotion();
    const [userPreference, setUserPreference] = useState<string>('system');

    // Combine system preference and user setting
    const shouldReduceMotion =
        userPreference === 'reduced' || (userPreference === 'system' && systemPrefersReducedMotion);

    // Animation settings based on reduced motion preference
    const bounce = shouldReduceMotion ? { y: 0 } : { y: [0, -20, 0] };

    const transition = shouldReduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Global Motion Context</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    System preference:{' '}
                    <span className="font-bold">{systemPrefersReducedMotion ? 'Reduced' : 'Standard'}</span>
                    <br />
                    Current setting: <span className="font-bold">{userPreference}</span>
                    <br />
                    Final motion: <span className="font-bold">{shouldReduceMotion ? 'Reduced' : 'Standard'}</span>
                </p>

                <div className="mb-4">
                    <select
                        value={userPreference}
                        onChange={(e) => setUserPreference(e.target.value)}
                        className="rounded border px-3 py-2"
                    >
                        <option value="system">Follow system setting</option>
                        <option value="standard">Standard motion</option>
                        <option value="reduced">Reduced motion</option>
                    </select>
                </div>

                <motion.div className="h-16 w-16 rounded bg-pink-500" animate={bounce} transition={transition} />
            </div>

            <p className="mt-2 text-sm text-gray-600">Combines system preference with user-defined settings</p>
        </div>
    );
}

// === TRANSITIONING BETWEEN STATES ===
function TransitioningBetweenStatesExample() {
    const prefersReducedMotion = useReducedMotion();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Transitioning Between States</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Current preference:{' '}
                    <span className="font-bold">{prefersReducedMotion ? 'Reduced motion' : 'Standard motion'}</span>
                </p>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>

                <motion.div
                    className="overflow-hidden rounded bg-white"
                    animate={{
                        height: isExpanded ? 'auto' : 48,
                    }}
                    transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                    }}
                >
                    <div className="bg-blue-100 p-3">
                        <h3 className="font-medium">Expandable Panel</h3>
                    </div>
                    <div className="p-3">
                        <p>This content appears when the panel is expanded.</p>
                        <p className="mt-2">For users with reduced motion preference, the transition is immediate.</p>
                        <p className="mt-2">For others, there's a smooth height animation.</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Handles content transitions with reduced motion consideration</p>
        </div>
    );
}

// === DEVICE ORIENTATION AWARENESS ===
function DeviceOrientationExample() {
    const prefersReducedMotion = useReducedMotion();
    const [orientation, setOrientation] = useState<{ beta: number; gamma: number }>({ beta: 0, gamma: 0 });
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        // Check if DeviceOrientation is supported
        if (!window.DeviceOrientationEvent) {
            setIsSupported(false);
            return;
        }

        const handleOrientation = (event: DeviceOrientationEvent) => {
            setOrientation({
                beta: event.beta || 0, // Front/back tilt
                gamma: event.gamma || 0, // Left/right tilt
            });
        };

        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    // Calculate movement scale based on preference
    const movementScale = prefersReducedMotion ? 0.1 : 1;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Device Orientation Awareness</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Current preference:{' '}
                    <span className="font-bold">{prefersReducedMotion ? 'Reduced motion' : 'Standard motion'}</span>
                </p>

                {!isSupported ? (
                    <p className="text-amber-600">Device orientation not supported on your device/browser</p>
                ) : (
                    <div className="relative h-40 overflow-hidden rounded bg-gray-200">
                        <motion.div
                            className="absolute h-16 w-16 rounded-full bg-cyan-500"
                            style={{
                                x: `calc(50% + ${orientation.gamma * movementScale}px)`,
                                y: `calc(50% + ${orientation.beta * movementScale}px)`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                        <p className="absolute right-2 bottom-2 text-xs">Tilt your device to move the dot</p>
                    </div>
                )}
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Reduces parallax/orientation effects based on motion preference
            </p>
        </div>
    );
}

// === ANIMATIONS WITH INCREASED CLARITY ===
function IncreasedClarityAnimationsExample() {
    const prefersReducedMotion = useReducedMotion();
    const [isVisible, setIsVisible] = useState(false);

    // Standard animation with motion
    const standardAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Reduced motion - no movement but stronger opacity change
    const reducedAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    // Choose animation based on preference
    const animation = prefersReducedMotion ? reducedAnimation : standardAnimation;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animations with Increased Clarity</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Current preference:{' '}
                    <span className="font-bold">{prefersReducedMotion ? 'Reduced motion' : 'Standard motion'}</span>
                </p>

                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                    {isVisible ? 'Hide' : 'Show'} Content
                </button>

                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            className="rounded bg-white p-4 shadow"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={animation}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-bold">Important Content</h3>
                            <p>
                                This content uses motion that's appropriate for the user's preference. For reduced
                                motion, we remove movement but keep opacity changes for clarity.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <p className="mt-2 text-sm text-gray-600">Maintains visual cues while respecting motion preferences</p>
        </div>
    );
}

// === REDUCED MOTION SSR ===
function ReducedMotionSSRExample() {
    // Note: In a real app, this would be handled at build/server time
    const [hasMounted, setHasMounted] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Reduced Motion SSR</h2>

            <div className="rounded bg-gray-100 p-4">
                <p className="mb-4">
                    Client-side mounted: <span className="font-bold">{hasMounted ? 'Yes' : 'No'}</span>
                    <br />
                    Motion preference:{' '}
                    <span className="font-bold">
                        {!hasMounted ? 'Unknown (SSR)' : prefersReducedMotion ? 'Reduced' : 'Standard'}
                    </span>
                </p>

                <div className="rounded bg-white p-4 shadow">
                    {/* During SSR or if JavaScript is disabled, default to no motion */}
                    <div className="hidden motion-safe:block">
                        <motion.div
                            className="h-8 w-8 rounded-full bg-blue-500"
                            animate={{ x: [0, 100, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </div>

                    {/* Always shown during SSR, hidden with CSS when JS loads if motion is safe */}
                    <div className="motion-reduce:block">
                        <div className="h-8 w-8 rounded-full bg-blue-500" />
                    </div>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Handles motion safely during server-side rendering</p>
        </div>
    );
}

const UseReducedMotionExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicUsageExample />
            <ConditionalAnimationsExample />
            <AlternativeAnimationsExample />
            <DisablingAnimationsExample />
            <ThresholdAdjustmentsExample />
            <GlobalMotionContextExample />
            <TransitioningBetweenStatesExample />
            <DeviceOrientationExample />
            <IncreasedClarityAnimationsExample />
            <ReducedMotionSSRExample />
        </div>
    );
};

export { UseReducedMotionExamples };
