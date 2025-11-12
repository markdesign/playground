import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

// === BASIC RANGE MAPPING ===
function BasicRangeMappingExample() {
    const x = useMotionValue(0);

    // Map x from 0-200 to 0-1 for opacity
    const opacity = useTransform(x, [0, 200], [1, 0]);

    // Map x from 0-200 to 0-360 for rotation
    const rotate = useTransform(x, [0, 200], [0, 360]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Range Mapping</h2>

            <div className="mb-4">
                <p className="text-sm">Drag the slider to transform x:</p>
                <input
                    type="range"
                    min="0"
                    max="200"
                    className="w-full"
                    onChange={(e) => x.set(parseFloat(e.target.value))}
                />
            </div>

            <div className="flex gap-6">
                <motion.div className="h-24 w-24 rounded bg-blue-500" style={{ x, opacity }}>
                    <p className="p-1 text-xs text-white">Fades out</p>
                </motion.div>

                <motion.div className="h-24 w-24 rounded bg-purple-500" style={{ rotate }}>
                    <p className="p-1 text-xs text-white">Rotates</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Using useTransform to map one range to another</p>
        </div>
    );
}

// === CUSTOM TRANSFORM FUNCTION ===
function CustomTransformExample() {
    const x = useMotionValue(0);

    // Transform x using a custom function
    const scale = useTransform(x, (latest) => {
        // Sine wave transformation
        return 1 + 0.5 * Math.sin(latest / 20);
    });

    // Another custom transformation
    const borderRadius = useTransform(x, (latest) => {
        // Oscillate between 5% and 50% depending on x
        return `${5 + (Math.abs(latest % 200) / 200) * 45}%`;
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Custom Transform Function</h2>

            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max="200"
                    className="w-full"
                    onChange={(e) => x.set(parseFloat(e.target.value))}
                />
            </div>

            <div className="flex h-60 w-full flex-col items-center justify-center rounded bg-gray-100">
                <motion.div
                    className="h-32 w-32 bg-green-500"
                    style={{
                        scale,
                        borderRadius,
                    }}
                >
                    <p className="p-2 text-sm text-white">Custom transforms applied</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Apply any custom transformation function to motion values</p>
        </div>
    );
}

// === MULTIPLE INPUTS ===
function MultipleInputsExample() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Transform two motion values into one output
    const distance = useTransform([x, y], ([latestX, latestY]) => {
        return Math.sqrt(Math.pow(latestX, 2) + Math.pow(latestY, 2));
    });

    // Transform distance to opacity
    const opacity = useTransform(distance, [0, 200], [1, 0]);

    // Transform distance to background color
    const background = useTransform(
        distance,
        [0, 50, 100, 150, 200],
        ['#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#10b981'],
    );

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multiple Inputs</h2>

            <div className="mb-4 space-y-2">
                <div>
                    <p className="text-sm">X: {Math.round(x.get())}</p>
                    <input
                        type="range"
                        min="-100"
                        max="100"
                        className="w-full"
                        onChange={(e) => x.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <p className="text-sm">Y: {Math.round(y.get())}</p>
                    <input
                        type="range"
                        min="-100"
                        max="100"
                        className="w-full"
                        onChange={(e) => y.set(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <div className="flex h-40 w-full items-center justify-center rounded bg-gray-100">
                <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded-full text-white"
                    style={{
                        opacity,
                        background,
                    }}
                >
                    <div className="text-center">
                        <p className="text-sm">{Math.round(distance.get())}</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Transform multiple motion values into a single output</p>
        </div>
    );
}

// === CLAMP OPTIONS ===
function ClampOptionsExample() {
    const x = useMotionValue(0);

    // Transformation with clamp: true (default)
    const scaleClamped = useTransform(x, [0, 100], [1, 2], { clamp: true });

    // Transformation with clamp: false
    const scaleUnclamped = useTransform(x, [0, 100], [1, 2], { clamp: false });

    // Current values display
    const [currentValues, setCurrentValues] = useState({
        x: 0,
        clamped: 1,
        unclamped: 1,
    });

    // Update display values when x changes
    React.useEffect(() => {
        const unsubscribe = x.on('change', (latest) => {
            setCurrentValues({
                x: latest,
                clamped: scaleClamped.get(),
                unclamped: scaleUnclamped.get(),
            });
        });

        return unsubscribe;
    }, [x, scaleClamped, scaleUnclamped]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Clamp Options</h2>

            <div className="mb-4">
                <input
                    type="range"
                    min="-50"
                    max="150"
                    className="w-full"
                    onChange={(e) => x.set(parseFloat(e.target.value))}
                />
                <p className="mt-1 text-sm">x: {currentValues.x.toFixed(0)} (Input range: 0-100)</p>
            </div>

            <div className="flex justify-center gap-6">
                <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded bg-blue-500"
                    style={{ scale: scaleClamped }}
                >
                    <p className="text-center text-xs text-white">
                        Clamped:
                        <br />
                        {currentValues.clamped.toFixed(2)}
                    </p>
                </motion.div>

                <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded bg-green-500"
                    style={{ scale: scaleUnclamped }}
                >
                    <p className="text-center text-xs text-white">
                        Unclamped:
                        <br />
                        {currentValues.unclamped.toFixed(2)}
                    </p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Use clamp: false to allow values outside the defined range</p>
        </div>
    );
}

// === COLOR TRANSFORMATIONS ===
function ColorTransformationsExample() {
    const x = useMotionValue(0);

    // Transform to RGB color
    const backgroundColor = useTransform(
        x,
        [0, 25, 50, 75, 100],
        [
            'rgb(59, 130, 246)', // blue
            'rgb(139, 92, 246)', // purple
            'rgb(239, 68, 68)', // red
            'rgb(245, 158, 11)', // amber
            'rgb(16, 185, 129)', // emerald
        ],
    );

    // Transform to HSL with custom function
    const textColor = useTransform(x, (latest) => {
        const hue = (latest * 3.6) % 360; // 0-100 to 0-360
        return `hsl(${hue}, 100%, 90%)`;
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Color Transformations</h2>

            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full"
                    onChange={(e) => x.set(parseFloat(e.target.value))}
                />
            </div>

            <motion.div className="flex h-40 items-center justify-center rounded" style={{ backgroundColor }}>
                <motion.h2 className="text-2xl font-bold" style={{ color: textColor }}>
                    Color Transforms
                </motion.h2>
            </motion.div>

            <p className="mt-2 text-sm text-gray-600">Transform motion values to color values (RGB, HSL, etc.)</p>
        </div>
    );
}

// === COMPLEX TRANSFORMATIONS ===
function ComplexTransformationsExample() {
    const x = useMotionValue(50);

    // First transformation: map x (0-100) to rotation (0-360)
    const rotate = useTransform(x, [0, 100], [0, 360]);

    // Second transformation: map x (0-100) to inverted scale (1-0.5)
    const scale = useTransform(x, [0, 100], [1, 0.5]);

    // Third transformation: map x (0-100) to shadow blur (0-20)
    const shadowBlur = useTransform(x, [0, 100], [0, 20]);

    // Combine transformations for shadow
    const boxShadow = useTransform([x, shadowBlur], ([latestX, latestBlur]) => {
        const shadowX = latestX / 5;
        const shadowY = latestX / 10;
        return `${shadowX}px ${shadowY}px ${latestBlur}px rgba(0, 0, 0, 0.2)`;
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Complex Transformations</h2>

            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={x.get()}
                    className="w-full"
                    onChange={(e) => x.set(parseFloat(e.target.value))}
                />
            </div>

            <div className="flex h-60 items-center justify-center rounded bg-gray-100">
                <motion.div
                    className="flex h-32 w-32 items-center justify-center rounded bg-indigo-500 text-white"
                    style={{
                        rotate,
                        scale,
                        boxShadow,
                    }}
                >
                    <div className="text-center">
                        <p>Multiple</p>
                        <p>Transforms</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Chain and combine multiple transformations</p>
        </div>
    );
}

// === KEYFRAMES TRANSFORMATION ===
function KeyframesTransformationExample() {
    const progress = useMotionValue(0);

    // Transform progress to multiple properties
    const y = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, -100, 0, -100, 0]);
    const scale = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [1, 1.5, 1, 0.5, 1]);
    const rotate = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, 180, 0, 180, 360]);
    const background = useTransform(
        progress,
        [0, 0.25, 0.5, 0.75, 1],
        ['#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#3b82f6'],
    );

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Keyframes Transformation</h2>

            <div className="mb-4">
                <p className="mb-1 text-sm">Animation progress:</p>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    className="w-full"
                    onChange={(e) => progress.set(parseFloat(e.target.value))}
                />
            </div>

            <div className="relative h-60 rounded bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="flex h-24 w-24 items-center justify-center rounded text-white"
                        style={{
                            y,
                            scale,
                            rotate,
                            background,
                        }}
                    >
                        <p className="text-center">Keyframes</p>
                    </motion.div>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Create keyframe-based animations using multiple points</p>
        </div>
    );
}

