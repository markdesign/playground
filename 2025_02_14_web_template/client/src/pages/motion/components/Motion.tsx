import React, { useState } from 'react';
import { motion } from 'motion/react';

// === BASIC MOTION COMPONENT ===
function BasicMotionExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Motion Component</h2>
            <motion.div
                className="h-20 w-20 rounded bg-blue-500"
                animate={{
                    x: 100,
                    backgroundColor: '#ec4899',
                    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.2)',
                }}
            />
        </div>
    );
}

// === INITIAL, ANIMATE AND EXIT ===
function AnimateStatesExample() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Initial, Animate, and Exit</h2>
            <button onClick={() => setIsVisible(!isVisible)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isVisible ? 'Hide' : 'Show'}
            </button>

            <div className="relative h-32">
                {isVisible && (
                    <motion.div
                        className="absolute h-20 w-20 rounded-lg bg-green-500"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </div>
        </div>
    );
}

// === TRANSITION PROPERTIES ===
function TransitionPropertiesExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Transition Properties</h2>
            <div className="space-y-4">
                <motion.div
                    className="h-20 w-20 rounded bg-purple-500"
                    animate={{ x: 100 }}
                    transition={{
                        duration: 2,
                        ease: 'easeInOut',
                    }}
                >
                    <p className="p-1 text-xs text-white">ease: easeInOut</p>
                </motion.div>

                <motion.div
                    className="h-20 w-20 rounded bg-indigo-500"
                    animate={{ x: 100 }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 10,
                    }}
                >
                    <p className="p-1 text-xs text-white">spring physics</p>
                </motion.div>

                <motion.div
                    className="h-20 w-20 rounded bg-pink-500"
                    animate={{ x: 100 }}
                    transition={{
                        type: 'tween',
                        ease: 'circIn',
                        duration: 2,
                    }}
                >
                    <p className="p-1 text-xs text-white">tween: circIn</p>
                </motion.div>
            </div>
        </div>
    );
}

// === KEYFRAMES ANIMATION ===
function KeyframesExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Keyframes Animation</h2>
            <motion.div
                className="h-20 w-20 rounded-full bg-amber-500"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, -50, 0],
                    backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6', '#f59e0b'],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 4,
                    ease: 'easeInOut',
                    times: [0, 0.3, 0.7, 1],
                    repeat: Infinity,
                    repeatDelay: 0.5,
                }}
            />
        </div>
    );
}

// === VARIANTS EXAMPLE ===
function VariantsExample() {
    const [isOpen, setIsOpen] = useState(false);

    // Define reusable animation states as variants
    const variants = {
        closed: {
            opacity: 0.5,
            y: 50,
            scale: 0.9,
        },
        open: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Variants</h2>
            <button onClick={() => setIsOpen(!isOpen)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isOpen ? 'Close' : 'Open'}
            </button>

            <motion.div
                className="h-24 w-40 rounded bg-emerald-500 p-4 text-white"
                variants={variants}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                transition={{ duration: 0.5 }}
            >
                Using variants
            </motion.div>
        </div>
    );
}

// === GESTURE ANIMATIONS ===
function GestureAnimationsExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Gesture Animations</h2>
            <div className="flex gap-4">
                <motion.div
                    className="flex h-24 w-24 items-center justify-center rounded bg-rose-500 text-white"
                    whileHover={{
                        scale: 1.1,
                        rotate: 5,
                    }}
                    whileTap={{
                        scale: 0.95,
                        backgroundColor: '#f97316',
                    }}
                    transition={{ duration: 0.2 }}
                >
                    Hover & Tap Me
                </motion.div>

                <motion.div
                    className="flex h-24 w-24 cursor-grab items-center justify-center rounded bg-blue-500 text-white"
                    drag
                    dragConstraints={{
                        top: -50,
                        left: -50,
                        right: 50,
                        bottom: 50,
                    }}
                    whileDrag={{ scale: 1.1 }}
                >
                    Drag Me
                </motion.div>
            </div>
        </div>
    );
}

// === MOTION VALUES AND DYNAMIC PROPS ===
function DynamicPropsExample() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Dynamic Props</h2>
            <button onClick={() => setCount(count + 1)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Click to increment: {count}
            </button>

            <motion.div
                className="flex h-20 items-center justify-center rounded bg-violet-500 text-white"
                animate={{
                    width: 100 + count * 20,
                    backgroundColor: count % 2 === 0 ? '#8b5cf6' : '#ec4899',
                }}
                transition={{ type: 'spring' }}
            >
                Width changes with count
            </motion.div>
        </div>
    );
}

// === SVG ANIMATION ===
function SVGAnimationExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">SVG Animation</h2>
            <motion.svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
                <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                    cx="100"
                    cy="100"
                    r="40"
                    fill="#ef4444"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.svg>
        </div>
    );
}

// === LAYOUT ANIMATIONS ===
function LayoutAnimationsExample() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Layout Animations</h2>
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    className={`cursor-pointer rounded bg-orange-500 p-4 text-white ${
                        isExpanded ? 'col-span-2' : 'col-span-1'
                    }`}
                    layout
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <h3 className="font-bold">Click me</h3>
                    {isExpanded && (
                        <p className="mt-2">This element smoothly animates its size and position changes.</p>
                    )}
                </motion.div>

                <motion.div className="col-span-1 rounded bg-teal-500 p-4 text-white" layout>
                    Other content
                </motion.div>
            </div>
        </div>
    );
}

const Motion = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicMotionExample />
            {/* <AnimateStatesExample /> */}
            {/* <TransitionPropertiesExample /> */}
            {/* <KeyframesExample /> */}
            {/* <VariantsExample /> */}
            {/* <GestureAnimationsExample /> */}
            {/* <DynamicPropsExample /> */}
            {/* <SVGAnimationExample /> */}
            {/* <LayoutAnimationsExample /> */}
        </div>
    );
};

export { Motion };
