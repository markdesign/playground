import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useVelocity, useTransform } from 'motion/react';

// === BASIC VELOCITY TRACKING ===
function BasicVelocityExample() {
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);

    const [velocity, setVelocity] = useState<number>(0);

    // Update velocity display
    useEffect(() => {
        return xVelocity.on('change', (latest) => {
            setVelocity(Math.round(latest));
        });
    }, [xVelocity]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Velocity Tracking</h2>

            <div className="mb-2">
                <p className="text-sm">
                    Current velocity: <span className="font-bold">{velocity}</span> pixels/second
                </p>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    style={{ x }}
                    className="absolute top-1/2 left-0 h-20 w-20 -translate-y-1/2 transform cursor-grab rounded bg-blue-500"
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <p className="text-sm">Drag me</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">useVelocity tracks how fast a value is changing</p>
        </div>
    );
}

// === VELOCITY-BASED COLOR ===
function VelocityColorExample() {
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);

    // Map velocity to a color
    const backgroundColor = useTransform(
        xVelocity,
        [-1000, -300, 0, 300, 1000],
        ['#ef4444', '#3b82f6', '#10b981', '#3b82f6', '#ef4444'],
    );

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Velocity-Based Color</h2>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    style={{
                        x,
                        backgroundColor,
                    }}
                    className="absolute top-1/2 left-0 h-20 w-20 -translate-y-1/2 transform cursor-grab rounded"
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <p className="text-sm">Drag fast</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Color changes based on drag speed and direction</p>
        </div>
    );
}

// === VELOCITY DIRECTION DETECTION ===
function VelocityDirectionExample() {
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);

    const [direction, setDirection] = useState<string>('none');

    // Detect direction based on velocity
    useEffect(() => {
        return xVelocity.on('change', (latest) => {
            if (Math.abs(latest) < 5) {
                setDirection('none');
            } else if (latest > 0) {
                setDirection('right');
            } else {
                setDirection('left');
            }
        });
    }, [xVelocity]);

    // Map direction to an arrow
    const directionArrow = {
        none: '• • •',
        left: '← ← ←',
        right: '→ → →',
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Velocity Direction Detection</h2>

            <div className="mb-2">
                <p className="text-lg font-bold">
                    Direction: {direction} {directionArrow[direction as keyof typeof directionArrow]}
                </p>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    style={{ x }}
                    className="absolute top-1/2 left-0 h-20 w-20 -translate-y-1/2 transform cursor-grab rounded bg-purple-500"
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <p className="text-sm">Drag me</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Detect direction of movement based on velocity</p>
        </div>
    );
}

// === THROW BEHAVIOR ===
function ThrowBehaviorExample() {
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);

    // Track the state of the throw
    const [throwState, setThrowState] = useState<string>('ready');
    const [throwDistance, setThrowDistance] = useState<number>(0);

    useEffect(() => {
        // Reset state when at rest
        if (Math.abs(xVelocity.get()) < 5 && throwState === 'threw') {
            setThrowState('ready');
        }
    }, [xVelocity, throwState]);

    // Handle drag end to detect throws
    const handleDragEnd = () => {
        const velocity = xVelocity.get();

        // If velocity is high enough, consider it a throw
        if (Math.abs(velocity) > 500) {
            setThrowState('threw');
            const distance = Math.round(velocity / 50); // Simple approximation
            setThrowDistance(distance);
        }
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Throw Behavior Detection</h2>

            <div className="mb-2">
                <p className="text-lg">
                    {throwState === 'threw'
                        ? `Threw with force: ${throwDistance}`
                        : 'Drag and release quickly to throw'}
                </p>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    onDragEnd={handleDragEnd}
                    style={{ x }}
                    className="absolute top-1/2 left-0 h-20 w-20 -translate-y-1/2 transform cursor-grab rounded bg-green-500"
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <p className="text-sm">Throw me</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Detect throwing behavior based on exit velocity</p>
        </div>
    );
}

// === MULTI-AXIS VELOCITY ===
function MultiAxisVelocityExample() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xVelocity = useVelocity(x);
    const yVelocity = useVelocity(y);

    const [totalVelocity, setTotalVelocity] = useState<number>(0);
    const [angle, setAngle] = useState<number>(0);

    // Calculate combined velocity and direction
    useEffect(() => {
        const unsubscribeX = xVelocity.on('change', updateVelocity);
        const unsubscribeY = yVelocity.on('change', updateVelocity);

        function updateVelocity() {
            const xVel = xVelocity.get();
            const yVel = yVelocity.get();

            // Calculate magnitude
            const magnitude = Math.sqrt(xVel * xVel + yVel * yVel);
            setTotalVelocity(Math.round(magnitude));

            // Calculate angle in degrees
            if (magnitude > 10) {
                const angleRad = Math.atan2(yVel, xVel);
                const angleDeg = (angleRad * 180) / Math.PI;
                setAngle(Math.round(angleDeg));
            }
        }

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [xVelocity, yVelocity]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multi-Axis Velocity</h2>

            <div className="mb-2">
                <p className="text-sm">
                    Total velocity: <span className="font-bold">{totalVelocity}</span> pixels/second
                </p>
                <p className="text-sm">
                    Direction angle: <span className="font-bold">{angle}°</span>
                </p>
            </div>

            <div className="relative h-60 rounded bg-gray-100">
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }}
                    style={{ x, y }}
                    className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform cursor-grab rounded-full bg-pink-500"
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <p className="text-sm">Drag in any direction</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Track velocity across multiple axes</p>
        </div>
    );
}

