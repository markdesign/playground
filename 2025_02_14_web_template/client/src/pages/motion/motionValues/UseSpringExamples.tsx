import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// === BASIC SPRING ===
function BasicSpringExample() {
    const x = useMotionValue(0);
    const springX = useSpring(x);

    const handleClick = () => {
        x.set(x.get() === 0 ? 200 : 0);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Spring</h2>

            <button onClick={handleClick} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Toggle Position
            </button>

            <div className="flex h-32 flex-col space-y-6 rounded bg-gray-100 p-4">
                <div className="flex items-center space-x-4">
                    <p className="w-24 text-sm">Input:</p>
                    <motion.div className="h-8 w-8 rounded bg-blue-500" style={{ x }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-24 text-sm">Spring:</p>
                    <motion.div className="h-8 w-8 rounded bg-green-500" style={{ x: springX }} />
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">The spring value follows the input value with physics</p>
        </div>
    );
}

// === SPRING CONFIGURATION ===
function SpringConfigExample() {
    const x = useMotionValue(0);

    // Different spring configurations
    const defaultSpring = useSpring(x);
    const stiffSpring = useSpring(x, { stiffness: 700, damping: 10 });
    const dampedSpring = useSpring(x, { stiffness: 100, damping: 30 });
    const bouncySpring = useSpring(x, { stiffness: 400, damping: 5 });
    const heavySpring = useSpring(x, { stiffness: 100, damping: 20, mass: 5 });

    const handleClick = () => {
        x.set(x.get() === 0 ? 200 : 0);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Spring Configuration</h2>

            <button onClick={handleClick} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Toggle Position
            </button>

            <div className="flex flex-col space-y-4 rounded bg-gray-100 p-4">
                <div className="flex items-center space-x-4">
                    <p className="w-32 text-sm">Input:</p>
                    <motion.div className="h-6 w-6 rounded bg-blue-500" style={{ x }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-32 text-sm">Default:</p>
                    <motion.div className="h-6 w-6 rounded bg-green-500" style={{ x: defaultSpring }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-32 text-sm">Stiff (700, 10):</p>
                    <motion.div className="h-6 w-6 rounded bg-purple-500" style={{ x: stiffSpring }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-32 text-sm">Damped (100, 30):</p>
                    <motion.div className="h-6 w-6 rounded bg-pink-500" style={{ x: dampedSpring }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-32 text-sm">Bouncy (400, 5):</p>
                    <motion.div className="h-6 w-6 rounded bg-yellow-500" style={{ x: bouncySpring }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-32 text-sm">Heavy (mass: 5):</p>
                    <motion.div className="h-6 w-6 rounded bg-red-500" style={{ x: heavySpring }} />
                </div>
            </div>
        </div>
    );
}

// === REST THRESHOLD CONFIGURATION ===
function RestThresholdExample() {
    const x = useMotionValue(0);

    const preciseSpring = useSpring(x, {
        stiffness: 100,
        damping: 10,
        restDelta: 0.01, // Spring stops when within 0.01 of target
        restSpeed: 0.01, // Spring stops when speed below 0.01px/s
    });

    const relaxedSpring = useSpring(x, {
        stiffness: 100,
        damping: 10,
        restDelta: 10, // Spring stops when within 10px of target (stops early)
        restSpeed: 5, // Spring stops when speed below 5px/s (stops early)
    });

    const [precisePosition, setPrecisePosition] = useState(0);
    const [relaxedPosition, setRelaxedPosition] = useState(0);

    useEffect(() => {
        const unsubscribePrecise = preciseSpring.on('change', (v) => setPrecisePosition(Math.round(v)));
        const unsubscribeRelaxed = relaxedSpring.on('change', (v) => setRelaxedPosition(Math.round(v)));
        return () => {
            unsubscribePrecise();
            unsubscribeRelaxed();
        };
    }, [preciseSpring, relaxedSpring]);

    const handleClick = () => {
        const newValue = x.get() === 0 ? 200 : 0;
        x.set(newValue);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Rest Threshold Configuration</h2>

            <button onClick={handleClick} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Toggle Position
            </button>

            <div className="flex flex-col space-y-6 rounded bg-gray-100 p-4">
                <div className="flex items-center space-x-4">
                    <p className="w-40 text-sm">Target: {x.get() === 0 ? '0' : '200'}</p>
                    <motion.div className="h-6 w-6 rounded bg-blue-500" style={{ x }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-40 text-sm">Precise: {precisePosition}</p>
                    <motion.div className="h-6 w-6 rounded bg-green-500" style={{ x: preciseSpring }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-40 text-sm">Relaxed: {relaxedPosition}</p>
                    <motion.div className="h-6 w-6 rounded bg-orange-500" style={{ x: relaxedSpring }} />
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Lower restDelta/restSpeed values make springs more precise but run longer
            </p>
        </div>
    );
}

// === SPRING TRANSFORM ===
function SpringTransformExample() {
    const scale = useMotionValue(1);
    const springScale = useSpring(scale, { stiffness: 300, damping: 20 });

    // Transform the spring to other properties
    const borderRadius = useTransform(springScale, [1, 1.5], [8, 40]);
    const rotate = useTransform(springScale, [1, 1.5], [0, 45]);

    const handleMouseEnter = () => scale.set(1.5);
    const handleMouseLeave = () => scale.set(1);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Spring with useTransform</h2>

            <div className="flex h-60 flex-col items-center justify-center rounded bg-gray-100 p-4">
                <motion.div
                    className="flex h-32 w-32 cursor-pointer items-center justify-center bg-purple-500"
                    style={{
                        scale: springScale,
                        borderRadius,
                        rotate,
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <p className="text-center text-sm text-white">Hover me</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Spring values can be transformed to other properties</p>
        </div>
    );
}

// === SPRING FROM CHANGING VALUES ===
function SpringFromChangingValuesExample() {
    const x = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 100, damping: 10 });

    // Function to simulate external value changes
    const simulateChanges = () => {
        let count = 0;
        const interval = setInterval(() => {
            const newValue = Math.random() * 200;
            x.set(newValue);

            count++;
            if (count >= 10) clearInterval(interval);
        }, 500);

        return () => clearInterval(interval);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Spring From Changing Values</h2>

            <button onClick={simulateChanges} className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
                Simulate Rapid Changes
            </button>

            <div className="flex h-32 flex-col space-y-6 rounded bg-gray-100 p-4">
                <div className="flex items-center space-x-4">
                    <p className="w-24 text-sm">Input:</p>
                    <motion.div className="h-8 w-8 rounded bg-red-500" style={{ x }} />
                </div>

                <div className="flex items-center space-x-4">
                    <p className="w-24 text-sm">Spring:</p>
                    <motion.div className="h-8 w-8 rounded bg-teal-500" style={{ x: springX }} />
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Spring smoothly transitions between rapidly changing values</p>
        </div>
    );
}

// === ANIMATED COUNTER WITH SPRING ===
function AnimatedCounterExample() {
    const count = useMotionValue(0);
    const roundedCount = useMotionValue(0);
    const springCount = useSpring(count, { stiffness: 100, damping: 30 });

    useEffect(() => {
        return springCount.on('change', (latest) => {
            roundedCount.set(Math.round(latest));
        });
    }, [springCount, roundedCount]);

    const increment = (amount: number) => {
        count.set(count.get() + amount);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animated Counter with Spring</h2>

            <div className="mb-4 flex gap-2">
                <button onClick={() => increment(-100)} className="rounded bg-red-500 px-4 py-2 text-white">
                    -100
                </button>
                <button onClick={() => increment(-10)} className="rounded bg-orange-500 px-4 py-2 text-white">
                    -10
                </button>
                <button onClick={() => increment(10)} className="rounded bg-green-500 px-4 py-2 text-white">
                    +10
                </button>
                <button onClick={() => increment(100)} className="rounded bg-blue-500 px-4 py-2 text-white">
                    +100
                </button>
            </div>

            <div className="flex justify-center rounded bg-gray-100 p-8">
                <motion.h1 className="text-6xl font-bold">{roundedCount}</motion.h1>
            </div>

            <p className="mt-2 text-sm text-gray-600">Smooth counter animations with spring physics</p>
        </div>
    );
}

// === SCROLL SMOOTHING ===
function ScrollSmoothingExample() {
    // In a real app, you would use:
    // const { scrollYProgress } = useScroll()
    // Here we simulate scrolling with a motion value
    const scrollY = useMotionValue(0);
    const smoothScrollY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Scroll Smoothing</h2>

            <div className="mb-4">
                <p>Simulated scroll position:</p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="0"
                    className="w-full"
                    onChange={(e) => scrollY.set(parseFloat(e.target.value))}
                />
            </div>

            <div className="relative h-40 rounded bg-gray-100 p-4">
                <div className="mb-4 flex gap-2">
                    <div className="flex-1">
                        <p className="mb-1 text-sm">Raw value:</p>
                        <div className="h-6 overflow-hidden rounded bg-gray-300">
                            <motion.div className="h-full bg-blue-500" style={{ width: `${scrollY.get()}%` }} />
                        </div>
                    </div>

                    <div className="flex-1">
                        <p className="mb-1 text-sm">Smoothed:</p>
                        <div className="h-6 overflow-hidden rounded bg-gray-300">
                            <motion.div
                                className="h-full bg-green-500"
                                style={{
                                    width: useTransform(smoothScrollY, [0, 100], ['0%', '100%']),
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Animated elements that follow smooth scroll */}
                <motion.div
                    className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-purple-500"
                    style={{
                        x: useTransform(smoothScrollY, [0, 100], [0, 300]),
                    }}
                />
            </div>

            <p className="mt-2 text-sm text-gray-600">useSpring makes scroll-based animations smoother</p>
        </div>
    );
}

// === FROM AND TO CONFIGURATION ===
function FromToConfigExample() {
    const [active, setActive] = useState(false);

    const width = useMotionValue(100);
    const height = useMotionValue(100);

    const springWidth = useSpring(width, { stiffness: 300, damping: 25 });
    const springHeight = useSpring(height, { stiffness: 100, damping: 10 });

    useEffect(() => {
        width.set(active ? 200 : 100);
        height.set(active ? 200 : 100);
    }, [active, width, height]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Different Spring Configurations</h2>

            <button onClick={() => setActive(!active)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Toggle Size
            </button>

            <div className="flex h-80 flex-col items-center justify-center rounded bg-gray-100 p-4">
                <motion.div
                    style={{
                        width: springWidth,
                        height: springHeight,
                    }}
                    className="flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500"
                >
                    <div className="text-center text-sm text-white">
                        <p>Width: stiffer spring (300, 25)</p>
                        <p>Height: softer spring (100, 10)</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const UseSpringExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicSpringExample />
            {/* <SpringConfigExample /> */}
            {/* <RestThresholdExample /> */}
            {/* <SpringTransformExample /> */}
            {/* <SpringFromChangingValuesExample /> */}
            {/* <AnimatedCounterExample /> */}
            {/* <ScrollSmoothingExample /> */}
            {/* <FromToConfigExample /> */}
        </div>
    );
};

export { UseSpringExamples };
