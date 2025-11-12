import React, { useState, useRef, useEffect } from 'react';
import { useAnimationFrame } from 'motion/react';

// === BASIC ANIMATION FRAME ===
function BasicAnimationFrameExample() {
    const [rotate, setRotate] = useState(0);

    useAnimationFrame(() => {
        setRotate((prev) => (prev + 1) % 360);
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Animation Frame</h2>

            <div className="flex h-40 items-center justify-center rounded bg-gray-100">
                <div
                    className="flex h-20 w-20 items-center justify-center rounded bg-blue-500"
                    style={{ transform: `rotate(${rotate}deg)` }}
                >
                    <div className="h-1 w-10 rounded bg-white"></div>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Continuously running animation using useAnimationFrame</p>
        </div>
    );
}

// === DELTA TIME USAGE ===
function DeltaTimeUsageExample() {
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState(1);
    const speedRef = useRef(100); // pixels per second

    useAnimationFrame((time, delta) => {
        // delta is in milliseconds, convert to seconds
        const deltaSeconds = delta / 1000;

        // Calculate new position based on speed and time
        const newPosition = position + direction * speedRef.current * deltaSeconds;

        // Reverse direction if hitting boundaries
        if (newPosition > 250 || newPosition < 0) {
            setDirection((prev) => prev * -1);
        } else {
            setPosition(newPosition);
        }
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Delta Time Usage</h2>

            <div className="relative h-20 rounded bg-gray-100">
                <div
                    className="absolute top-6 h-8 w-8 rounded-full bg-green-500"
                    style={{ left: `${position}px` }}
                ></div>
            </div>

            <div className="mt-4 flex items-center">
                <p className="mr-2 text-sm">Speed:</p>
                <input
                    type="range"
                    min="50"
                    max="300"
                    value={speedRef.current}
                    onChange={(e) => {
                        speedRef.current = Number(e.target.value);
                    }}
                    className="flex-1"
                />
                <p className="ml-2 text-sm">{speedRef.current}px/s</p>
            </div>

            <p className="mt-2 text-sm text-gray-600">Using delta time for frame-rate independent animations</p>
        </div>
    );
}

// === ANIMATION CONTROLS ===
function AnimationControlsExample() {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Animation controls
    const animate = useAnimationFrame(() => {
        if (isRunning) {
            setCount((prev) => prev + 1);
        }
    });

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setCount(0);
        setIsRunning(false);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Animation Controls</h2>

            <div className="mb-4 flex gap-2">
                <button
                    onClick={handleStart}
                    className="rounded bg-green-500 px-3 py-1 text-sm text-white"
                    disabled={isRunning}
                >
                    Start
                </button>

                <button
                    onClick={handleStop}
                    className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                    disabled={!isRunning}
                >
                    Stop
                </button>

                <button onClick={handleReset} className="rounded bg-gray-500 px-3 py-1 text-sm text-white">
                    Reset
                </button>
            </div>

            <div className="flex h-40 flex-col items-center justify-center rounded bg-gray-100">
                <div className="text-4xl font-bold">{count}</div>
                <p className="mt-2 text-sm">Frame counter: {isRunning ? 'Running' : 'Stopped'}</p>
            </div>

            <p className="mt-2 text-sm text-gray-600">Control animation playback with start, stop, and reset</p>
        </div>
    );
}

// === PERFORMANCE OPTIMIZATION ===
function PerformanceOptimizationExample() {
    const [position, setPosition] = useState({ x: 100, y: 50 });
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);

    // Optimize with useCallback and refs
    const animate = useAnimationFrame((time) => {
        if (previousTimeRef.current === null) {
            previousTimeRef.current = time;
            return;
        }

        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;

        // Only update when needed - every 30ms
        if (deltaTime > 30) {
            setPosition({
                x: 100 + Math.sin(time / 1000) * 50,
                y: 50 + Math.cos(time / 1000) * 30,
            });
        }
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Performance Optimization</h2>

            <div className="relative h-40 rounded bg-gray-100">
                <div
                    className="absolute h-10 w-10 rounded-full bg-purple-500"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transform: 'translate(-50%, -50%)',
                    }}
                ></div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Optimized animation with conditional updates and ref usage</p>
        </div>
    );
}

// === TIMING AND EASING ===
function TimingAndEasingExample() {
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef<number | null>(null);
    const animationDurationMs = 3000;
    const [isAnimating, setIsAnimating] = useState(false);

    // Easing function (ease-in-out)
    const easeInOut = (t: number): number => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    useAnimationFrame((time) => {
        if (!isAnimating) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = time;
        }

        const elapsed = time - startTimeRef.current;
        const rawProgress = Math.min(elapsed / animationDurationMs, 1);
        const easedProgress = easeInOut(rawProgress);

        setProgress(easedProgress);

        if (rawProgress >= 1) {
            setIsAnimating(false);
            startTimeRef.current = null;
        }
    });

    const startAnimation = () => {
        startTimeRef.current = null;
        setIsAnimating(true);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Timing and Easing</h2>

            <button onClick={startAnimation} className="mb-4 rounded bg-gray-200 px-4 py-2" disabled={isAnimating}>
                Start Animation
            </button>

            <div className="h-10 overflow-hidden rounded bg-gray-200">
                <div className="h-full bg-indigo-500" style={{ width: `${progress * 100}%` }}></div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Custom timing and easing functions with useAnimationFrame</p>
        </div>
    );
}

