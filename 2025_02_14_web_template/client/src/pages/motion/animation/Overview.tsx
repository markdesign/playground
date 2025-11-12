import React, { useState } from 'react';
import {
    motion,
    AnimatePresence,
    useAnimationControls,
    useTransform,
    useScroll,
    LayoutGroup,
    useAnimate,
} from 'motion/react';

// === BASIC MOTION COMPONENT ===
function SimpleAnimation() {
    // Simple animation
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Motion</h2>
            <motion.div
                className="h-30 w-30 bg-blue-400 p-4"
                initial={{
                    opacity: 0,
                    x: 200,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
                transition={{ delay: 1, duration: 2 }}
            >
                Simple animation
            </motion.div>
        </div>
    );
}

// === ANIMATION VARIANTS ===
function AnimationVariants() {
    const variants = {
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0, transition: { delay: 1, duration: 2 } },
    };
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animation Variants</h2>
            <motion.div className="h-30 w-30 bg-green-400 p-4" initial="hidden" animate="visible" variants={variants}>
                Animation variants
            </motion.div>
        </div>
    );
}

// === TRANSITION OPTIONS ==='

function EasingTransition() {
    // Default transition (easing)
    return (
        <motion.div
            className="h-30 w-30 bg-purple-400 p-4"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 2 }}
        >
            Easing transition
        </motion.div>
    );
}

// type decides the type of animation to use. It can be "tween", "spring" or "inertia".
// also, "keyframes" and "just"

// 1. Spring animations are either physics-based or duration-based.
// Creates natural, bouncy motion that simulates spring physics.
function SpringPhysics() {
    // Spring physics
    return (
        <motion.div
            className="h-30 w-30 bg-yellow-400 p-4"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: 1,
                // duration: this does not work in Spring!!!,
                type: 'spring',
                stiffness: 300, // Higher = more rigid spring
                damping: 20, // Lower = more bounce
                mass: 1, // Higher = more inertia
                velocity: 0, // Initial velocity
            }}
        >
            Spring physics
        </motion.div>
    );
}

// 2. Tween animations are set with a duration and an easing curve.
// These are the available easing function names:
// "linear"
// "easeIn", "easeOut", "easeInOut"
// "circIn", "circOut", "circInOut"
// "backIn", "backOut", "backInOut"
// "anticipate"
// Standard keyframe animation with easing functions.
function TweenEasing() {
    // Tween with easing
    return (
        <motion.div
            className="h-30 w-30 bg-red-400 p-4"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: 1,
                duration: 2,
                type: 'tween',
                ease: 'easeInOut', // or 'linear', 'easeIn', 'easeOut', etc.
            }}
        >
            Tween with easing
        </motion.div>
    );
}

// 3. inertia
// Physics-based animation simulating momentum and deceleration, great for swipe gestures.

// 4. keyframes
// For animating through a series of values with custom timing.

// 5. just
// transition={{
//     type: 'just'
// }}
// Immediately sets to target value with no animation.

// === GESTURES ===
function HoverAnimation() {
    // Hover animations
    return (
        <motion.div className="h-30 w-30 bg-indigo-400 p-4" whileHover={{ scale: 1.1 }}>
            Hover to scale
        </motion.div>
    );
}

function TapAnimation() {
    // Tap/click animations
    return (
        <motion.div className="h-30 w-30 bg-pink-400 p-4" whileTap={{ scale: 0.95 }}>
            Tap to scale down
        </motion.div>
    );
}

// === DRAG ===
function BasicDrag() {
    // Basic dragging
    return (
        <motion.div className="h-30 w-30 bg-teal-400 p-4" drag>
            Drag me
        </motion.div>
    );
}

function ConstrainedDrag() {
    // Constrained drag
    return (
        <motion.div
            className="h-30 w-30 bg-orange-400 p-4"
            drag
            dragConstraints={{ top: 0, left: 0, right: 100, bottom: 100 }}
        >
            Constrained drag
        </motion.div>
    );
}

