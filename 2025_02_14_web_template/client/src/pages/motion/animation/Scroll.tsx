import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

// === BASIC SCROLL PROGRESS ===
function ScrollProgressExample() {
    const { scrollYProgress } = useScroll();
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Scroll Progress</h2>
            <div className="relative h-[200vh]">
                <motion.div
                    className="fixed top-0 right-0 left-0 h-2 origin-left bg-blue-500"
                    style={{ scaleX: scrollYProgress }}
                />
                <h2 className="fixed top-10 left-4">Scroll down to see progress indicator</h2>
            </div>
        </div>
    );
}

// === TRANSFORM SCROLL VALUES ===
function ScrollTransformExample() {
    const { scrollYProgress } = useScroll();
    // Transform scrollYProgress (0-1) to rotation (0-360deg)
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
    // Transform scrollYProgress (0-1) to opacity (1-0)
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Transform Scroll Values</h2>
            <div className="relative h-[200vh]">
                <motion.div
                    className="fixed top-20 right-0 left-0 flex justify-center"
                    style={{ rotate: rotation, opacity }}
                >
                    <div className="flex h-40 w-40 items-center justify-center bg-purple-500 text-white">
                        Rotating as you scroll
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// === ELEMENT SCROLL PROGRESS ===
function ElementScrollExample() {
    const targetRef = useRef(null);

    // Track element's position in viewport
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'], // Track from when element enters to when it leaves
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Element Scroll Progress</h2>

            <div className="relative h-[300vh] py-[50vh]">
                <motion.div
                    ref={targetRef}
                    className="mx-4 flex h-[50vh] items-center justify-center bg-green-500"
                    style={{ opacity, scale }}
                >
                    <p className="text-xl text-white">Watch me fade in and out as I enter and leave the viewport</p>
                </motion.div>
            </div>
        </div>
    );
}

// === SCROLL OFFSET OPTIONS ===
function ScrollOffsetExample() {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'], // Starts when element top hits viewport top, ends when element bottom hits viewport bottom
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.33, 0.66, 1],
        ['#3B82F6', '#EC4899', '#10B981', '#F59E0B'],
    );

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Scroll Offset Options</h2>

            <div className="relative h-[300vh]">
                <div className="h-[100vh]">Scroll down</div>
                <motion.div
                    ref={targetRef}
                    className="mx-4 flex h-[100vh] items-center justify-center text-xl text-white"
                    style={{ backgroundColor }}
                >
                    Color changes during element scroll
                </motion.div>
            </div>
        </div>
    );
}

// === SCROLL CONTAINER ===
function ScrollContainerExample() {
    const containerRef = useRef(null);
    const targetRef = useRef(null);
    const [progress, setProgress] = useState(0);

    // Track target element's progress through the container
    const { scrollXProgress } = useScroll({
        container: containerRef,
        target: targetRef,
        offset: ['start end', 'end start'], // Track full visibility range
    });

    // Subscribe to scroll progress changes
    useMotionValueEvent(scrollXProgress, 'change', (latest) => {
        setProgress(Math.round(latest * 100));
    });

    // Create visual transforms based on scroll progress
    const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.8, 1.2, 1]);
    const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
    const backgroundColor = useTransform(scrollXProgress, [0, 0.5, 1], ['#ef4444', '#8b5cf6', '#10b981']);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Scroll Container</h2>

            {/* Progress indicator */}
            <motion.div className="mb-2 h-1 origin-left bg-blue-500" style={{ scaleX: scrollXProgress }} />

            <div className="h-60 w-full">
                <div
                    ref={containerRef}
                    className="flex h-full w-full overflow-x-auto"
                    style={{
                        scrollbarWidth: 'thin',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    <div className="flex space-x-8 px-4" style={{ paddingRight: '120%' }}>
                        <div className="flex h-40 w-60 flex-shrink-0 items-center justify-center bg-gray-300">
                            Scroll →
                        </div>

                        <div className="flex h-40 w-60 flex-shrink-0 items-center justify-center bg-gray-300">
                            Item 1
                        </div>
                        <motion.div
                            ref={targetRef}
                            className="flex h-40 w-60 flex-shrink-0 items-center justify-center text-white"
                            style={{
                                scale,
                                opacity,
                                backgroundColor,
                            }}
                        >
                            <div className="text-center">
                                <p className="font-bold">Target Element</p>
                                {/* Use the state value instead of direct get() */}
                                <p className="text-sm">Progress: {progress}%</p>
                            </div>
                        </motion.div>

                        <div className="flex h-40 w-60 flex-shrink-0 items-center justify-center bg-gray-300">
                            Item 3
                        </div>

                        <div className="flex h-40 w-60 flex-shrink-0 items-center justify-center bg-gray-300">
                            Item 4
                        </div>

                        <div className="flex h-40 w-60 flex-shrink-0 items-center justify-center bg-gray-300">
                            Item 5
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center">Scroll horizontally to see the target element transform</div>
            </div>
        </div>
    );
}

// === PARALLAX EFFECT ===

function ParallaxExample() {
    const { scrollYProgress } = useScroll();

    // Use negative values to create proper parallax effect
    // Background moves slower than foreground
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const middleY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
    const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Parallax Effect</h2>

            {/* Parallax container */}
            <div className="relative h-[300vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Background layer (moves slowest) */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400"
                        style={{ y: backgroundY }}
                    >
                        <h2 className="text-4xl font-bold text-blue-800 opacity-50">BACKGROUND</h2>
                    </motion.div>

                    {/* Middle layer */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        style={{ y: middleY }}
                    >
                        <div className="bg-opacity-70 rounded-lg bg-blue-300 p-10 shadow-lg">
                            <h3 className="text-3xl font-semibold text-blue-900">Middle Layer</h3>
                        </div>
                    </motion.div>

                    {/* Foreground layer (moves fastest) */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-20"
                        style={{ y: foregroundY }}
                    >
                        <div className="rounded-lg bg-blue-600 p-8 text-2xl text-white shadow-xl">
                            Foreground Element
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Final message at bottom */}
            <div className="bg-gray-100 p-8 text-center">
                <h3 className="text-2xl font-bold">You've reached the end!</h3>
                <p>Scroll back up to see the parallax effect again</p>
            </div>
        </div>
    );
}

const Scroll = () => {
    return (
        <div className="h-vh space-y-16 pb-20">
            <ScrollProgressExample />
            {/* <ScrollTransformExample /> */}
            {/* <ElementScrollExample /> */}
            {/* <ScrollOffsetExample /> */}
            {/* <ScrollContainerExample /> */}
            {/* <ParallaxExample /> */}
        </div>
    );
};

export { Scroll };
