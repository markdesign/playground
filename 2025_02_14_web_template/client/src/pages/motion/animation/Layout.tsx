import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

// === BASIC LAYOUT ANIMATION ===
function BasicLayoutExample() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Layout Animation</h2>
            <motion.div
                layout
                className={`cursor-pointer rounded-lg bg-blue-500 p-4 text-white ${isExpanded ? 'w-60' : 'w-32'}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <motion.p>{isExpanded ? 'Click to shrink' : 'Click to expand'}</motion.p>
            </motion.div>
        </div>
    );
}

// === LAYOUT GROUP ===
function LayoutGroupExample() {
    const [selected, setSelected] = useState(0);
    const data = [0, 1, 2];
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Layout Group</h2>
            <LayoutGroup>
                <div className="flex gap-2">
                    {data.map((item) => (
                        <motion.div
                            layout
                            key={item}
                            className={`cursor-pointer rounded-md p-4 ${
                                selected === item ? 'bg-purple-600 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => setSelected(item)}
                        >
                            {selected === item ? 'Selected' : `Item ${item + 1}`}
                            {selected === item && (
                                <motion.div className="mt-2 h-1 rounded-full bg-red-500" layoutId="underline" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </LayoutGroup>
        </div>
    );
}

// === SHARED LAYOUT ID ===
function SharedLayoutIdExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Shared Layout ID</h2>
            <div className="relative">
                {!isOpen && (
                    <motion.div
                        layoutId="card"
                        className="w-40 cursor-pointer rounded-md bg-green-500 p-4 text-white"
                        onClick={() => setIsOpen(true)}
                    >
                        Click to expand
                    </motion.div>
                )}

                {isOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            layoutId="card"
                            className="max-w-md rounded-lg bg-green-500 p-6 text-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="mb-2 text-xl font-bold">Expanded Card</h3>
                            <p>This card smoothly transitions between positions and sizes using layoutId.</p>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}

// === ANIMATE PRESENCE WITH LAYOUT ===
function AnimatePresenceExample() {
    const [items, setItems] = useState([0, 1, 2, 3]);

    const removeItem = (itemToRemove: number) => {
        setItems(items.filter((item) => item !== itemToRemove));
    };

    const addItem = () => {
        const nextItem = items.length > 0 ? Math.max(...items) + 1 : 0;
        setItems([...items, nextItem]);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">AnimatePresence with Layout</h2>
            <div className="space-y-4">
                <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={addItem}>
                    Add Item
                </button>

                <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center rounded bg-orange-500 p-3 text-white"
                            >
                                Item {item}
                                <button
                                    className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm"
                                    onClick={() => removeItem(item)}
                                >
                                    ×
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// === LAYOUT TRANSITION PROPERTIES ===
function LayoutTransitionExample() {
    const [isWide, setIsWide] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Layout Transition Properties</h2>
            <div className="space-y-4">
                <motion.div
                    layout
                    className={`cursor-pointer rounded-lg bg-indigo-600 p-4 text-white ${isWide ? 'w-full' : 'w-40'}`}
                    onClick={() => setIsWide(!isWide)}
                    transition={{
                        layout: { duration: 0.6, type: 'spring', stiffness: 100 },
                    }}
                >
                    {isWide ? 'Click to shrink' : 'Click to expand'}
                    <p className="text-sm opacity-80">Custom transition</p>
                </motion.div>
            </div>
        </div>
    );
}

// === LAYOUT TYPE ===
function LayoutTypeExample() {
    const [showContent, setShowContent] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Layout Type (Position vs Size)</h2>
            <div className="space-y-4">
                <button
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                    onClick={() => setShowContent(!showContent)}
                >
                    {showContent ? 'Hide Content' : 'Show Content'}
                </button>

                <div className="flex flex-wrap gap-4">
                    <motion.div
                        className="rounded-lg bg-pink-500 p-4 text-white"
                        layout="position" // Only position is animated, size changes instantly
                    >
                        <h3 className="mb-2 font-bold">Position Layout</h3>
                        {showContent && <p>This text affects size, but only position animates.</p>}
                    </motion.div>

                    <motion.div
                        className="rounded-lg bg-teal-500 p-4 text-white"
                        layout="size" // Only size is animated, position changes instantly
                    >
                        <h3 className="mb-2 font-bold">Size Layout</h3>
                        {showContent && <p>This text affects size, but only size animates.</p>}
                    </motion.div>

                    <motion.div
                        className="rounded-lg bg-amber-500 p-4 text-white"
                        layout={true} // Both position and size animate
                    >
                        <h3 className="mb-2 font-bold">Default Layout</h3>
                        {showContent && <p>This text affects size, both size and position animate.</p>}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// === LAYOUT WITH LIST REORDERING ===
function ListReorderExample() {
    const [items, setItems] = useState([1, 2, 3, 4]);

    const shuffle = () => {
        setItems([...items].sort(() => Math.random() - 0.5));
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">List Reordering with Layout</h2>
            <div className="space-y-4">
                <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={shuffle}>
                    Shuffle
                </button>

                <div className="grid grid-cols-2 gap-2">
                    {items.map((item) => (
                        <motion.div
                            key={item}
                            layout
                            className="flex h-20 items-center justify-center rounded bg-cyan-600 p-4 text-xl text-white"
                        >
                            Item {item}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const Layout = () => {
    return (
        <div className="space-y-16 pb-20">
            {/* <BasicLayoutExample /> */}
            {/* <LayoutGroupExample /> */}
            {/* <SharedLayoutIdExample /> */}
            {/* <AnimatePresenceExample /> */}
            {/* <LayoutTransitionExample /> */}
            {/* <LayoutTypeExample /> */}
            <ListReorderExample />
        </div>
    );
};

export { Layout };
