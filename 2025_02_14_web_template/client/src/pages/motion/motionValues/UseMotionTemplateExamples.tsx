import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate, MotionValue } from 'motion/react';

// === BASIC TEMPLATE ===
function BasicTemplateExample() {
    const x = useMotionValue(0);

    // Create a template string with a motion value
    const translateX = useMotionTemplate`translateX(${x}px)`;

    const handleMove = () => {
        x.set(x.get() === 0 ? 100 : 0);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Motion Template</h2>

            <button onClick={handleMove} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Move Box
            </button>

            <motion.div className="h-20 w-20 rounded bg-blue-500" style={{ transform: translateX }}>
                <p className="p-1 text-xs text-white">translateX</p>
            </motion.div>

            <p className="mt-2 text-sm text-gray-600">Using useMotionTemplate to create CSS transform string</p>
        </div>
    );
}

// === CSS GRADIENT TEMPLATE ===
function GradientTemplateExample() {
    const progress = useMotionValue(0);

    // Create a gradient with motion value
    const background = useMotionTemplate`linear-gradient(90deg, #3b82f6 ${progress}%, #f59e0b ${progress}%)`;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">CSS Gradient Template</h2>

            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="0"
                    className="w-full"
                    onChange={(e) => progress.set(parseFloat(e.target.value))}
                />
            </div>

            <motion.div className="h-20 w-full rounded" style={{ background }} />

            <p className="mt-2 text-sm text-gray-600">Creating dynamic CSS gradients with useMotionTemplate</p>
        </div>
    );
}

// === MULTIPLE MOTION VALUES ===
function MultipleValuesExample() {
    const x = useMotionValue(50);
    const y = useMotionValue(50);
    const blur = useMotionValue(5);

    // Combine multiple motion values in one template
    const boxShadow = useMotionTemplate`${x}px ${y}px ${blur}px rgba(59, 130, 246, 0.5)`;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multiple Motion Values</h2>

            <div className="mb-4 space-y-2">
                <div>
                    <label className="text-sm">X offset: {x.get()}px</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-full"
                        onChange={(e) => x.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm">Y offset: {y.get()}px</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-full"
                        onChange={(e) => y.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm">Blur: {blur.get()}px</label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        defaultValue="5"
                        className="w-full"
                        onChange={(e) => blur.set(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <div className="flex h-40 justify-center bg-gray-100 p-8">
                <motion.div className="h-24 w-24 rounded-lg bg-white" style={{ boxShadow }} />
            </div>

            <p className="mt-2 text-sm text-gray-600">Combining multiple motion values in one template</p>
        </div>
    );
}

// === COMPLEX TRANSFORM ===
function ComplexTransformExample() {
    const rotate = useMotionValue(0);
    const scale = useMotionValue(1);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Complex transform with multiple operations
    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Complex Transform</h2>

            <div className="mb-4 space-y-2">
                <div>
                    <label className="text-sm">Rotate: {rotate.get()}°</label>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        defaultValue="0"
                        className="w-full"
                        onChange={(e) => rotate.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm">Scale: {scale.get()}</label>
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        defaultValue="1"
                        className="w-full"
                        onChange={(e) => scale.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm">X: {x.get()}px</label>
                    <input
                        type="range"
                        min="-50"
                        max="50"
                        defaultValue="0"
                        className="w-full"
                        onChange={(e) => x.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm">Y: {y.get()}px</label>
                    <input
                        type="range"
                        min="-50"
                        max="50"
                        defaultValue="0"
                        className="w-full"
                        onChange={(e) => y.set(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <div className="flex h-60 items-center justify-center bg-gray-100">
                <motion.div
                    className="flex h-32 w-32 items-center justify-center rounded bg-purple-500 text-center text-white"
                    style={{ transform }}
                >
                    Complex transform
                </motion.div>
            </div>
        </div>
    );
}

// === CSS FILTER TEMPLATE ===
function FilterTemplateExample() {
    const blur = useMotionValue(0);
    const hue = useMotionValue(0);

    // Create a filter template
    const filter = useMotionTemplate`blur(${blur}px) hue-rotate(${hue}deg)`;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">CSS Filter Template</h2>

            <div className="mb-4 space-y-2">
                <div>
                    <label className="text-sm">Blur: {blur.get()}px</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        defaultValue="0"
                        className="w-full"
                        onChange={(e) => blur.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm">Hue Rotate: {hue.get()}°</label>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        defaultValue="0"
                        className="w-full"
                        onChange={(e) => hue.set(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <motion.img
                src="https://picsum.photos/id/1/800/400"
                alt="Sample image"
                className="h-auto w-full rounded"
                style={{ filter }}
            />

            <p className="mt-2 text-sm text-gray-600">Dynamic CSS filters with useMotionTemplate</p>
        </div>
    );
}

// === CSS VARIABLES TEMPLATE ===
function CSSVariablesExample() {
    const hue = useMotionValue(210);
    const saturation = useMotionValue(100);
    const lightness = useMotionValue(50);

    // Create CSS variables
    const colorProperties = useMotionTemplate`${hue} ${saturation}% ${lightness}%`;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">CSS Variables</h2>

            <div className="mb-4 space-y-2">
                <div>
                    <label className="text-sm">Hue: {hue.get()}</label>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        defaultValue="210"
                        className="w-full"
                        onChange={(e) => hue.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm">Saturation: {saturation.get()}%</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="100"
                        className="w-full"
                        onChange={(e) => saturation.set(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label className="text-sm">Lightness: {lightness.get()}%</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-full"
                        onChange={(e) => lightness.set(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <motion.div
                className="h-20 w-full rounded"
                style={
                    {
                        '--color': colorProperties,
                        backgroundColor: 'hsl(var(--color))',
                    } as any
                }
            />

            <p className="mt-2 text-sm text-gray-600">Using useMotionTemplate with CSS variables</p>
        </div>
    );
}

// === COMBINED WITH TRANSFORM ===
function CombinedWithTransformExample() {
    const x = useMotionValue(0);

    // Transform x to multiple values
    const opacity = useTransform(x, [-100, 0, 100], [0.3, 1, 0.3]);
    const rotate = useTransform(x, [-100, 0, 100], [-45, 0, 45]);

    // Create a complex style template
    const boxShadow = useMotionTemplate`0 ${x}px 20px rgba(0, 0, 0, 0.2)`;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Combined with useTransform</h2>

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

            <div className="flex h-60 items-center justify-center bg-gray-100">
                <motion.div
                    className="flex h-32 w-32 items-center justify-center rounded bg-green-500 text-white"
                    style={{
                        x,
                        opacity,
                        rotate,
                        boxShadow,
                    }}
                >
                    <p className="text-center text-sm">Multiple effects</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Combining useTransform with useMotionTemplate</p>
        </div>
    );
}

const UseMotionTemplateExamples = () => {
    return (
        <div className="flex flex-col m-10">
            <BasicTemplateExample />
            {/* <GradientTemplateExample /> */}
            {/* <MultipleValuesExample /> */}
            {/* <ComplexTransformExample /> */}
            {/* <FilterTemplateExample /> */}
            {/* <CSSVariablesExample /> */}
            {/* <CombinedWithTransformExample /> */}
        </div>
    );
};

export { UseMotionTemplateExamples };
