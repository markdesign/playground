import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

// === BASIC SCROLL TRACKING ===
function BasicScrollExample() {
    const { scrollYProgress } = useScroll();

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Scroll Tracking</h2>

            {/* Progress bar that grows as page scrolls */}
            <motion.div
                className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-red-500"
                style={{ scaleX: scrollYProgress }}
            />

            <div className="space-y-20">
                <div className="flex h-screen items-center justify-center bg-gray-100">
                    <p>Scroll down</p>
                </div>
                <div className="flex h-screen items-center justify-center bg-gray-200">
                    <p>Keep scrolling</p>
                </div>
            </div>
        </div>
    );
}

// === CONTAINER SCROLL ===
function ContainerScrollExample() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const [progress, setProgress] = useState(0);

    // Properly track the progress value for display
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        setProgress(Math.round(latest * 100));
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Container Scroll</h2>
            <p className="mb-2">Progress: {progress}%</p>

            <div className="relative">
                <motion.div
                    className="absolute top-0 right-0 left-0 z-10 h-1 origin-left bg-blue-500"
                    style={{ scaleX: scrollYProgress }}
                />

                <div ref={containerRef} className="h-80 overflow-y-scroll rounded border border-gray-300">
                    <div className="space-y-8 p-4">
                        <div className="flex h-64 items-center justify-center bg-gray-100">Section 1</div>
                        <div className="flex h-64 items-center justify-center bg-gray-200">Section 2</div>
                        <div className="flex h-64 items-center justify-center bg-gray-300">Section 3</div>
                    </div>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Track scrolling within a specific container</p>
        </div>
    );
}

// === ELEMENT SCROLL TRACKING ===
function ElementScrollExample() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    const [progress, setProgress] = useState(0);

    // Properly track progress for display
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        setProgress(Math.round(latest * 100));
    });

    // Scale increases as element comes into view, peaks when centered
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Element Scroll Tracking</h2>

            <div className="space-y-20">
                <div className="flex h-60 items-center justify-center bg-gray-100">
                    <p>Scroll down to the purple box</p>
                </div>

                <motion.div
                    ref={targetRef}
                    style={{
                        scale,
                        opacity,
                    }}
                    className="flex h-40 items-center justify-center rounded-lg bg-purple-500 text-white"
                >
                    <div className="text-center">
                        <p>This element animates based on its position</p>
                        <p className="mt-2 text-sm">Scroll progress: {progress}%</p>
                    </div>
                </motion.div>

                <div className="flex h-60 items-center justify-center bg-gray-100">
                    <p>Keep scrolling</p>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Track element's position relative to viewport</p>
        </div>
    );
}

// === OFFSET EXAMPLE ===
function OffsetExample() {
    const targetRef = useRef(null);

    // Custom offset - animation starts and ends at specific points
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const background = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ['#ff0055', '#0099ff', '#22cc88', '#ffaa00', '#ff0055'],
    );

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Custom Offset</h2>

            <div className="mb-4">
                <code className="rounded bg-gray-100 p-1 text-sm">offset: ["start start", "end end"]</code>
                <p className="mt-1 text-sm">Animation runs precisely while element is in viewport</p>
            </div>

            <div ref={targetRef} className="space-y-4">
                <motion.div
                    style={{
                        rotate,
                        background,
                    }}
                    className="mx-auto flex h-40 w-40 items-center justify-center rounded-lg"
                >
                    <p className="font-bold text-white">Scroll to animate</p>
                </motion.div>

                <div className="h-[50vh]" />
            </div>
        </div>
    );
}

// === AVAILABLE VALUES EXAMPLE ===
function AvailableValuesExample() {
    const { scrollY, scrollYProgress } = useScroll();
    const [values, setValues] = useState({ y: 0, progress: 0 });

    // Track both values
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setValues((prev) => ({ ...prev, y: Math.round(latest) }));
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        setValues((prev) => ({ ...prev, progress: Math.round(latest * 100) }));
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Available Values</h2>

            <div className="fixed top-4 right-4 z-50 rounded bg-white p-4 shadow-lg">
                <p className="font-mono">scrollY: {values.y}px</p>
                <p className="font-mono">scrollYProgress: {values.progress}%</p>
            </div>

            <div className="space-y-20">
                <div className="flex h-screen items-center justify-center bg-gray-100">
                    <p>Scroll down to see values change</p>
                </div>
                <div className="h-screen"></div>
            </div>
        </div>
    );
}

// === CONTAINER + TARGET EXAMPLE ===
function ContainerTargetExample() {
    const containerRef = useRef(null);
    const targetRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const { scrollXProgress } = useScroll({
        container: containerRef,
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    useMotionValueEvent(scrollXProgress, 'change', (latest) => {
        setProgress(Math.round(latest * 100));
    });

    const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Container + Target</h2>

            <div className="mb-2">
                <p>Progress: {progress}%</p>
                <motion.div className="h-1 origin-left bg-green-500" style={{ scaleX: scrollXProgress }} />
            </div>

            <div ref={containerRef} className="w-full overflow-x-scroll" style={{ scrollbarWidth: 'none' }}>
                <div className="flex items-center py-8" style={{ width: '200vw' }}>
                    <div className="flex w-screen items-center justify-center">
                        <div className="text-center">
                            Scroll right →<br />
                            <span className="text-sm text-gray-500">(Horizontal scrolling)</span>
                        </div>
                    </div>

                    <div className="flex w-screen items-center justify-center">
                        <motion.div
                            ref={targetRef}
                            style={{ scale }}
                            className="flex h-40 w-40 items-center justify-center rounded-lg bg-green-500 text-white"
                        >
                            Target Element
                        </motion.div>
                    </div>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Track target element within scrollable container</p>
        </div>
    );
}

function UseScrollExamples() {
    return (
        <div className="">
            {/* <BasicScrollExample /> */}
            {/* <ContainerScrollExample /> */}
            {/* <ElementScrollExample /> */}
            {/* <OffsetExample /> */}
            {/* <AvailableValuesExample /> */}
            <ContainerTargetExample />
        </div>
    );
}

export { UseScrollExamples };
