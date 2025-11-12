# Motion.dev React API Cheatsheet

## Core Components

- `motion` component wrapper

    ```jsx
    import { motion } from 'motion';

    // Basic usage
    <motion.div animate={{ x: 100 }} />;
    ```

## Animation Props

- **`animate`**: Target values for animation

    ```jsx
    <motion.div animate={{ opacity: 1, scale: 1.2 }} />
    ```

- **`initial`**: Initial values before animation

    ```jsx
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
    ```

- **`exit`**: Values to animate to when component is removed

    ```jsx
    <motion.div exit={{ opacity: 0 }} />
    ```

- **`transition`**: Control animation timing
    ```jsx
    <motion.div animate={{ x: 100 }} transition={{ duration: 2, ease: 'easeInOut' }} />
    ```

## Transition Options

- **`type`**: Animation type

    - `"spring"` (default)
    - `"tween"` (linear interpolation)
    - `"inertia"` (decay animation)

- **`duration`**: Animation length in seconds

    ```jsx
    transition={{ duration: 2 }}
    ```

- **`delay`**: Delay before animation starts in seconds

    ```jsx
    transition={{ delay: 0.5 }}
    ```

- **`ease`**: Easing function

    - `"linear"`, `"easeIn"`, `"easeOut"`, `"easeInOut"`
    - Custom array of bezier values: `[0.42, 0, 0.58, 1]`

- **Spring-specific options:**

    ```jsx
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 10,
      mass: 1
    }}
    ```

- **Staggered animations:**
    ```jsx
    transition={{
      delay: index * 0.2 // Use in a map function
    }}
    ```

## Gestures

- **`whileHover`**: Values while hovering

    ```jsx
    <motion.button whileHover={{ scale: 1.1 }} />
    ```

- **`whileTap`**: Values while pressing/tapping

    ```jsx
    <motion.button whileTap={{ scale: 0.9 }} />
    ```

- **`whileFocus`**: Values while element has focus

    ```jsx
    <motion.input whileFocus={{ borderColor: '#4299E1' }} />
    ```

- **`whileDrag`**: Values while element is being dragged
    ```jsx
    <motion.div whileDrag={{ scale: 1.1, boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)' }} />
    ```

## Drag Functionality

- **`drag`**: Enable dragging

    ```jsx
    <motion.div drag />
    ```

- **`drag`** with axis constraint

    ```jsx
    <motion.div drag="x" /> // Only horizontal
    <motion.div drag="y" /> // Only vertical
    ```

- **`dragConstraints`**: Limit drag area

    ```jsx
    // With numeric constraints
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
    />

    // Or reference to container
    <motion.div
      drag
      dragConstraints={constraintsRef}
    />
    ```

- **Other drag props:**
    ```jsx
    <motion.div
        dragElastic={0.2} // Elasticity of drag (0-1)
        dragMomentum={false} // Disable momentum after release
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }} // Custom drag physics
    />
    ```

## Variants

- **Define variants** for coordinated animations

    ```jsx
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    <motion.div variants={variants} initial="hidden" animate="visible" />;
    ```

- **Propagation** to child components

    ```jsx
    const list = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    <motion.ul variants={list} initial="hidden" animate="visible">
        {items.map((item) => (
            <motion.li key={item.id} variants={item} />
        ))}
    </motion.ul>;
    ```

## Keyframes

- **Animate through multiple values**
    ```jsx
    <motion.div
        animate={{
            x: [0, 100, 0],
            backgroundColor: ['#ff0000', '#00ff00', '#0000ff'],
        }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
    />
    ```

## Layout Animations

- **`layout`**: Animate layout changes automatically

    ```jsx
    <motion.div layout />
    ```

- **`layoutId`**: Shared element transitions

    ```jsx
    // In one component
    <motion.div layoutId="shared-element" />

    // In another component
    <motion.div layoutId="shared-element" />
    ```

## AnimatePresence

- **Animate components when added/removed**

    ```jsx
    import { AnimatePresence } from 'motion';

    <AnimatePresence>
        {isVisible && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
    </AnimatePresence>;
    ```

- **Mode options:**
    ```jsx
    <AnimatePresence mode="wait">
        {' '}
        // wait for exiting elements before rendering new ones
        {activeComponent}
    </AnimatePresence>
    ```

## ScrollTrigger

- **Trigger animations on scroll**

    ```jsx
    import { useScroll } from 'motion';

    function Component() {
        const { scrollYProgress } = useScroll();

        return <motion.div style={{ scaleX: scrollYProgress }} />;
    }
    ```

## Values and Springs

- **Create and use animated values**

    ```jsx
    import { useMotionValue, useSpring, useTransform } from 'motion';

    function Component() {
        const x = useMotionValue(0);
        const scale = useTransform(x, [-100, 0, 100], [0.5, 1, 1.5]);
        const smoothX = useSpring(x, { stiffness: 300, damping: 20 });

        return <motion.div drag="x" style={{ x, scale }} onDrag={(e, info) => x.set(info.point.x)} />;
    }
    ```

## Custom Hooks

- **`useAnimation`**: Create reusable animations

    ```jsx
    import { useAnimation } from 'motion';

    function Component() {
        const controls = useAnimation();

        // Start animation
        function startAnimation() {
            controls.start({
                x: 100,
                transition: { duration: 1 },
            });
        }

        return <motion.div animate={controls} />;
    }
    ```

- **`useCycle`**: Cycle through animation states

    ```jsx
    import { useCycle } from 'motion';

    function Component() {
        const [animation, cycleAnimation] = useCycle({ scale: 1 }, { scale: 1.5 }, { scale: 0.5 });

        return <motion.div animate={animation} onClick={() => cycleAnimation()} />;
    }
    ```

## Event Callbacks

- **Animation lifecycle**

    ```jsx
    <motion.div
        animate={{ x: 100 }}
        onAnimationStart={() => console.log('Animation started')}
        onAnimationComplete={() => console.log('Animation completed')}
    />
    ```

- **Gesture callbacks**
    ```jsx
    <motion.div
        drag
        onDragStart={() => console.log('Drag started')}
        onDrag={(event, info) => console.log(info.point.x, info.point.y)}
        onDragEnd={() => console.log('Drag ended')}
    />
    ```