function ElasticDrag() {
    // Drag elastic
    return (
        <motion.div
            className="h-30 w-30 bg-gray-400 p-4"
            drag
            dragElastic={0.5} // 0-1 for resistance
        >
            Elastic drag
        </motion.div>
    );
}

// === SCROLL ANIMATIONS ===
function ScrollAnimation() {
    // Animate when element comes into view
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Scroll Animation</h2>
            <motion.div
                className="h-30 w-30 bg-emerald-400 p-4"
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} // Only animate once
            >
                Scroll into view
            </motion.div>
        </div>
    );
}

// === KEYFRAMES ===
function KeyframeAnimation() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Keyframe Animation</h2>
            <motion.div
                className="h-30 w-30 bg-cyan-400 p-4"
                animate={{
                    opacity: [1, 0, 1],
                    x: [0, 200, 0],
                    backgroundColor: ['#ff0000', '#00ff00', '#0000ff'],
                }}
            >
                Keyframe animation
            </motion.div>
        </div>
    );
}

// === EXIT ANIMATIONS (with AnimatePresence) ===
function ExitAnimation() {
    const [isVisible, setIsVisible] = useState(true);

    // Component with exit animation
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Exit Animation</h2>
            <div>
                <button
                    className="mb-2 rounded bg-violet-500 px-3 py-1 text-white"
                    onClick={() => setIsVisible(!isVisible)}
                >
                    {isVisible ? 'Hide' : 'Show'}
                </button>

                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            className="h-30 w-30 bg-violet-400 p-4"
                            initial={{ opacity: 0, x: 200 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 200 }}
                        >
                            Exit animation
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// === LAYOUT ANIMATIONS ===
function LayoutAnimation() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Layout Animation</h2>
            <motion.div
                className="relative cursor-pointer bg-amber-400 p-4"
                layout
                onClick={() => setExpanded(!expanded)}
                animate={{
                    height: expanded ? 200 : 100,
                    width: expanded ? 200 : 100,
                }}
                // use style when you want simple, default, static or non animated, and state or dynamic vales from hoks or state.
                // style={{
                //     height: expanded ? 200 : 100,
                //     width: expanded ? 200 : 100,
                // }}
            >
                {/* Use a nested motion.div to prevent text from getting stretched */}
                <motion.div layout>Layout animation</motion.div>
            </motion.div>
        </div>
    );
}

// === STAGGERED ANIMATIONS ===
function StaggeredAnimation() {
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 1,
            },
        },
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            x: 200,
        },
        visible: {
            opacity: 1,
            x: 0,
        },
    };
    const items = ['A', 'B', 'C'];
    // With variants + children
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Staggered Animation</h2>
            <motion.ul className="flex gap-2" variants={containerVariants} initial="hidden" animate="visible">
                {items.map((item) => (
                    <motion.li
                        key={item}
                        className="flex h-20 w-20 items-center justify-center bg-lime-400 p-4"
                        variants={itemVariants}
                    >
                        Item {item}
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}

// === ANIMATION CONTROLS ===
// This is Deprecated. Use useAnimate instead
function ControlledAnimation() {
    // This is Deprecated. Use useAnimate instead
    const controls = useAnimationControls();
    function goRight() {
        controls.start({ x: 200 });
    }
    function goLeft() {
        controls.start({ x: 0 });
    }
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Controlled Animation</h2>
            <div className="mb-4 flex gap-2">
                <button className="rounded bg-gray-500 px-3 py-1 text-white" onClick={goRight}>
                    Move right
                </button>
                <button className="rounded bg-gray-500 px-3 py-1 text-white" onClick={goLeft}>
                    Move to back
                </button>
            </div>
            <motion.div className="h-30 w-30 bg-fuchsia-400 p-4" animate={controls}>
                Controlled animation
            </motion.div>
        </div>
    );
    // This is Deprecated. Use useAnimate instead
}

function ControlledAnimationUpdated() {
    const [scope, animate] = useAnimate();
    function goRight() {
        animate(scope.current, { x: 200 });
    }
    function goLeft() {
        animate(scope.current, { x: 0 });
    }
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Controlled Animation</h2>
            <div className="mb-4 flex gap-2">
                <button className="rounded bg-gray-500 px-3 py-1 text-white" onClick={goRight}>
                    Move right
                </button>
                <button className="rounded bg-gray-500 px-3 py-1 text-white" onClick={goLeft}>
                    Move to back
                </button>
            </div>
            <div ref={scope}>
                <div className="h-30 w-30 bg-fuchsia-400 p-4">Controlled animation</div>
            </div>
        </div>
    );
}

