import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { stagger } from 'motion';

function Example1() {
    // Added sender property to messages
    const message1 = [{ value: 'Hello' }, { value: 'World' }, { value: 'This' }];
    const message2 = [{ value: 'is' }, { value: 'a' }, { value: 'test' }];
    const message3 = [{ value: 'of' }, { value: 'the' }, { value: 'motion' }, { value: 'library' }];

    const [messages, setMessages] = useState();

    function addMessage1() {
        setMessages(message1);
    }

    function addMessage2() {
        setMessages((prevMessages) => {
            return [...prevMessages, ...message2];
        });
    }

    const containerVariant = {
        // hidden: { x: 20 },
        visible: {
            x: 0,
            transition: {
                duration: 0.5,
                // staggerChildren: 1,
                // delayChildren: 5,
                // staggerDirection: -1,
            },
        },
    };

    const itemVariant = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.2,
            },
        }),
        // visible: {
        //     opacity: 1,
        //     y: 0,
        //     // transition: {
        //     // duration: 0.5,
        //     // delay: item.id * 1,
        //     // },
        // },
    };

    console.log('[Demo1.tsx 60] messages : ', messages);

    return (
        <div>
            <h2 className="mb-2 text-lg font-bold">Chat Animation</h2>
            <button className="mb-4 cursor-pointer rounded bg-pink-500 px-3 py-1 text-white" onClick={addMessage1}>
                add messages
            </button>
            <button className="mb-4 cursor-pointer rounded bg-pink-500 px-3 py-1 text-white" onClick={addMessage2}>
                add messages
            </button>

            {/* Message Area */}

            <motion.div
                // key={containerKey}
                className="flex flex-grow flex-col space-y-3"
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {messages?.map((item) => (
                        <motion.div
                            key={item.value}
                            className="rounded-bl-none border border-gray-300 bg-white px-4 py-2 text-gray-800"
                            variants={itemVariant}
                        >
                            {item.value}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

const Demo1 = () => {
    return (
        <div className="space-y-12 p-10">
            <Example1 />
        </div>
    );
};

export { Demo1 };