// === MULTI-ELEMENT ANIMATION ===
function MultiElementAnimationExample() {
    // Create 10 dots with different phases
    const dots = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        phase: (i * Math.PI) / 5,
    }));

    const [positions, setPositions] = useState(dots.map(() => ({ x: 0, y: 0 })));

    useAnimationFrame((time) => {
        setPositions(
            dots.map((dot) => {
                const angle = time / 1000 + dot.phase;
                return {
                    x: Math.sin(angle) * 50,
                    y: Math.cos(angle) * 50,
                };
            }),
        );
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multi-Element Animation</h2>

            <div className="flex h-40 items-center justify-center rounded bg-gray-100">
                <div className="relative h-24 w-24">
                    {dots.map((dot, i) => (
                        <div
                            key={dot.id}
                            className="absolute h-4 w-4 rounded-full"
                            style={{
                                backgroundColor: `hsl(${dot.id * 36}, 70%, 60%)`,
                                left: `calc(50% + ${positions[i].x}px)`,
                                top: `calc(50% + ${positions[i].y}px)`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Animate multiple elements with different phases</p>
        </div>
    );
}

// === MOUSE FOLLOW ANIMATION ===
function MouseFollowAnimationExample() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Update mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    // Smooth follow animation
    useAnimationFrame(() => {
        setDotPos((prev) => ({
            x: prev.x + (mousePos.x - prev.x) * 0.1,
            y: prev.y + (mousePos.y - prev.y) * 0.1,
        }));
    });

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Mouse Follow Animation</h2>

            <div ref={containerRef} className="relative h-60 cursor-none rounded bg-gray-100">
                {/* Cursor position indicator */}
                <div
                    className="pointer-events-none absolute h-2 w-2 rounded-full bg-gray-400"
                    style={{
                        left: mousePos.x,
                        top: mousePos.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                ></div>

                {/* Following dot */}
                <div
                    className="pointer-events-none absolute h-8 w-8 rounded-full bg-pink-500"
                    style={{
                        left: dotPos.x,
                        top: dotPos.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                ></div>

                <p className="absolute right-0 bottom-2 left-0 text-center text-sm">Move your mouse over this area</p>
            </div>

            <p className="mt-2 text-sm text-gray-600">Create smooth mouse-following animations with easing</p>
        </div>
    );
}

// === CANVAS ANIMATION ===
function CanvasAnimationExample() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useAnimationFrame((time) => {
        if (!isPlaying) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Number of particles
        const particleCount = 20;

        // Draw particles
        for (let i = 0; i < particleCount; i++) {
            const angle = time / 1000 + (i * Math.PI * 2) / particleCount;

            const x = canvas.width / 2 + Math.cos(angle) * 50;
            const y = canvas.height / 2 + Math.sin(angle * 2) * 30;

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${((i * 360) / particleCount) % 360}, 70%, 60%)`;
            ctx.fill();
        }
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size to match its display size
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.scale(dpr, dpr);
    }, []);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Canvas Animation</h2>

            <button onClick={() => setIsPlaying(!isPlaying)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {isPlaying ? 'Pause' : 'Play'}
            </button>

            <canvas
                ref={canvasRef}
                className="h-40 w-full rounded bg-gray-100"
                style={{ width: '100%', height: '160px' }}
            ></canvas>

            <p className="mt-2 text-sm text-gray-600">Animate HTML Canvas with useAnimationFrame</p>
        </div>
    );
}

// === SYNCHRONIZED ANIMATIONS ===
function SynchronizedAnimationsExample() {
    const [progress, setProgress] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useAnimationFrame((time) => {
        if (autoPlay) {
            // Loop every 3 seconds
            setProgress((time / 3000) % 1);
        }
    });

    // Derive multiple animations from the same progress value
    const translateX = progress * 200;
    const rotate = progress * 360;
    const opacity = Math.sin(progress * Math.PI);
    const scale = 0.5 + progress * 0.5;
    const hue = progress * 360;

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Synchronized Animations</h2>

            <div className="mb-4 flex items-center gap-4">
                <button onClick={() => setAutoPlay(!autoPlay)} className="rounded bg-gray-200 px-4 py-2">
                    {autoPlay ? 'Pause' : 'Play'}
                </button>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.001"
                    value={progress}
                    onChange={(e) => {
                        setAutoPlay(false);
                        setProgress(Number(e.target.value));
                    }}
                    className="flex-1"
                />
            </div>

            <div className="relative h-60 overflow-hidden rounded bg-gray-100">
                {/* Element 1: Translation */}
                <div className="absolute top-4 h-8 w-8 rounded bg-blue-500" style={{ left: translateX }}></div>

                {/* Element 2: Rotation */}
                <div
                    className="absolute top-20 left-24 h-16 w-16 bg-purple-500"
                    style={{ transform: `rotate(${rotate}deg)` }}
                ></div>

                {/* Element 3: Opacity */}
                <div className="absolute top-40 left-4 h-12 w-32 rounded bg-pink-500" style={{ opacity }}></div>

                {/* Element 4: Scale and color */}
                <div
                    className="absolute top-20 right-10 h-12 w-12 rounded-full"
                    style={{
                        transform: `scale(${scale})`,
                        backgroundColor: `hsl(${hue}, 70%, 60%)`,
                    }}
                ></div>
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Keep multiple animations perfectly synchronized with a shared timeline
            </p>
        </div>
    );
}

const UseAnimationFrameExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicAnimationFrameExample />
            {/* <DeltaTimeUsageExample /> */}
            <AnimationControlsExample />
            <PerformanceOptimizationExample />
            <TimingAndEasingExample />
            <MultiElementAnimationExample />
            <MouseFollowAnimationExample />
            <CanvasAnimationExample />
            <SynchronizedAnimationsExample />
        </div>
    );
};

export { UseAnimationFrameExamples };