// === VALUE-BASED ANIMATIONS ===
function ScrollProgressIndicator() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Scroll Progress Indicator</h2>
            <p className="text-sm">see top right corner</p>
            <motion.div className="fixed top-4 right-4 h-30 w-30 bg-rose-400 p-4" style={{ opacity }}>
                Scroll indicator
            </motion.div>
        </div>
    );
}

// === ANIMATE FROM STATE ===
function AnimateFromState() {
    const [position, setPosition] = useState(0);
    function goRight() {
        setPosition(position + 50);
    }
    function goLeft() {
        setPosition(0);
    }
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animate From State</h2>
            <div>
                <div className="mb-4 flex gap-2">
                    <button className="rounded bg-sky-500 px-3 py-1 text-white" onClick={goRight}>
                        position + 50
                    </button>
                    <button className="rounded bg-gray-500 px-3 py-1 text-white" onClick={goLeft}>
                        position back to 0
                    </button>
                </div>
                <motion.div
                    className="h-30 w-30 bg-sky-400 p-4"
                    initial={false} // Don't animate on mount
                    animate={{ x: position }}
                >
                    Animate from current state
                </motion.div>
            </div>
        </div>
    );
}

// === SHARED LAYOUT ANIMATIONS ===
function SharedLayoutAnimation() {
    const [isFirstContainer, setIsFirstContainer] = useState(true);

    function handleClick(value: boolean) {
        setIsFirstContainer(value);
    }

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Shared Layout Animation</h2>
            <LayoutGroup>
                <div className="flex gap-8">
                    <div className="relative h-40 w-40 bg-gray-200">
                        {isFirstContainer && (
                            <motion.div
                                layoutId="shared-element"
                                className="absolute inset-0 z-10 m-auto h-20 w-20 cursor-pointer bg-blue-500"
                                onClick={() => handleClick(false)}
                            >
                                Click me
                            </motion.div>
                        )}
                    </div>
                    <div className="relative h-40 w-40 bg-gray-200">
                        {!isFirstContainer && (
                            <motion.div
                                layoutId="shared-element"
                                className="absolute inset-0 z-10 m-auto h-20 w-20 cursor-pointer bg-blue-500"
                                onClick={() => handleClick(true)}
                            >
                                Click me
                            </motion.div>
                        )}
                    </div>
                </div>
            </LayoutGroup>
        </div>
    );
}

const Overview = () => {
    return (
        <div className="space-y-12 p-10">
            {/* <SimpleAnimation /> */}
            {/* <AnimationVariants /> */}
            {/* <div>
                <h2 className="mb-2 text-lg font-bold">Transition Types</h2>
                <EasingTransition />
                <SpringPhysics />
                <TweenEasing />
            </div> */}
            {/* <div>
                <h2 className="mb-2 text-lg font-bold">Gestures</h2>
                <HoverAnimation />
                <TapAnimation />
            </div> */}
            {/* <div>
                <h2 className="mb-2 text-lg font-bold">Drag</h2>
                <BasicDrag />
                <ConstrainedDrag />
                <ElasticDrag />
            </div> */}
            {/* <ScrollAnimation /> */}
            {/* <KeyframeAnimation /> */}
            {/* <ExitAnimation /> */}
            {/* <LayoutAnimation /> */}
            {/* <StaggeredAnimation /> */}
            <ControlledAnimationUpdated />
            {/* <ScrollProgressIndicator /> */}
            {/* <AnimateFromState /> */}
            {/* <SharedLayoutAnimation /> */}
        </div>
    );
};

export { Overview };
