import React, { useState } from 'react';
import { motion, useTime, useTransform } from 'motion/react';

// === BASIC TIME ANIMATION ===
function BasicTimeExample() {
    // Create a time value that updates every frame
    const time = useTime();

    // Transform time to rotate between 0 and 360 degrees
    const rotate = useTransform(time, [0, 2000], [0, 360], { clamp: false });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Time Animation</h2>

            <div className="flex h-40 items-center justify-center rounded bg-gray-100">
                <motion.div className="h-20 w-20 rounded bg-blue-500" style={{ rotate }}>
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="h-2 w-10 rounded bg-white"></div>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Continuous rotation animation using useTime</p>
        </div>
    );
}

// === PLAY/PAUSE TIME CONTROL ===
function PlayPauseTimeExample() {
    const [isPlaying, setIsPlaying] = useState(true);

    // Time value with play/pause control
    const time = useTime({ isPlaying });

    // Transform time to rotate (one revolution per second)
    const rotate = useTransform(time, [0, 1000], [0, 360], { clamp: false });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Play/Pause Time Control</h2>

            <button onClick={() => setIsPlaying(!isPlaying)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isPlaying ? 'Pause' : 'Play'}
            </button>

            <div className="flex h-40 items-center justify-center rounded bg-gray-100">
                <motion.div className="h-20 w-20 rounded-full bg-purple-500" style={{ rotate }}>
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="mx-1 h-8 w-1 rounded-full bg-white"></div>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Control animation playback with the isPlaying option</p>
        </div>
    );
}

// === OSCILLATING ANIMATION ===
function OscillatingAnimationExample() {
    const time = useTime();

    // Create a sine wave oscillation between -30 and 30 degrees
    const rotate = useTransform(time, (t) => Math.sin(t / 500) * 30);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Oscillating Animation</h2>

            <div className="flex h-40 items-center justify-center rounded bg-gray-100">
                <motion.div className="h-24 w-8 origin-bottom rounded bg-green-500" style={{ rotate }}>
                    <div className="absolute -top-3 left-1 h-6 w-6 rounded-full bg-green-700"></div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Using Math.sin with useTime to create a pendulum effect</p>
        </div>
    );
}

// === MULTIPLE ANIMATIONS ===
function MultipleAnimationsExample() {
    const time = useTime();

    // Multiple animations with different speeds
    const rotate1 = useTransform(time, [0, 2000], [0, 360], { clamp: false });
    const rotate2 = useTransform(time, [0, 3000], [360, 0], { clamp: false });
    const scale = useTransform(time, (t) => 1 + 0.2 * Math.sin(t / 400));

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multiple Animations</h2>

            <div className="flex h-60 items-center justify-center rounded bg-gray-100">
                <motion.div className="flex h-40 w-40 items-center justify-center" style={{ rotate: rotate1 }}>
                    <motion.div className="absolute h-6 w-6 rounded-full bg-blue-500" style={{ x: 50 }} />

                    <motion.div
                        className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-dashed border-cyan-500"
                        style={{ rotate: rotate2 }}
                    >
                        <motion.div className="h-8 w-8 rounded-full bg-pink-500" style={{ scale }} />
                    </motion.div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Multiple animations at different speeds from one time source</p>
        </div>
    );
}

// === FRAME RATE CONTROL ===
function FrameRateControlExample() {
    const [fps, setFps] = useState<number>(60);

    // Time value with controlled frame rate
    const time = useTime({ fps });

    // Transform time to rotate
    const rotate = useTransform(time, [0, 1000], [0, 360], { clamp: false });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Frame Rate Control</h2>

            <div className="mb-4">
                <p className="mb-1 text-sm">Frame rate: {fps} FPS</p>
                <input
                    type="range"
                    min="1"
                    max="60"
                    value={fps}
                    className="w-full"
                    onChange={(e) => setFps(Number(e.target.value))}
                />
            </div>

            <div className="flex h-40 items-center justify-center rounded bg-gray-100">
                <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded bg-amber-500"
                    style={{ rotate }}
                >
                    <div className="h-2 w-16 bg-white"></div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Control animation frame rate with the fps option</p>
        </div>
    );
}