// === TEXT FORMATTING ===
function TextFormattingExample() {
    const value = useMotionValue(0);

    // Format as currency
    const formattedCurrency = useTransform(value, (latest) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(latest);
    });

    // Format as percentage
    const formattedPercent = useTransform(value, (latest) => {
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        }).format(latest / 100);
    });

    // Format with suffix
    const formattedWithSuffix = useTransform(value, (latest) => {
        if (latest < 1000) return `${latest.toFixed(0)} views`;
        return `${(latest / 1000).toFixed(1)}K views`;
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Text Formatting</h2>

            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    className="w-full"
                    onChange={(e) => value.set(parseFloat(e.target.value))}
                />
            </div>

            <div className="space-y-4 rounded bg-gray-100 p-6">
                <div>
                    <p className="text-sm text-gray-600">Currency:</p>
                    <motion.p className="text-xl font-bold">{formattedCurrency}</motion.p>
                </div>

                <div>
                    <p className="text-sm text-gray-600">Percentage:</p>
                    <motion.p className="text-xl font-bold">{formattedPercent}</motion.p>
                </div>

                <div>
                    <p className="text-sm text-gray-600">With suffix:</p>
                    <motion.p className="text-xl font-bold">{formattedWithSuffix}</motion.p>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Format values into readable text with useTransform</p>
        </div>
    );
}

const UseTransformExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicRangeMappingExample />
            <CustomTransformExample />
            <MultipleInputsExample />
            <ClampOptionsExample />
            <ColorTransformationsExample />
            <ComplexTransformationsExample />
            <KeyframesTransformationExample />
            <TextFormattingExample />
        </div>
    );
};

export { UseTransformExamples };