// === VELOCITY-BASED SCALE ===
function VelocityBasedScaleExample() {
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);

    // Map velocity to scale (faster = bigger)
    const scale = useTransform(xVelocity, [-800, 0, 800], [1.5, 1, 1.5], { clamp: true });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Velocity-Based Scale</h2>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    style={{
                        x,
                        scale,
                    }}
                    className="absolute top-1/2 left-0 flex h-20 w-20 -translate-y-1/2 transform cursor-grab items-center justify-center rounded bg-amber-500"
                >
                    <p className="text-center text-sm text-white">Drag fast to grow</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Scale element based on its velocity</p>
        </div>
    );
}

// === VELOCITY HISTORY CHART ===
function VelocityHistoryExample() {
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);

    // Store a history of velocities
    const [velocityHistory, setVelocityHistory] = useState<number[]>(Array(20).fill(0));

    // Update history on velocity change
    useEffect(() => {
        return xVelocity.on('change', (latest) => {
            setVelocityHistory((prev) => {
                const newHistory = [...prev];
                newHistory.push(latest);
                return newHistory.slice(-20); // Keep last 20 values
            });
        });
    }, [xVelocity]);

    // Calculate maximum absolute velocity for scaling
    const maxVelocity = Math.max(
        Math.abs(Math.min(...velocityHistory)),
        Math.max(...velocityHistory),
        500, // Minimum scale
    );

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Velocity History Chart</h2>

            <div className="mb-4 h-40 rounded bg-gray-100">
                <div className="flex h-full w-full items-end justify-around px-1">
                    {velocityHistory.map((vel, i) => (
                        <div
                            key={i}
                            className="w-3 bg-indigo-500"
                            style={{
                                height: `${(Math.abs(vel) / maxVelocity) * 100}%`,
                                backgroundColor: vel > 0 ? '#10b981' : '#ef4444',
                            }}
                        />
                    ))}
                </div>
                <div className="-mt-px h-px w-full bg-gray-400"></div>
            </div>

            <div className="relative h-20 rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    style={{ x }}
                    className="absolute top-1/2 left-0 h-10 w-10 -translate-y-1/2 transform cursor-grab rounded bg-indigo-500"
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <p className="text-xs">Drag</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Visualize velocity changes over time (green = positive, red = negative)
            </p>
        </div>
    );
}

// === SWIPE DETECTION ===
function SwipeDetectionExample() {
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);

    const [swipeDirection, setSwipeDirection] = useState<string>('');
    const [swipeCount, setSwipeCount] = useState<{ left: number; right: number }>({ left: 0, right: 0 });

    // Detect swipe on drag end
    const handleDragEnd = () => {
        const velocity = xVelocity.get();

        // Reset the position
        x.set(0);

        // Detect swipe direction based on velocity threshold
        if (velocity < -500) {
            setSwipeDirection('Left');
            setSwipeCount((prev) => ({ ...prev, left: prev.left + 1 }));
        } else if (velocity > 500) {
            setSwipeDirection('Right');
            setSwipeCount((prev) => ({ ...prev, right: prev.right + 1 }));
        } else {
            setSwipeDirection('No swipe detected');
        }
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Swipe Detection</h2>

            <div className="mb-2">
                <p className="text-lg font-bold">{swipeDirection}</p>
                <p className="text-sm">
                    Swipes detected: Left ({swipeCount.left}) | Right ({swipeCount.right})
                </p>
            </div>

            <div className="relative h-40 overflow-hidden rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    style={{ x }}
                    className="absolute top-1/2 left-1/2 flex h-20 w-60 -translate-x-1/2 -translate-y-1/2 transform cursor-grab items-center justify-center rounded bg-teal-500"
                >
                    <p className="text-white">Swipe left or right quickly</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Detect swipe gestures using exit velocity</p>
        </div>
    );
}

const UseVelocityExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicVelocityExample />
            <VelocityColorExample />
            <VelocityDirectionExample />
            <ThrowBehaviorExample />
            <MultiAxisVelocityExample />
            <VelocityBasedScaleExample />
            <VelocityHistoryExample />
            <SwipeDetectionExample />
        </div>
    );
};

export { UseVelocityExamples };