// === COLOR ANIMATION ===
function ColorAnimationExample() {
    const time = useTime();

    // Transform time to hue (0-360)
    const hue = useTransform(time, [0, 10000], [0, 360], { clamp: false });

    // Create HSL color string
    const background = useTransform(hue, (h) => `hsl(${h}, 100%, 50%)`);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Color Animation</h2>

            <div className="h-40 overflow-hidden rounded bg-gray-100">
                <motion.div className="h-full w-full" style={{ background }}>
                    <div className="flex h-full w-full items-center justify-center">
                        <motion.p
                            className="text-xl font-bold text-white"
                            style={{ opacity: useTransform(time, (t) => 0.7 + 0.3 * Math.sin(t / 300)) }}
                        >
                            Rainbow Effect
                        </motion.p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Cycling through colors using useTime</p>
        </div>
    );
}

// === MULTIPLE INDEPENDENT TIME SOURCES ===
function MultipleTimeSourcesExample() {
    // Different time sources with different settings
    const time1 = useTime(); // Default settings
    const time2 = useTime({ fps: 10 }); // Lower frame rate
    const time3 = useTime({ from: 1000 }); // Starting from 1000ms

    // Transform time values
    const x1 = useTransform(time1, [0, 3000], [0, 150], { clamp: false });
    const x2 = useTransform(time2, [0, 3000], [0, 150], { clamp: false });
    const x3 = useTransform(time3, [1000, 4000], [0, 150], { clamp: false });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multiple Time Sources</h2>

            <div className="h-60 rounded bg-gray-100 p-4">
                <div className="space-y-8">
                    <div>
                        <p className="mb-1 text-sm">Default (60fps):</p>
                        <div className="relative h-8 w-full rounded-full bg-gray-200">
                            <motion.div className="absolute h-8 rounded-full bg-blue-500" style={{ width: x1 }} />
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-sm">10fps:</p>
                        <div className="relative h-8 w-full rounded-full bg-gray-200">
                            <motion.div className="absolute h-8 rounded-full bg-green-500" style={{ width: x2 }} />
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-sm">Starting from 1000ms:</p>
                        <div className="relative h-8 w-full rounded-full bg-gray-200">
                            <motion.div className="absolute h-8 rounded-full bg-purple-500" style={{ width: x3 }} />
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Creating multiple independent time sources</p>
        </div>
    );
}

// === TIME-BASED SPRING SIMULATION ===
function TimeBasedSpringExample() {
    const time = useTime();

    // Create a spring-like effect using time and Math
    const springY = useTransform(time, (t) => {
        // Simulate spring physics with dampened sine wave
        const frequency = 2; // oscillations per second
        const decay = 1.5; // higher = faster decay

        const progress = (t % 3000) / 1000; // Reset every 3 seconds
        return (50 * Math.sin(progress * frequency * Math.PI)) / Math.exp(progress * decay);
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Time-Based Spring Simulation</h2>

            <div className="relative h-60 rounded bg-gray-100">
                <div className="absolute top-0 right-0 left-0 flex h-4 justify-center bg-gray-300">
                    <div className="h-4 w-1 bg-gray-500"></div>
                </div>

                <motion.div className="absolute top-4 left-1/2 flex h-40 w-4 -translate-x-1/2 transform justify-center">
                    <motion.div className="h-full w-px bg-gray-400" />
                    <motion.div
                        className="absolute top-0 -ml-4 h-8 w-8 rounded-full bg-red-500"
                        style={{ y: springY }}
                    />
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Using time and math functions to simulate spring physics</p>
        </div>
    );
}

const UseTimeExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicTimeExample />
            <PlayPauseTimeExample />
            <OscillatingAnimationExample />
            <MultipleAnimationsExample />
            <FrameRateControlExample />
            <ColorAnimationExample />
            <MultipleTimeSourcesExample />
            <TimeBasedSpringExample />
        </div>
    );
};

export { UseTimeExamples };
