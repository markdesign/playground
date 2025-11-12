import React, { useState } from 'react';
import { motion, useInView } from 'motion/react';

// === BASIC IN VIEW DETECTION ===
function BasicInViewExample() {
    const ref = React.useRef(null);
    const isInView = useInView(ref);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic In View Detection</h2>
            <p className="mb-4">Scroll down to see the effect</p>
            <div className="h-[50vh]"></div>
            <div
                ref={ref}
                className={`rounded p-6 transition-colors ${isInView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
                <p className="font-bold">{isInView ? "🎉 I'm in view!" : "I'm out of view"}</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">Element changes style when it enters viewport</p>
            <div className="h-[50vh]"></div>
            <div className="h-[50vh]"></div>
        </div>
    );
}

// === ONCE OPTION ===
function OnceOptionExample() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        if (isInView) {
            setCount((prev) => prev + 1);
        }
    }, [isInView]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Once Option</h2>

            <p className="mb-4">
                Detected view changes: <span className="font-bold">{count}</span> (will only trigger once)
            </p>

            <div className="h-[50vh]"></div>

            <div
                ref={ref}
                className={`rounded p-6 transition-colors ${isInView ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
                <p className="font-bold">{isInView ? "✓ I've been seen!" : "I haven't been seen yet"}</p>
            </div>

            <div className="h-[50vh]"></div>

            <p className="mt-2 text-sm text-gray-600">Only triggers once when element first becomes visible</p>
            <div className="h-[50vh]"></div>
            <div className="h-[50vh]"></div>
        </div>
    );
}

// === AMOUNT OPTION ===
function AmountOptionExample() {
    // Three refs with different amount thresholds
    const ref1 = React.useRef(null);
    const ref2 = React.useRef(null);
    const ref3 = React.useRef(null);

    const isInView1 = useInView(ref1, { amount: 0.2 });
    const isInView2 = useInView(ref2, { amount: 0.6 });
    const isInView3 = useInView(ref3, { amount: 1.0 });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Amount Option</h2>

            <p className="mb-4">Scroll to see different activation points</p>

            <div className="h-[50vh]"></div>

            <div className="space-y-4">
                <div
                    ref={ref1}
                    className={`rounded p-6 transition-colors ${isInView1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    <p className="font-bold">{isInView1 ? '✓ 20% visible' : 'Less than 20% visible'}</p>
                    <p className="mt-1 text-sm">amount: 0.2</p>
                </div>

                <div
                    ref={ref2}
                    className={`rounded p-6 transition-colors ${
                        isInView2 ? 'bg-purple-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    <p className="font-bold">{isInView2 ? '✓ 60% visible' : 'Less than 60% visible'}</p>
                    <p className="mt-1 text-sm">amount: 0.6</p>
                </div>

                <div
                    ref={ref3}
                    className={`rounded p-6 transition-colors ${isInView3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                    <p className="font-bold">{isInView3 ? '✓ 100% visible' : 'Less than 100% visible'}</p>
                    <p className="mt-1 text-sm">amount: 1.0</p>
                </div>
            </div>

            <div className="h-[50vh]"></div>

            <p className="mt-2 text-sm text-gray-600">Control how much of the element must be visible</p>
            <div className="h-[50vh]"></div>
            <div className="h-[50vh]"></div>
        </div>
    );
}

// === MARGIN OPTION ===
function MarginOptionExample() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { margin: '200px 0px 0px 0px' });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Margin Option</h2>

            <div className="sticky top-0 z-10 border-b bg-white p-2">
                <p className="font-bold">
                    {isInView ? '✅ Element is in view (or within 200px above)' : '❌ Element not in view yet'}
                </p>
            </div>

            <p className="mb-4">Scroll down slowly to see the effect</p>

            <div className="h-[50vh]"></div>

            <div className="border-t border-b border-dashed border-red-500 py-1">
                <p className="text-center text-sm text-red-500">Margin boundary (200px above element)</p>
            </div>

            <div className="h-[200px]"></div>

            <div
                ref={ref}
                className={`rounded p-6 transition-colors ${isInView ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}
            >
                <p>The target element</p>
            </div>

            <div className="h-[50vh]"></div>

            <p className="mt-2 text-sm text-gray-600">Detect when element is within margin of viewport</p>
        </div>
    );
}

// === ROOT OPTION ===
function RootOptionExample() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const elementRef = React.useRef<HTMLDivElement>(null);

    const isInView = useInView(elementRef, {
        root: containerRef,
        margin: '10px',
        amount: 'some',
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Root Option</h2>

            <p className="mb-2">
                Status:{' '}
                <span className="font-bold">{isInView ? 'Visible within container' : 'Outside container view'}</span>
            </p>

            <div ref={containerRef} className="h-40 overflow-y-auto rounded border border-gray-300 p-2">
                <div className="flex h-40 items-center justify-center border-b">
                    <p className="text-gray-500">Scroll down within this container</p>
                </div>

                <div
                    ref={elementRef}
                    className={`my-4 rounded p-4 transition-colors ${
                        isInView ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    <p>This element is tracked within the container</p>
                </div>

                <div className="h-40"></div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Track elements within a scrollable container</p>
        </div>
    );
}

// === ANIMATION TRIGGER ===
function AnimationTriggerExample() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animation Trigger</h2>

            <p className="mb-4">Scroll down to trigger animation</p>

            <div className="h-[50vh]"></div>

            <motion.div
                ref={ref}
                className="rounded bg-gradient-to-r from-purple-500 to-pink-500 p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.7 }}
            >
                <h3 className="mb-2 text-xl font-bold text-white">Scroll-Triggered Animation</h3>
                <p className="text-white">This content fades in and slides up when it enters the viewport</p>
            </motion.div>

            <div className="h-[50vh]"></div>

            <p className="mt-2 text-sm text-gray-600">Trigger animations when elements become visible</p>
        </div>
    );
}

// === STAGGERED ANIMATIONS ===
function StaggeredAnimationsExample() {
    const containerRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const items = ['First item', 'Second item', 'Third item', 'Fourth item', 'Fifth item'];

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Staggered Animations</h2>

            <p className="mb-4">Scroll down to see staggered entrance</p>

            <div className="h-[50vh]"></div>

            <div ref={containerRef} className="space-y-3">
                {items.map((item, i) => (
                    <motion.div
                        key={item}
                        className="rounded bg-cyan-500 p-4 text-white"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.4, delay: isInView ? i * 0.1 : 0 }}
                    >
                        {item}
                    </motion.div>
                ))}
            </div>

            <div className="h-[50vh]"></div>

            <p className="mt-2 text-sm text-gray-600">Trigger staggered animations on multiple elements</p>
        </div>
    );
}

// === AMOUNT AS DIRECTIONS ===
function AmountAsDirectionsExample() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { amount: 'some' });

    const ref2 = React.useRef(null);
    const isInView2 = useInView(ref2, { amount: 'all' });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Amount as Directions</h2>

            <p className="mb-4">Scroll to see different activation behaviors</p>

            <div className="h-[50vh]"></div>

            <div className="space-y-4">
                <div
                    ref={ref}
                    className={`h-40 rounded p-6 transition-colors ${
                        isInView ? 'bg-teal-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    <p className="font-bold">
                        {isInView ? "✓ Some part visible (amount: 'some')" : 'Not visible at all'}
                    </p>
                    <p className="mt-2 text-sm">This activates when any part of the element is visible</p>
                </div>

                <div
                    ref={ref2}
                    className={`h-40 rounded p-6 transition-colors ${
                        isInView2 ? 'bg-rose-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    <p className="font-bold">
                        {isInView2 ? "✓ Completely visible (amount: 'all')" : 'Not completely visible'}
                    </p>
                    <p className="mt-2 text-sm">This only activates when the entire element is visible</p>
                </div>
            </div>

            <div className="h-[50vh]"></div>

            <p className="mt-2 text-sm text-gray-600">Use 'some' or 'all' for simpler visibility control</p>
        </div>
    );
}

// === SCROLL PROGRESS INDICATOR ===
function ScrollProgressIndicatorExample() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
        amount: 0.5,
    });

    const [progress, setProgress] = useState(0);

    // Track scroll progress through element
    const handleScroll = () => {
        if (!ref.current) return;

        const element = ref.current as HTMLElement;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how far the element has been scrolled through
        const entryPoint = windowHeight;
        const exitPoint = -rect.height;
        const totalDistance = entryPoint - exitPoint;

        const currentPosition = rect.top;
        const scrollProgress = (entryPoint - currentPosition) / totalDistance;

        setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Scroll Progress Indicator</h2>

            <div className="sticky top-0 z-10 border-b bg-white p-2">
                <div className="h-2 w-full rounded bg-gray-200">
                    <div className="h-2 rounded bg-blue-500" style={{ width: `${progress * 100}%` }}></div>
                </div>
                <p className="mt-1 text-sm">
                    Progress: {Math.round(progress * 100)}%{isInView && ' - Element is in center of viewport'}
                </p>
            </div>

            <p className="mb-4">Scroll down to see the progress indicator</p>

            <div className="h-[30vh]"></div>

            <div ref={ref} className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
                <h3 className="mb-4 text-xl font-bold">Scroll Progress Section</h3>
                <p className="mb-4">This section's scroll progress is being tracked.</p>
                <p>The progress bar at the top of the page shows how far you've scrolled through this section.</p>
            </div>

            <div className="h-[100vh]"></div>

            <p className="mt-2 text-sm text-gray-600">Create scroll-linked progress indicators</p>
        </div>
    );
}

// === LAZY LOADING IMAGES ===
function LazyLoadingExample() {
    const imageRef = React.useRef(null);
    const isInView = useInView(imageRef, {
        once: true,
        margin: '100px 0px',
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Lazy Loading Images</h2>

            <p className="mb-4">Scroll down to load the image</p>

            <div className="h-[50vh]"></div>

            <div ref={imageRef} className="overflow-hidden rounded">
                {isInView ? (
                    <img
                        src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                        alt="Lazy loaded landscape"
                        width="100%"
                        height="auto"
                    />
                ) : (
                    <div className="flex h-64 w-full items-center justify-center bg-gray-200">
                        <p className="text-gray-500">Image will load when scrolled into view</p>
                    </div>
                )}
            </div>

            <div className="h-[50vh]"></div>

            <p className="mt-2 text-sm text-gray-600">Load images only when they're about to come into view</p>
        </div>
    );
}

const UseInViewExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            {/* <BasicInViewExample /> */}
            {/* <OnceOptionExample /> */}
            <AmountOptionExample />
            {/* <MarginOptionExample /> */}
            {/* <RootOptionExample /> */}
            {/* <AnimationTriggerExample /> */}
            {/* <StaggeredAnimationsExample /> */}
            {/* <AmountAsDirectionsExample /> */}
            {/* <ScrollProgressIndicatorExample /> */}
            {/* <LazyLoadingExample /> */}
        </div>
    );
};

export { UseInViewExamples };
