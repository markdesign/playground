import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'motion/react';

// === BASIC DRAG CONTROLS ===
function BasicDragControlsExample() {
    const dragControls = useDragControls();

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic Drag Controls</h2>

            <div className="mb-4">
                <div
                    className="flex h-8 w-32 cursor-pointer items-center justify-center rounded bg-gray-200 text-sm"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    Drag from here
                </div>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded bg-blue-500"
                    drag
                    dragControls={dragControls}
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <p className="text-sm">Draggable</p>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Control drag gestures from a separate element</p>
        </div>
    );
}

// === MULTIPLE DRAG HANDLES ===
function MultipleDragHandlesExample() {
    const dragControls = useDragControls();

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multiple Drag Handles</h2>

            <div className="mb-4 flex gap-2">
                <button
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    Handle 1
                </button>

                <button
                    className="rounded bg-green-500 px-3 py-1 text-sm text-white"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    Handle 2
                </button>

                <button
                    className="rounded bg-purple-500 px-3 py-1 text-sm text-white"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    Handle 3
                </button>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    className="absolute top-1/2 left-1/2 flex h-20 w-60 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded bg-gray-300"
                    drag
                    dragControls={dragControls}
                >
                    <p className="text-gray-600">Drag me using the buttons above</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Control dragging from multiple external elements</p>
        </div>
    );
}

// === INTERNAL DRAG HANDLE ===
function InternalDragHandleExample() {
    const dragControls = useDragControls();

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Internal Drag Handle</h2>

            <div className="relative h-60 rounded bg-gray-100">
                <motion.div
                    className="absolute top-1/2 left-1/2 w-60 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded bg-white shadow-md"
                    drag
                    dragControls={dragControls}
                >
                    <div className="h-10 cursor-move bg-indigo-500" onPointerDown={(e) => dragControls.start(e)}>
                        <div className="flex h-full items-center px-4">
                            <div className="mr-2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                                    <circle cx="4" cy="4" r="1.5" />
                                    <circle cx="12" cy="4" r="1.5" />
                                    <circle cx="4" cy="12" r="1.5" />
                                    <circle cx="12" cy="12" r="1.5" />
                                </svg>
                            </div>
                            <p className="font-medium text-white">Drag from header</p>
                        </div>
                    </div>

                    <div className="p-4 select-none">
                        <p>This is a modal window with a drag handle in the header.</p>
                        <p className="mt-2">You can only drag from the colored header area.</p>
                        <div className="mt-4 flex h-20 items-center justify-center rounded bg-gray-100">
                            <p className="text-gray-500">Content area (not draggable)</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Restrict dragging to a specific part of the element</p>
        </div>
    );
}

// === PROGRAMMATIC DRAG START ===
function ProgrammaticDragStartExample() {
    const dragControls = useDragControls();
    const targetRef = useRef<HTMLDivElement>(null);

    const startDragFromCenter = () => {
        if (!targetRef.current) return;

        // Get the center position of the element
        const rect = targetRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create a synthetic pointer event
        const event = new PointerEvent('pointerdown', {
            clientX: centerX,
            clientY: centerY,
        });

        // Start the drag
        dragControls.start(event);
    };

    const startDragFromTopLeft = () => {
        if (!targetRef.current) return;

        const rect = targetRef.current.getBoundingClientRect();

        // Create a synthetic pointer event
        const event = new PointerEvent('pointerdown', {
            clientX: rect.left,
            clientY: rect.top,
        });

        // Start the drag
        dragControls.start(event);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Programmatic Drag Start</h2>

            <div className="mb-4 flex gap-2">
                <button onClick={startDragFromCenter} className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
                    Start from Center
                </button>

                <button onClick={startDragFromTopLeft} className="rounded bg-green-500 px-3 py-1 text-sm text-white">
                    Start from Top-Left
                </button>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    ref={targetRef}
                    className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded bg-orange-500"
                    drag
                    dragControls={dragControls}
                >
                    <p className="text-center text-sm text-white">Programmatically draggable</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Start drag gestures programmatically from specific points</p>
        </div>
    );
}

// === CONDITIONAL DRAG ENABLING ===
function ConditionalDragExample() {
    const dragControls = useDragControls();
    const [isDraggable, setIsDraggable] = useState(false);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (isDraggable) {
            dragControls.start(e);
        }
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Conditional Drag Enabling</h2>

            <div className="mb-4 flex items-center">
                <input
                    type="checkbox"
                    id="enable-drag"
                    checked={isDraggable}
                    onChange={(e) => setIsDraggable(e.target.checked)}
                    className="mr-2"
                />
                <label htmlFor="enable-drag">Enable dragging</label>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <div
                    className="absolute top-2 right-2 left-2 flex h-12 cursor-pointer items-center rounded bg-gray-200 px-4"
                    onPointerDown={handlePointerDown}
                >
                    <p>{isDraggable ? 'Drag handle active' : 'Dragging disabled'}</p>
                </div>

                <motion.div
                    className="absolute bottom-2 left-1/2 flex h-20 w-40 -translate-x-1/2 transform items-center justify-center rounded bg-teal-500"
                    drag
                    dragControls={dragControls}
                >
                    <p className="text-white">{isDraggable ? 'I am draggable now' : 'Dragging disabled'}</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Conditionally enable or disable dragging</p>
        </div>
    );
}

