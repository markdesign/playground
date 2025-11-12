import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'motion/react';

// === BASIC LIST REORDERING ===
function BasicReorderExample() {
    const [items, setItems] = useState(['Apple', 'Banana', 'Cherry', 'Grape', 'Orange']);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic List Reordering</h2>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="w-64 space-y-2">
                {items.map((item) => (
                    <Reorder.Item key={item} value={item} className="cursor-grab rounded bg-blue-500 p-3 text-white">
                        {item}
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <p className="mt-2 text-sm text-gray-600">Drag items to reorder the list</p>
        </div>
    );
}

// === GRID REORDERING ===
function GridReorderExample() {
    const [items, setItems] = useState([
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8',
        'Item 9',
        'Item 10',
        'Item 11',
        'Item 12',
    ]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Grid Reordering</h2>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="grid w-80 grid-cols-3 gap-2">
                {items.map((item) => (
                    <Reorder.Item
                        key={item}
                        value={item}
                        className="flex h-20 cursor-grab items-center justify-center rounded bg-purple-500 text-white"
                    >
                        {item}
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <p className="mt-2 text-sm text-gray-600">
                Even in a grid layout, the logical order is maintained when dragging
            </p>
        </div>
    );
}

// === CUSTOM DRAG HANDLES ===
function DragHandlesExample() {
    const [items, setItems] = useState([
        { id: 1, content: 'Task 1: Complete project plan' },
        { id: 2, content: 'Task 2: Design wireframes' },
        { id: 3, content: 'Task 3: Implement core features' },
        { id: 4, content: 'Task 4: Write documentation' },
    ]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Custom Drag Handles</h2>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="w-full max-w-md space-y-2">
                {items.map((item) => (
                    <Reorder.Item key={item.id} value={item} className="flex items-center rounded bg-gray-100 p-3">
                        <div className="drag-handle mr-3 cursor-grab rounded p-1 hover:bg-gray-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="8" cy="8" r="1.5" />
                                <circle cx="8" cy="16" r="1.5" />
                                <circle cx="16" cy="8" r="1.5" />
                                <circle cx="16" cy="16" r="1.5" />
                            </svg>
                        </div>
                        <div>{item.content}</div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <p className="mt-2 text-sm text-gray-600">You can drag using the handle icons on the left</p>
        </div>
    );
}

// === LIST ITEM VARIATIONS ===
function VariableItemsExample() {
    const [items, setItems] = useState([
        { id: 1, content: 'Short item', color: 'bg-green-500', height: 'h-12' },
        {
            id: 2,
            content: 'This is a medium-sized item with more content to display',
            color: 'bg-blue-500',
            height: 'h-20',
        },
        { id: 3, content: 'Another small item', color: 'bg-purple-500', height: 'h-12' },
        {
            id: 4,
            content:
                'This is an even larger item with significantly more content to display. It demonstrates how the reordering works with varying height elements.',
            color: 'bg-pink-500',
            height: 'h-32',
        },
    ]);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Variable Size Items</h2>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="w-full max-w-md space-y-2">
                {items.map((item) => (
                    <Reorder.Item
                        key={item.id}
                        value={item}
                        className={`${item.color} ${item.height} flex cursor-grab items-center rounded p-3 text-white`}
                    >
                        {item.content}
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <p className="mt-2 text-sm text-gray-600">Reorder works with items of varying sizes</p>
        </div>
    );
}

// === REORDER WITH ANIMATIONS ===
function ReorderWithAnimationsExample() {
    const [items, setItems] = useState(['Red', 'Green', 'Blue', 'Yellow', 'Purple']);

    const getColor = (item: string) => {
        const colors = {
            Red: 'bg-red-500',
            Green: 'bg-green-500',
            Blue: 'bg-blue-500',
            Yellow: 'bg-yellow-500',
            Purple: 'bg-purple-500',
        } as Record<string, string>;
        return colors[item] || 'bg-gray-500';
    };

    const removeItem = (item: string) => {
        setItems(items.filter((i) => i !== item));
    };

    const addItem = () => {
        const available = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 'Teal'].filter(
            (item) => !items.includes(item),
        );
        if (available.length) {
            const randomItem = available[Math.floor(Math.random() * available.length)];
            setItems([...items, randomItem]);
        }
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Reorder with Animations</h2>

            <button
                onClick={addItem}
                className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
                disabled={items.length >= 8}
            >
                Add Item
            </button>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="w-64 space-y-2">
                <AnimatePresence initial={false}>
                    {items.map((item) => (
                        <Reorder.Item
                            key={item}
                            value={item}
                            className={`${getColor(item)} flex items-center justify-between rounded p-3 text-white`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {item}
                            <button
                                onClick={() => removeItem(item)}
                                className="bg-opacity-30 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm"
                            >
                                ×
                            </button>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        </div>
    );
}

// === NESTED REORDERING ===
function NestedReorderExample() {
    // Top-level categories
    const [categories, setCategories] = useState([
        { id: 'fruits', name: 'Fruits', items: ['Apple', 'Banana', 'Cherry'] },
        { id: 'vegetables', name: 'Vegetables', items: ['Carrot', 'Broccoli', 'Potato'] },
        { id: 'dairy', name: 'Dairy', items: ['Milk', 'Cheese', 'Yogurt'] },
    ]);
    // Function to update items in a specific category
    const updateItems = (categoryId: string, newItems: string[]) => {
        setCategories(
            categories.map((category) => (category.id === categoryId ? { ...category, items: newItems } : category)),
        );
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Nested Reordering</h2>

            <Reorder.Group axis="y" values={categories} onReorder={setCategories} className="w-full max-w-md space-y-4">
                {categories.map((category) => (
                    <Reorder.Item key={category.id} value={category} className="rounded-lg bg-gray-100 p-3">
                        <h3 className="mb-2 cursor-grab rounded bg-gray-200 p-2 font-bold">{category.name}</h3>

                        <Reorder.Group
                            axis="y"
                            values={category.items}
                            onReorder={(newItems) => updateItems(category.id, newItems)}
                            className="space-y-1 pl-2"
                        >
                            {category.items.map((item) => (
                                <Reorder.Item
                                    key={item}
                                    value={item}
                                    className="cursor-grab rounded bg-white p-2 shadow-sm"
                                >
                                    {item}
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <p className="mt-2 text-sm text-gray-600">Both categories and items within categories can be reordered</p>
        </div>
    );
}

// === HORIZONTAL REORDERING ===
function HorizontalReorderExample() {
    const [items, setItems] = useState([
        { id: 'tab1', label: 'Dashboard' },
        { id: 'tab2', label: 'Projects' },
        { id: 'tab3', label: 'Team' },
        { id: 'tab4', label: 'Reports' },
        { id: 'tab5', label: 'Settings' },
    ]);

    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Horizontal Reordering</h2>

            <div className="border-b">
                <Reorder.Group axis="x" values={items} onReorder={setItems} className="flex space-x-1">
                    {items.map((item) => (
                        <Reorder.Item
                            key={item.id}
                            value={item}
                            className={`cursor-grab rounded-t px-4 py-2 ${
                                activeTab === item.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.label}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>

            <div className="rounded-b bg-blue-50 p-4">
                <p>Content for {items.find((item) => item.id === activeTab)?.label}</p>
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Reordering works horizontally as well - drag tabs to reorder them
            </p>
        </div>
    );
}

const ReorderExamples = () => {
    return (
        <div className="space-y-16 pb-20">
            <BasicReorderExample />
            {/* <GridReorderExample /> */}
            {/* <DragHandlesExample /> */}
            {/* <VariableItemsExample /> */}
            {/* <ReorderWithAnimationsExample /> */}
            {/* <NestedReorderExample /> */}
            {/* <HorizontalReorderExample /> */}
        </div>
    );
};

export { ReorderExamples };
