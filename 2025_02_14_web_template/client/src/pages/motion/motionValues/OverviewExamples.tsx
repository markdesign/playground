import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'motion/react';

// === BASIC MOTION VALUE ===
function BasicMotionValueExample() {
    const x = useMotionValue(0);
    const [position, setPosition] = useState(0);

    const handleMove = () => {
        x.set(position === 0 ? 100 : 0);
        setPosition(position === 0 ? 100 : 0);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Motion Value</h2>

            <button onClick={handleMove} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Move Box
            </button>

            <motion.div className="h-20 w-20 rounded bg-blue-500" style={{ x }}>
                <p className="p-1 text-xs text-white">x: {position}</p>
            </motion.div>

            <p className="mt-2 text-sm text-gray-600">Using useMotionValue to control x position</p>
        </div>
    );
}

// === TRACKING MOTION VALUE ===
function TrackingMotionValueExample() {
    const x = useMotionValue(0);
    const [currentX, setCurrentX] = useState<number>(0);

    // Subscribe to motion value changes
    useEffect(() => {
        const unsubscribe = x.on('change', (latest: number) => {
            setCurrentX(Math.round(latest));
        });

        // Return the unsubscribe function for cleanup
        return unsubscribe;
    }, [x]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Tracking Motion Value</h2>

            <p className="mb-2">Current x position: {currentX}px</p>

            <motion.div
                className="h-20 w-20 cursor-grab rounded bg-green-500"
                drag="x"
                dragConstraints={{ left: 0, right: 200 }}
                style={{ x }}
            >
                <p className="p-1 text-xs text-white">Drag me</p>
            </motion.div>

            <p className="mt-2 text-sm text-gray-600">Subscribe to value changes with .on("change")</p>
        </div>
    );
}

// === GET AND SET VALUES ===
function GetSetValuesExample() {
    const x = useMotionValue(0);
    const [position, setPosition] = useState<number>(0);

    const moveRight = () => {
        // Get the current value
        const currentX = x.get();
        // Set to a new value
        x.set(currentX + 50);
        setPosition(currentX + 50);
    };

    const reset = () => {
        x.set(0);
        setPosition(0);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Get and Set Values</h2>

            <div className="mb-4 flex gap-2">
                <button onClick={moveRight} className="rounded bg-blue-500 px-4 py-2 text-white">
                    Move Right +50
                </button>

                <button onClick={reset} className="rounded bg-gray-200 px-4 py-2">
                    Reset
                </button>
            </div>

            <p className="mb-2">Position: {position}px</p>

            <div className="relative h-20 overflow-hidden bg-gray-100">
                <motion.div className="absolute h-20 w-20 rounded bg-orange-500" style={{ x }}>
                    <p className="p-1 text-xs text-white">x: {position}</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Using get() and set() methods</p>
        </div>
    );
}

// === TRANSFORM MOTION VALUE ===
function TransformMotionValueExample() {
    // Initialize with a value to match the slider's starting position
    const [sliderValue, setSliderValue] = useState(0);
    const x = useMotionValue(sliderValue);

    // Transform x (0-200) to opacity (1-0)
    const opacity = useTransform(x, [0, 200], [1, 0]);

    // Transform x (0-200) to scale (1-2)
    const scale = useTransform(x, [0, 200], [1, 2]);

    // Transform x (0-200) to rotate (0-180 degrees)
    const rotate = useTransform(x, [0, 200], [0, 180]);

    // Transform with custom output function
    const background = useTransform(x, [0, 100, 200], ['#3b82f6', '#8b5cf6', '#ef4444']);

    // Handle slider change
    const handleSliderChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setSliderValue(newValue);
        x.set(newValue);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Transform Motion Value</h2>

            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={sliderValue}
                    className="w-full"
                    onChange={handleSliderChange}
                />
            </div>

            <div className="flex gap-4">
                <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded bg-blue-500"
                    style={{
                        x,
                        opacity,
                    }}
                >
                    <p className="p-1 text-xs text-white">Opacity</p>
                </motion.div>

                <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded bg-purple-500"
                    style={{
                        scale,
                        originX: 0,
                    }}
                >
                    <p className="p-1 text-xs text-white">Scale</p>
                </motion.div>

                <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded"
                    style={{
                        rotate,
                        background,
                    }}
                >
                    <p className="p-1 text-xs text-white">Rotate & Color</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-500">Value: {sliderValue} / 200</p>
        </div>
    );
}

