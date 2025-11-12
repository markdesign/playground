import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// === BASIC EXIT ANIMATION ===
function BasicExitAnimationExample() {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Exit Animation</h2>
            <button onClick={() => setIsVisible(!isVisible)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isVisible ? 'Hide' : 'Show'}
            </button>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className="h-20 w-20 rounded bg-blue-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
            <p>hello</p>
        </div>
    );
}

// === EXIT ANIMATIONS WITH TRANSFORM ===
function ExitWithTransformExample() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Exit with Transform</h2>
            <button onClick={() => setIsVisible(!isVisible)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isVisible ? 'Hide' : 'Show'}
            </button>

            <div className="relative h-32">
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            className="absolute h-20 w-20 rounded bg-green-500"
                            initial={{ opacity: 0, scale: 0, x: -100 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0, x: 100 }}
                            transition={{ duration: 0.5 }}
                        />
                    )}
                </AnimatePresence>
            </div>
            <p>hello</p>
        </div>
    );
}

// === MULTIPLE ELEMENTS TOGGLE ===
function MultipleElementsToggleExample() {
    const [activeTab, setActiveTab] = useState('a');

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multiple Elements Toggle</h2>
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setActiveTab('a')}
                    className={`rounded px-4 py-2 ${activeTab === 'a' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Tab A
                </button>
                <button
                    onClick={() => setActiveTab('b')}
                    className={`rounded px-4 py-2 ${activeTab === 'b' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Tab B
                </button>
            </div>

            <div className="relative h-40 rounded bg-gray-100 p-4">
                <AnimatePresence mode="wait">
                    {activeTab === 'a' && (
                        <motion.div
                            key="a"
                            className="absolute inset-0 rounded bg-blue-100 p-4"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-bold">Tab A Content</h3>
                            <p>This content animates in and out.</p>
                        </motion.div>
                    )}

                    {activeTab === 'b' && (
                        <motion.div
                            key="b"
                            className="absolute inset-0 rounded bg-green-100 p-4"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-bold">Tab B Content</h3>
                            <p>Different content with the same animation.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// === ANIMATE PRESENCE MODES ===

function AnimatePresenceModes() {
    const [mode, setMode] = useState('sync');
    const [isFirstSet, setIsFirstSet] = useState(true);

    // Use object with IDs to properly identify items for animation
    const firstSet = [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
    ];

    const secondSet = [
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
    ];

    const toggleItems = () => {
        setIsFirstSet(!isFirstSet);
    };

    const currentItems = isFirstSet ? firstSet : secondSet;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">AnimatePresence Modes</h2>

            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setMode('sync')}
                    className={`rounded px-4 py-2 text-sm ${mode === 'sync' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    sync
                </button>
                <button
                    onClick={() => setMode('wait')}
                    className={`rounded px-4 py-2 text-sm ${mode === 'wait' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    wait
                </button>
                <button
                    onClick={() => setMode('popLayout')}
                    className={`rounded px-4 py-2 text-sm ${mode === 'popLayout' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    popLayout
                </button>
            </div>

            <button onClick={toggleItems} className="mb-4 rounded bg-gray-200 px-4 py-2">
                Switch to {isFirstSet ? 'C & D' : 'A & B'}
            </button>

            <div className="h-40 rounded bg-gray-100 p-4">
                <div className="mb-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <p className="text-sm font-medium">
                        Mode: <span className="font-bold">{mode}</span>
                    </p>
                </div>

                <div className="relative h-24">
                    <AnimatePresence mode={mode as 'sync' | 'wait' | 'popLayout'}>
                        {currentItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                className="absolute flex h-16 w-16 items-center justify-center rounded bg-purple-500 text-2xl font-bold text-white"
                                style={{ marginRight: '0.5rem' }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1, x: item.id === 'A' || item.id === 'C' ? 0 : 80 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                {item.label}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <p>
                    <strong>sync</strong>: Animate new elements immediately while old elements are animating out
                </p>
                <p>
                    <strong>wait</strong>: Wait for exiting elements to finish before animating new elements in
                </p>
                <p>
                    <strong>popLayout</strong>: Remove exiting elements from layout immediately
                </p>
            </div>
        </div>
    );
}

// === INITIAL ANIMATIONS ===
function InitialAnimationsExample() {
    // Use separate state variables for different AnimatePresence instances
    const [showWithInitial, setShowWithInitial] = useState(false);
    const [showWithoutInitial, setShowWithoutInitial] = useState(false);
    const [key, setKey] = useState(0); // Force remount by changing key

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Initial Animations</h2>

            <div className="mb-4">
                <button
                    onClick={() => {
                        // Reset both and increment key to force remount
                        setShowWithInitial(false);
                        setShowWithoutInitial(false);
                        setTimeout(() => {
                            setKey(key + 1);
                            setShowWithInitial(true);
                            setShowWithoutInitial(true);
                        }, 500);
                    }}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    Reset & Show Both
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="mb-2 text-center font-bold">With Initial Animation</h3>
                    <div className="relative h-40 rounded border border-dashed border-gray-300 bg-gray-50">
                        <AnimatePresence key={`initial-${key}`} initial={true}>
                            {showWithInitial && (
                                <motion.div
                                    className="absolute top-4 left-4 flex h-20 w-20 items-center justify-center rounded bg-orange-500"
                                    initial={{ opacity: 0, y: 100, scale: 0.3 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <span className="font-bold text-white">initial=true</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="absolute right-0 bottom-2 left-0 text-center text-xs text-gray-500">
                            Animates from initial state
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="mb-2 text-center font-bold">Without Initial Animation</h3>
                    <div className="relative h-40 rounded border border-dashed border-gray-300 bg-gray-50">
                        <AnimatePresence key={`no-initial-${key}`} initial={false}>
                            {showWithoutInitial && (
                                <motion.div
                                    className="absolute top-4 left-4 flex h-20 w-20 items-center justify-center rounded bg-orange-500"
                                    initial={{ opacity: 0, y: 100, scale: 0.3 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <span className="font-bold text-white">initial=false</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="absolute right-0 bottom-2 left-0 text-center text-xs text-gray-500">
                            Appears immediately at final state
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-4 text-sm">
                <strong>What's happening?</strong> When <code>initial=true</code>, elements animate from their initial
                state when they first mount. With <code>initial=false</code>, elements appear immediately in their final
                state without any entrance animation.
            </p>
        </div>
    );
}

// === CUSTOM COMPONENT WITH ANIMATE PRESENCE ===
function CustomComponentExample() {
    const [isVisible, setIsVisible] = useState(true);

    const CustomBox = () => {
        return (
            <motion.div
                className="flex h-20 w-20 items-center justify-center rounded bg-indigo-500 text-white"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3, rotate: 90 }}
                transition={{ duration: 0.5 }}
            >
                Custom Component
            </motion.div>
        );
    };
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Custom Component with forwardRef</h2>
            <button onClick={() => setIsVisible(!isVisible)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isVisible ? 'Hide' : 'Show'}
            </button>

            <div className="relative h-32">
                <AnimatePresence>{isVisible && <CustomBox />}</AnimatePresence>
            </div>

            <p className="text-sm text-gray-500">
                Custom components need to use forwardRef to work with AnimatePresence
            </p>
        </div>
    );
}

// === LIST ANIMATIONS WITH ANIMATE PRESENCE ===
function ListAnimationsExample() {
    const [items, setItems] = useState([0, 1, 2, 3]);

    const addItem = () => {
        const nextItem = items.length > 0 ? Math.max(...items) + 1 : 0;
        setItems([...items, nextItem]);
    };

    const removeItem = (itemToRemove: number) => {
        setItems(items.filter((item) => item !== itemToRemove));
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">List Animations</h2>
            <button onClick={addItem} className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
                Add Item
            </button>

            <div className="rounded bg-gray-100 p-4">
                <ul className="space-y-2">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.li
                                key={item}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center justify-between rounded bg-cyan-500 p-3 text-white">
                                    <span>Item {item}</span>
                                    <button
                                        onClick={() => removeItem(item)}
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500"
                                    >
                                        ×
                                    </button>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </div>
        </div>
    );
}

// === PRESENCE ANIMATION WITH ABSOLUTE POSITIONING ===
function AbsolutePositioningExample() {
    const [position, setPosition] = useState('center');

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Absolute Positioning for Transitions</h2>
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setPosition('left')}
                    className={`rounded px-4 py-2 ${position === 'left' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Left
                </button>
                <button
                    onClick={() => setPosition('center')}
                    className={`rounded px-4 py-2 ${position === 'center' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Center
                </button>
                <button
                    onClick={() => setPosition('right')}
                    className={`rounded px-4 py-2 ${position === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Right
                </button>
            </div>

            <div className="relative h-32 rounded bg-gray-100">
                <AnimatePresence mode="wait">
                    {position === 'left' && (
                        <motion.div
                            key="left"
                            className="absolute top-4 left-4 h-16 w-16 rounded bg-red-500"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}

                    {position === 'center' && (
                        <motion.div
                            key="center"
                            className="absolute top-4 right-0 left-0 mx-auto h-16 w-16 rounded bg-green-500"
                            style={{ width: '4rem' }}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}

                    {position === 'right' && (
                        <motion.div
                            key="right"
                            className="absolute top-4 right-4 h-16 w-16 rounded bg-blue-500"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const AnimatePresenceComponent = () => {
    return (
        <div className="m-10 flex flex-col gap-4">
            {/* <BasicExitAnimationExample /> */}
            {/* <ExitWithTransformExample /> */}
            {/* <MultipleElementsToggleExample /> */}
            {/* <AnimatePresenceModes /> */}
            {/* <InitialAnimationsExample /> */}
            {/* <CustomComponentExample /> */}
            {/* <ListAnimationsExample /> */}
            <AbsolutePositioningExample />
        </div>
    );
};

export { AnimatePresenceComponent };