// === DRAG EVENTS ===
function DragEventsExample() {
    const dragControls = useDragControls();
    const [dragState, setDragState] = useState('Ready');
    const [dragInfo, setDragInfo] = useState({ x: 0, y: 0 });

    const handleDragStart = () => {
        setDragState('Dragging started');
    };

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: { x: number; y: number }) => {
        setDragInfo({ x: Math.round(info.x), y: Math.round(info.y) });
        setDragState('Dragging in progress');
    };

    const handleDragEnd = () => {
        setDragState('Drag completed');
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Drag Events</h2>

            <div className="mb-2">
                <p className="text-sm">
                    Status: <span className="font-bold">{dragState}</span>
                </p>
                <p className="text-sm">
                    Position: x={dragInfo.x}, y={dragInfo.y}
                </p>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <div
                    className="flex h-8 w-full cursor-move items-center justify-center bg-gray-200"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    <p className="text-sm">Drag handle</p>
                </div>

                <motion.div
                    className="absolute top-16 left-1/2 flex h-20 w-20 -translate-x-1/2 transform items-center justify-center rounded bg-pink-500"
                    drag
                    dragControls={dragControls}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                >
                    <p className="text-center text-sm text-white">Drag me</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Monitor and respond to drag events</p>
        </div>
    );
}

// === DRAG WITH CONSTRAINTS ===
function DragWithConstraintsExample() {
    const dragControls = useDragControls();
    const constraintsRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Drag With Constraints</h2>

            <div className="relative h-60 rounded bg-gray-100 p-4">
                <div
                    className="absolute top-2 left-2 flex h-8 cursor-move items-center justify-center rounded bg-gray-200 px-3"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    <p className="text-sm">Drag handle</p>
                </div>

                <div
                    ref={constraintsRef}
                    className="relative mt-12 h-32 rounded border-2 border-dashed border-gray-300"
                >
                    <motion.div
                        className="absolute h-20 w-20 rounded bg-indigo-500"
                        drag
                        dragControls={dragControls}
                        dragConstraints={constraintsRef}
                        dragElastic={0.2} // Some elasticity at the constraints
                    >
                        <div className="flex h-full w-full items-center justify-center text-white">
                            <p className="text-center text-sm">
                                Constrained
                                <br />
                                movement
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Combine drag controls with constraints for bounded movement</p>
        </div>
    );
}

// === DRAG AXES CONTROL ===
function DragAxesControlExample() {
    const dragControls = useDragControls();
    const [dragAxis, setDragAxis] = useState<'x' | 'y' | 'both'>('both');

    const getDragSettings = () => {
        if (dragAxis === 'x') return { drag: 'x' };
        if (dragAxis === 'y') return { drag: 'y' };
        return { drag: true };
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Drag Axes Control</h2>

            <div className="mb-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setDragAxis('x')}
                        className={`rounded px-3 py-1 text-sm ${dragAxis === 'x' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        X axis only
                    </button>

                    <button
                        onClick={() => setDragAxis('y')}
                        className={`rounded px-3 py-1 text-sm ${dragAxis === 'y' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Y axis only
                    </button>

                    <button
                        onClick={() => setDragAxis('both')}
                        className={`rounded px-3 py-1 text-sm ${dragAxis === 'both' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Both axes
                    </button>
                </div>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <div
                    className="absolute top-2 left-2 flex h-8 w-24 cursor-move items-center justify-center rounded bg-gray-200"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    <p className="text-xs">Drag handle</p>
                </div>

                <motion.div
                    className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded bg-green-500 text-white"
                    {...getDragSettings()}
                    dragControls={dragControls}
                >
                    <p className="text-center text-sm">
                        {dragAxis === 'both' ? 'Free movement' : dragAxis === 'x' ? 'Horizontal only' : 'Vertical only'}
                    </p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Control which axes allow movement</p>
        </div>
    );
}

// === MULTIPLE DRAGGABLE ELEMENTS ===
function MultipleDraggableElementsExample() {
    const redControls = useDragControls();
    const blueControls = useDragControls();
    const greenControls = useDragControls();

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Multiple Draggable Elements</h2>

            <div className="mb-4 flex gap-2">
                <button
                    className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                    onPointerDown={(e) => redControls.start(e)}
                >
                    Red Box
                </button>

                <button
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                    onPointerDown={(e) => blueControls.start(e)}
                >
                    Blue Box
                </button>

                <button
                    className="rounded bg-green-500 px-3 py-1 text-sm text-white"
                    onPointerDown={(e) => greenControls.start(e)}
                >
                    Green Box
                </button>
            </div>

            <div className="relative h-40 rounded bg-gray-100">
                <motion.div
                    className="absolute top-4 left-4 flex h-16 w-16 items-center justify-center rounded bg-red-500 text-white"
                    drag
                    dragControls={redControls}
                >
                    <p className="text-xs">Red</p>
                </motion.div>

                <motion.div
                    className="absolute top-4 left-1/2 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded bg-blue-500 text-white"
                    drag
                    dragControls={blueControls}
                >
                    <p className="text-xs">Blue</p>
                </motion.div>

                <motion.div
                    className="absolute top-4 right-4 flex h-16 w-16 items-center justify-center rounded bg-green-500 text-white"
                    drag
                    dragControls={greenControls}
                >
                    <p className="text-xs">Green</p>
                </motion.div>
            </div>

            <p className="mt-2 text-sm text-gray-600">Control multiple draggable elements independently</p>
        </div>
    );
}

const UseDragControlsExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicDragControlsExample />
            <MultipleDragHandlesExample />
            <InternalDragHandleExample />
            <ProgrammaticDragStartExample />
            <ConditionalDragExample />
            <DragEventsExample />
            <DragWithConstraintsExample />
            <DragAxesControlExample />
            <MultipleDraggableElementsExample />
        </div>
    );
};

export { UseDragControlsExamples };