// === SPRING MOTION VALUE ===
function SpringMotionValueExample() {
    const x = useMotionValue(0);

    // Create a spring that follows x with physics
    const springX = useSpring(x, {
        stiffness: 100,
        damping: 10,
    });

    // Create another spring with different settings
    const slowSpringX = useSpring(x, {
        stiffness: 40,
        damping: 15,
    });

    const handleMove = () => {
        x.set(x.get() === 0 ? 200 : 0);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Spring Motion Value</h2>

            <button onClick={handleMove} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Toggle Position
            </button>

            <div className="relative h-80 rounded bg-gray-100">
                <div className="absolute top-4 left-0">
                    <p className="mb-1 text-sm">Direct:</p>
                    <motion.div className="h-16 w-16 rounded bg-blue-500" style={{ x }}>
                        <p className="p-1 text-xs text-white">Immediate</p>
                    </motion.div>
                </div>

                <div className="absolute top-24 left-0">
                    <p className="mb-1 text-sm">Spring (100, 10):</p>
                    <motion.div className="h-16 w-16 rounded bg-green-500" style={{ x: springX }}>
                        <p className="p-1 text-xs text-white">Springy</p>
                    </motion.div>
                </div>

                <div className="absolute top-44 left-0">
                    <p className="mb-1 text-sm">Spring (40, 15):</p>
                    <motion.div className="h-16 w-16 rounded bg-purple-500" style={{ x: slowSpringX }}>
                        <p className="p-1 text-xs text-white">More damping</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// === COMBINING MOTION VALUES ===
function CombiningMotionValuesExample() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Combine motion values with a custom transformation function
    const distance: MotionValue<number> = useTransform([x, y], ([latestX, latestY]) => {
        return Math.sqrt(Math.pow(latestX, 2) + Math.pow(latestY, 2));
    });

    // Transform the distance to opacity and scale
    const opacity = useTransform(distance, [0, 200], [1, 0.2]);
    const scale = useTransform(distance, [0, 200], [1, 1.5]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Combining Motion Values</h2>

            <div className="relative h-80 w-full rounded bg-gray-100">
                <motion.div
                    className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
                    drag
                    dragConstraints={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    dragElastic={0.3}
                    style={{ x, y }}
                >
                    <motion.div
                        className="h-20 w-20 rounded bg-purple-500"
                        style={{
                            opacity,
                            scale,
                        }}
                    >
                        <p className="p-1 text-xs text-white">Drag me</p>
                    </motion.div>
                </motion.div>

                <p className="absolute bottom-2 left-2 text-sm text-gray-600">
                    Opacity and scale depend on distance from center
                </p>
            </div>
        </div>
    );
}

// === VELOCITY TRACKING ===
function VelocityTrackingExample() {
    // Motion value for x position
    const x = useMotionValue(0);

    // Regular React state for velocity display
    const [velocityDisplay, setVelocityDisplay] = useState('0');

    // Update velocity display when x changes
    useEffect(() => {
        return x.on('change', () => {
            // Get current velocity and update state
            setVelocityDisplay(Math.round(x.getVelocity()).toString());
        });
    }, [x]);

    // Map velocity to background color
    const calculateColor = (velocity: number) => {
        const absVelocity = Math.abs(velocity);
        if (absVelocity < 100) return '#10b981'; // Green when slow/stopped
        if (absVelocity < 500) return '#3b82f6'; // Blue for medium speed
        return '#ef4444'; // Red for fast movement
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Velocity Tracking</h2>
            <p className="mb-2">Current velocity: {velocityDisplay} px/s</p>
            <div className="relative h-40 w-full rounded bg-gray-100">
                <motion.div
                    className="absolute top-0 right-0 bottom-0 left-0 flex items-center"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onUpdate={() => {
                        // This ensures we get updates during animation
                        const velocity = x.getVelocity();
                        const element = document.getElementById('velocity-box');
                        if (element) {
                            element.style.backgroundColor = calculateColor(velocity);
                        }
                    }}
                >
                    <div
                        id="velocity-box"
                        className="flex h-20 w-20 items-center justify-center rounded text-white"
                        style={{ backgroundColor: '#10b981' }}
                    >
                        <p className="text-center text-xs">Drag quickly</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Use x.getVelocity() to measure motion speed</p>
        </div>
    );
}

// === PASSTHROUGH VALUES ===
function PassthroughValuesExample() {
    const x = useMotionValue(0);

    // Create multiple transforms from the same motion value
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
    const scale = useTransform(x, [-100, 0, 100], [0.8, 1, 1.2]);
    const rotate = useTransform(x, [-100, 0, 100], [-90, 0, 90]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Passthrough Values</h2>

            <div className="mb-4">
                <input
                    type="range"
                    min="-100"
                    max="100"
                    defaultValue="0"
                    className="w-full"
                    onChange={(e) => x.set(parseFloat(e.target.value))}
                />
            </div>

            <div className="flex h-40 items-center justify-center bg-gray-100">
                <motion.div
                    className="h-24 w-24 rounded bg-indigo-500"
                    style={{
                        opacity,
                        scale,
                        rotate,
                    }}
                >
                    <p className="p-1 text-xs text-white">Multiple transforms</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">One motion value controlling multiple properties</p>
        </div>
    );
}

const OverviewExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            {/* <BasicMotionValueExample /> */}
            {/* <TrackingMotionValueExample /> */}
            {/* <GetSetValuesExample /> */}
            {/* <TransformMotionValueExample /> */}
            {/* <SpringMotionValueExample /> */}
            {/* <CombiningMotionValuesExample /> */}
            {/* <VelocityTrackingExample /> */}
            <PassthroughValuesExample />
        </div>
    );
};

export { OverviewExamples };
