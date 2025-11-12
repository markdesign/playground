import React, { useState } from 'react';
import { motion } from 'motion/react';

// === BASIC DRAG ===
function DragExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Drag</h2>
            <motion.div className="h-30 w-30 cursor-grab bg-blue-400 p-4" drag whileDrag={{ scale: 1.1 }}>
                Basic drag
            </motion.div>
        </div>
    );
}

// === DRAG CONSTRAINTS ===
function DragConstraintsExample() {
    return (
        <div className="relative p-8">
            <motion.div
                className="h-30 w-30 cursor-grab bg-green-400 p-4"
                drag
                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            >
                Constrained drag
            </motion.div>
        </div>
    );
}

// === DRAG TO REF CONTAINER ===
function DragToRefExample() {
    const constraintsRef = React.useRef(null);

    return (
        <div className="h-60 w-full border-2 border-dashed border-gray-300 p-4" ref={constraintsRef}>
            <motion.div className="h-30 w-30 cursor-grab bg-yellow-400 p-4" drag dragConstraints={constraintsRef}>
                Constrained to parent
            </motion.div>
        </div>
    );
}

// === DRAG WITH ELASTICITY ===
function DragElasticExample() {
    return (
        <motion.div
            className="h-30 w-30 cursor-grab bg-purple-400 p-4"
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.2} // 0-1 scale where 0 = no elasticity
        >
            Elastic drag
        </motion.div>
    );
}

// === DRAG WITHOUT MOMENTUM ===
function DragNoMomentumExample() {
    return (
        <motion.div
            className="h-30 w-30 cursor-grab bg-red-400 p-4"
            drag
            dragMomentum={false} // No inertia after releasing
        >
            No momentum
        </motion.div>
    );
}

// === NESTED DRAGGABLE ELEMENTS ===
function DragPropagationExample() {
    return (
        <motion.div className="flex h-60 w-60 cursor-grab items-center justify-center bg-blue-200 p-4" drag>
            <motion.div
                className="h-30 w-30 cursor-grab bg-blue-400 p-4"
                drag
                dragPropagation // This allows both elements to receive drag gestures
            >
                Nested draggable
            </motion.div>
        </motion.div>
    );
}

// === TAP GESTURE ===
function TapExample() {
    const [tapped, setTapped] = useState(false);

    return (
        <motion.div
            className={`h-30 w-30 p-4 ${tapped ? 'bg-green-400' : 'bg-red-400'}`}
            onTap={() => setTapped(!tapped)}
            whileTap={{ scale: 0.9 }}
        >
            Tap me
        </motion.div>
    );
}

// === HOVER GESTURE ===
function HoverExample() {
    return (
        <motion.div className="h-30 w-30 bg-orange-400 p-4" whileHover={{ scale: 1.2, rotate: 5 }}>
            Hover me
        </motion.div>
    );
}

// === POINTER EVENTS ===
function PointerEventsExample() {
    const [status, setStatus] = useState('Waiting');

    return (
        <motion.div
            className="h-30 w-30 bg-indigo-400 p-4"
            onPointerDown={() => setStatus('Pointer down')}
            onPointerUp={() => setStatus('Pointer up')}
        >
            {status}
        </motion.div>
    );
}

const Gestures = () => {
    return (
        <div className="space-y-12 p-6">
            <DragExample />

            <div>
                <h2 className="mb-2 text-lg font-bold">Drag Constraints</h2>
                <div className="space-y-4">
                    <DragConstraintsExample />
                    <DragToRefExample />
                </div>
            </div>

            <div>
                <h2 className="mb-2 text-lg font-bold">Drag Behavior</h2>
                <div className="space-y-4">
                    <DragElasticExample />
                    <DragNoMomentumExample />
                    <DragPropagationExample />
                </div>
            </div>

            <div>
                <h2 className="mb-2 text-lg font-bold">Gestures</h2>
                <div className="space-y-4">
                    <TapExample />
                    <HoverExample />
                    <PointerEventsExample />
                </div>
            </div>
        </div>
    );
};

export { Gestures };
