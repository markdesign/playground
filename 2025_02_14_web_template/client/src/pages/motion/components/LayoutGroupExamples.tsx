import React, { useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'motion/react';

// === BASIC LAYOUT GROUP ===
function BasicLayoutGroupExample() {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Basic LayoutGroup</h2>

            <LayoutGroup>
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((id) => (
                        <motion.div
                            key={id}
                            layout
                            className={`cursor-pointer rounded p-4 ${
                                selectedId === id ? 'col-span-2 bg-blue-500 text-white' : 'bg-gray-100'
                            }`}
                            onClick={() => setSelectedId(selectedId === id ? null : id)}
                        >
                            <motion.h3 layout="position" className="font-bold">
                                Item {id}
                            </motion.h3>

                            {selectedId === id && (
                                <motion.p layout>
                                    This item expands while others reposition smoothly because they're in the same
                                    LayoutGroup.
                                </motion.p>
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
    const [selected, setSelected] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Shared layoutId Animation</h2>

            <LayoutGroup>
                <div className="relative grid h-64 grid-cols-2 gap-4">
                    {!selected ? (
                        <motion.div
                            layoutId="shared-card"
                            className="cursor-pointer rounded bg-purple-500 p-4 text-white"
                            onClick={() => setSelected(true)}
                        >
                            <motion.h3 layoutId="shared-title" className="font-bold">
                                Click to expand
                            </motion.h3>
                        </motion.div>
                    ) : (
                        <motion.div
                            layoutId="shared-card"
                            className="absolute inset-0 col-span-2 cursor-pointer rounded-lg bg-purple-500 p-6 text-white"
                            onClick={() => setSelected(false)}
                        >
                            <motion.h3 layoutId="shared-title" className="mb-2 text-xl font-bold">
                                Click to shrink
                            </motion.h3>
                            <motion.p>
                                LayoutGroup coordinates this transition between two completely different elements with
                                the same layoutId.
                            </motion.p>
                        </motion.div>
                    )}

                    <div className="rounded bg-gray-100 p-4">Other content</div>
                </div>
            </LayoutGroup>
        </div>
    );
}

// === LAYOUT GROUP WITH ANIMATE PRESENCE ===
function LayoutGroupWithPresenceExample() {
    const [items, setItems] = useState([0, 1, 2, 3]);

    const removeItem = (itemToRemove) => {
        setItems(items.filter((item) => item !== itemToRemove));
    };

    const addItem = () => {
        const nextItem = items.length > 0 ? Math.max(...items) + 1 : 0;
        setItems([...items, nextItem]);
    };

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">LayoutGroup with AnimatePresence</h2>

            <button onClick={addItem} className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
                Add Item
            </button>

            <LayoutGroup>
                <div className="space-y-2">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                className="flex items-center justify-between rounded bg-green-500 p-3 text-white"
                            >
                                <span>Item {item}</span>
                                <button
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm"
                                    onClick={() => removeItem(item)}
                                >
                                    ×
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </LayoutGroup>
        </div>
    );
}

// === NESTED LAYOUT GROUPS ===
function NestedLayoutGroupsExample() {
    const [expandedOuter, setExpandedOuter] = useState(null);
    const [expandedInner, setExpandedInner] = useState(null);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Nested LayoutGroups</h2>

            <LayoutGroup>
                <div className="space-y-4">
                    {[1, 2].map((outerItem) => (
                        <motion.div
                            key={`outer-${outerItem}`}
                            layout
                            className={`rounded p-4 ${expandedOuter === outerItem ? 'bg-amber-100' : 'bg-gray-100'}`}
                            onClick={() => {
                                if (expandedOuter !== outerItem) setExpandedInner(null);
                                setExpandedOuter(expandedOuter === outerItem ? null : outerItem);
                            }}
                        >
                            <motion.h3 layout className="mb-2 font-bold">
                                Outer Item {outerItem}
                            </motion.h3>

                            {expandedOuter === outerItem && (
                                <LayoutGroup id={`inner-group-${outerItem}`}>
                                    <motion.div layout className="mt-2 space-y-2">
                                        {[1, 2, 3].map((innerItem) => (
                                            <motion.div
                                                key={`inner-${outerItem}-${innerItem}`}
                                                layout
                                                className={`rounded p-3 ${
                                                    expandedInner === `${outerItem}-${innerItem}`
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-orange-200'
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedInner(
                                                        expandedInner === `${outerItem}-${innerItem}`
                                                            ? null
                                                            : `${outerItem}-${innerItem}`,
                                                    );
                                                }}
                                            >
                                                <motion.p layout>Inner Item {innerItem}</motion.p>

                                                {expandedInner === `${outerItem}-${innerItem}` && (
                                                    <motion.p
                                                        layout
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="mt-2 text-sm"
                                                    >
                                                        Nested layout groups coordinate independent animations.
                                                    </motion.p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </LayoutGroup>
                            )}
                        </motion.div>
                    ))}
                </div>
            </LayoutGroup>
        </div>
    );
}

// === LAYOUT GROUP WITH ID ===
function LayoutGroupIdExample() {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">LayoutGroup with ID</h2>

            {/* First Layout Group - Tab Navigation */}
            <LayoutGroup id="tabs">
                <div className="mb-4 flex border-b">
                    {['tab1', 'tab2', 'tab3'].map((tab) => (
                        <motion.button
                            key={tab}
                            className={`relative px-4 py-2 ${activeTab === tab ? 'text-blue-500' : 'text-gray-500'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-500"
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </LayoutGroup>

            {/* Second Layout Group - Content */}
            <LayoutGroup id="content">
                <div className="rounded bg-gray-100 p-4">
                    {activeTab === 'tab1' && (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3 className="font-bold">Tab 1 Content</h3>
                            <p>This content is part of a different LayoutGroup.</p>
                        </motion.div>
                    )}

                    {activeTab === 'tab2' && (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3 className="font-bold">Tab 2 Content</h3>
                            <p>Each LayoutGroup's animations are coordinated separately.</p>
                        </motion.div>
                    )}

                    {activeTab === 'tab3' && (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3 className="font-bold">Tab 3 Content</h3>
                            <p>Using separate LayoutGroup IDs keeps animations isolated.</p>
                        </motion.div>
                    )}
                </div>
            </LayoutGroup>
        </div>
    );
}

// === GRID LAYOUT ANIMATION ===
function GridLayoutAnimationExample() {
    const [compact, setCompact] = useState(false);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Grid Layout Animation</h2>

            <button onClick={() => setCompact(!compact)} className="mb-4 rounded bg-gray-200 px-4 py-2">
                {compact ? 'Expand Grid' : 'Compact Grid'}
            </button>

            <LayoutGroup>
                <motion.div layout className={`grid gap-2 ${compact ? 'grid-cols-4' : 'grid-cols-2'}`}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <motion.div
                            key={item}
                            layout
                            className={`flex items-center justify-center rounded bg-indigo-500 p-4 text-white ${
                                compact ? 'text-sm' : 'text-base'
                            }`}
                            style={{ height: compact ? 60 : 100 }}
                        >
                            {item}
                        </motion.div>
                    ))}
                </motion.div>
            </LayoutGroup>
        </div>
    );
}

const LayoutGroupExamples = () => {
    return (
        <div className="m-10 flex flex-col">
            <BasicLayoutGroupExample />
            {/* <SharedLayoutIdExample /> */}
            <LayoutGroupWithPresenceExample />
            {/* <NestedLayoutGroupsExample /> */}
            {/* <LayoutGroupIdExample /> */}
            {/* <GridLayoutAnimationExample /> */}
        </div>
    );
};

export { LayoutGroupExamples };
