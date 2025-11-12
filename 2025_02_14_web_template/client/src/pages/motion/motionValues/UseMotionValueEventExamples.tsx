import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll } from 'motion/react';

// === BASIC USAGE ===
function BasicUsageExample() {
    const x = useMotionValue(0);
    const [latestX, setLatestX] = useState(0);

    // Track changes to x using useMotionValueEvent
    useMotionValueEvent(x, 'change', (latest) => {
        setLatestX(Math.round(latest));
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Usage</h2>

            <p className="mb-2">x: {latestX}</p>

            <div className="relative mb-4 h-20 rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    className="absolute top-2 h-16 w-16 rounded bg-blue-500"
                    style={{ x }}
                />
            </div>

            <p className="text-sm text-gray-600">useMotionValueEvent(motionValue, eventName, callback)</p>
        </div>
    );
}

// === COMPARED TO USEEFFECT ===
function ComparedToUseEffectExample() {
    const x = useMotionValue(0);
    const [withHook, setWithHook] = useState(0);
    const [withEffect, setWithEffect] = useState(0);

    // Approach 1: useMotionValueEvent
    useMotionValueEvent(x, 'change', (latest) => {
        setWithHook(Math.round(latest));
    });

    // Approach 2: useEffect + on
    useEffect(() => {
        return x.on('change', (latest) => {
            setWithEffect(Math.round(latest));
        });
    }, [x]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Compared to useEffect</h2>

            <div className="mb-4">
                <p>Value with useMotionValueEvent: {withHook}</p>
                <p>Value with useEffect: {withEffect}</p>
            </div>

            <div className="relative mb-4 h-20 rounded bg-gray-100">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    className="absolute top-2 h-16 w-16 rounded bg-green-500"
                    style={{ x }}
                />
            </div>

            <div className="text-sm text-gray-600">
                <p className="mb-1 font-bold">Benefits of useMotionValueEvent:</p>
                <ul className="ml-5 list-disc">
                    <li>More declarative</li>
                    <li>Better semantics</li>
                    <li>Automatic cleanup</li>
                </ul>
            </div>
        </div>
    );
}

// === PRACTICAL EXAMPLE: SCROLL TRACKING ===
function ScrollTrackingExample() {
    const { scrollY, scrollYProgress } = useScroll();
    const [position, setPosition] = useState(0);
    const [progress, setProgress] = useState(0);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setPosition(Math.round(latest));
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        setProgress(Math.round(latest * 100));
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Scroll Tracking</h2>

            <div className="fixed top-4 right-4 z-10 rounded bg-white p-3 shadow-lg">
                <p>ScrollY: {position}px</p>
                <p>Progress: {progress}%</p>
                <div className="mt-1 h-2 w-full bg-gray-200">
                    <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div>
                <p className="mb-2">Scroll down to see values change:</p>
                <div className="h-[50vh] bg-gray-100"></div>
                <div className="h-[50vh] bg-gray-200"></div>
                <div className="h-[50vh] bg-gray-300"></div>
            </div>

            <p className="mt-4 text-sm text-gray-600">Track scroll events with useMotionValueEvent</p>
        </div>
    );
}

// === MULTIPLE VALUES TRACKING ===
function MultipleTrackerExample() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Track changes to both x and y
    useMotionValueEvent(x, 'change', (latest) => {
        setPosition((prev) => ({ ...prev, x: Math.round(latest) }));
    });

    useMotionValueEvent(y, 'change', (latest) => {
        setPosition((prev) => ({ ...prev, y: Math.round(latest) }));
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multiple Value Tracking</h2>

            <p className="mb-2">
                Position: x={position.x}, y={position.y}
            </p>

            <div className="relative mb-4 h-40 w-full rounded bg-gray-100">
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 300, top: 0, bottom: 100 }}
                    className="absolute top-2 left-2 h-16 w-16 rounded bg-violet-500"
                    style={{ x, y }}
                />
            </div>

            <p className="text-sm text-gray-600">
                Track multiple values independently with separate useMotionValueEvent calls
            </p>
        </div>
    );
}

function UseMotionValueEventExamples() {
    return (
        <div className="space-y-16 pb-20">
            <BasicUsageExample />
            <ComparedToUseEffectExample />
            <ScrollTrackingExample />
            <MultipleTrackerExample />
        </div>
    );
}

export { UseMotionValueEventExamples };

/*
# Summary of useMotionValueEvent in Motion
The useMotionValueEvent hook provides a cleaner way to track motion value events in React components.

## Key Features:

Simple API:
- useMotionValueEvent(motionValue, eventName, callback)

Supported Events:
- "change" - Triggered when the value changes
- "velocityChange" - Triggered when velocity changes
- "animationStart" - Triggered when an animation starts
- "animationComplete" - Triggered when an animation completes
- Advantages over useEffect:

More declarative syntax
- Better semantics
- Automatic cleanup when component unmounts

Common Uses:
- Track motions and update state
- Monitor scrolling
- Detect velocity changes
- Respond to animation events
- This hook provides a React-friendly way to subscribe to motion value events without manual subscription cleanup.
*/
