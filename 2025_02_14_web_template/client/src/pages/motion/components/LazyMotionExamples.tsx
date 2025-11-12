import React, { useState } from 'react';
import { LazyMotion, domAnimation, domMax, m } from 'motion/react';

// === BASIC LAZY MOTION WITH DOMANIMATION ===
function BasicLazyMotionExample() {
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic LazyMotion with domAnimation</h2>

            <LazyMotion features={domAnimation}>
                <m.div
                    className="h-20 w-20 rounded bg-blue-500"
                    animate={{
                        x: 100,
                        rotate: 180,
                    }}
                    transition={{ duration: 1 }}
                >
                    <p className="p-1 text-xs text-white">Uses m.div</p>
                </m.div>
            </LazyMotion>

            <p className="mt-2 text-sm text-gray-600">
                Using LazyMotion with domAnimation - basic animation features only
            </p>
        </div>
    );
}

// === LAZY MOTION WITH DOMMAX ===
function DomMaxExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">LazyMotion with domMax</h2>

            <button onClick={() => setIsOpen(!isOpen)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isOpen ? 'Close' : 'Open'}
            </button>

            <LazyMotion features={domMax}>
                <div className="grid grid-cols-2 gap-2">
                    <m.div
                        className={`cursor-pointer rounded bg-purple-500 p-4 text-white ${
                            isOpen ? 'col-span-2' : 'col-span-1'
                        }`}
                        layout // Layout animation requires domMax
                        animate={{
                            backgroundColor: isOpen ? '#ec4899' : '#8b5cf6',
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <p>Click me (uses layout animations)</p>
                        {isOpen && <p className="mt-2">Layout animations need domMax</p>}
                    </m.div>

                    <m.div
                        className="h-24 rounded bg-teal-500 p-4 text-white"
                        layout // Also uses layout
                    >
                        Other content
                    </m.div>
                </div>
            </LazyMotion>

            <p className="mt-2 text-sm text-gray-600">Using domMax for advanced features like layout animations</p>
        </div>
    );
}

// === DYNAMIC IMPORT OF FEATURES ===
function DynamicImportExample() {
    const [loadedFeatures, setLoadedFeatures] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadFeatures = async () => {
        // In a real app, you would use dynamic import:
        // const { domAnimation } = await import("motion/react")

        // For demo purposes, we'll simulate a load delay
        setTimeout(() => {
            setLoadedFeatures(domAnimation);
            setIsLoaded(true);
        }, 1000);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Dynamic Import of Features</h2>

            {!isLoaded && (
                <button onClick={loadFeatures} className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
                    Load Animation Features
                </button>
            )}

            {isLoaded ? (
                <LazyMotion features={loadedFeatures}>
                    <m.div
                        className="flex h-20 w-20 items-center justify-center rounded bg-green-500"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                        }}
                    >
                        <p className="p-1 text-xs text-white">Loaded!</p>
                    </m.div>
                </LazyMotion>
            ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-200">Not loaded</div>
            )}

            <p className="mt-2 text-sm text-gray-600">Demonstrating dynamic loading of features (simulated)</p>
        </div>
    );
}

// === USING M COMPONENT WITH FORWARDREF ===
function ForwardRefExample() {
    const [showBox, setShowBox] = useState(true);

    // Custom component using forwardRef with m
    const CustomBox = React.forwardRef((props, ref) => {
        return (
            <m.div
                ref={ref}
                className="h-20 w-20 rounded bg-amber-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                {...props}
            >
                {props.children}
            </m.div>
        );
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Using m Component with forwardRef</h2>

            <button onClick={() => setShowBox(!showBox)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {showBox ? 'Hide' : 'Show'}
            </button>

            <LazyMotion features={domAnimation}>
                {showBox && (
                    <CustomBox>
                        <p className="p-1 text-xs text-white">Custom m component</p>
                    </CustomBox>
                )}
            </LazyMotion>

            <p className="mt-2 text-sm text-gray-600">Custom components using m need to use forwardRef</p>
        </div>
    );
}

// === COMPONENT-SPECIFIC FEATURES ===
function ComponentSpecificExample() {
    // Define two sections that use different features
    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Component-Specific Features</h2>

            <div className="space-y-4">
                {/* Basic animations section */}
                <div className="rounded border p-4">
                    <h3 className="mb-2 font-bold">Basic Animations Section</h3>
                    <LazyMotion features={domAnimation}>
                        <m.div
                            className="h-16 w-16 rounded bg-blue-500"
                            animate={{ x: 100 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                        >
                            <p className="p-1 text-xs text-white">Basic</p>
                        </m.div>
                    </LazyMotion>
                </div>

                {/* Advanced animations section */}
                <div className="rounded border p-4">
                    <h3 className="mb-2 font-bold">Advanced Animations Section</h3>
                    <LazyMotion features={domMax}>
                        <div className="flex gap-2">
                            <m.div
                                className="h-16 w-16 cursor-grab rounded bg-purple-500"
                                drag // Requires domMax
                                whileDrag={{ scale: 1.2 }}
                            >
                                <p className="p-1 text-xs text-white">Drag me</p>
                            </m.div>

                            <m.div
                                className="h-16 w-16 rounded bg-pink-500"
                                layout // Requires domMax
                                animate={{ rotate: [0, 180, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <p className="p-1 text-xs text-white">Layout</p>
                            </m.div>
                        </div>
                    </LazyMotion>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Different components can use different feature sets</p>
        </div>
    );
}

// === CUSTOM FEATURE SET ===
function CustomFeatureSetExample() {
    // In a real app, this would be a custom feature set
    const minimalFeatures = () => {
        // This is just for demonstration
        // In a real app, you'd define or import actual animation features
        return domAnimation;
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Custom Feature Set</h2>

            <LazyMotion features={minimalFeatures}>
                <m.button
                    className="rounded bg-indigo-500 px-4 py-2 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Hover & Click Me
                </m.button>
            </LazyMotion>

            <p className="mt-2 text-sm text-gray-600">You can define custom feature sets for specific needs</p>
            <p className="text-xs text-gray-500">
                Note: This is a demonstration - actual custom feature creation requires more setup
            </p>
        </div>
    );
}

const LazyMotionExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicLazyMotionExample />
            {/* <DomMaxExample /> */}
            {/* <DynamicImportExample /> */}
            {/* <ForwardRefExample /> */}
            {/* <ComponentSpecificExample /> */}
            {/* <CustomFeatureSetExample /> */}
        </div>
    );
};

export { LazyMotionExamples };
