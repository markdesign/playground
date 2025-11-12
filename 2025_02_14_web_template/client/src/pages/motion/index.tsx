// ---------- Animation ----------
import { Overview } from './animation/Overview';
import { Transitions } from './animation/Transitions';
import { Gestures } from './animation/Gestures';
import { Scroll } from './animation/Scroll';
import { Layout } from './animation/Layout';

// ---------- Components ----------
import { Motion } from './components/Motion';
import { AnimatePresenceComponent } from './components/AnimatePresenceComponent';
import { LazyMotionExamples } from './components/LazyMotionExamples';
import { LayoutGroupExamples } from './components/LayoutGroupExamples';
import { MotionConfigExamples } from './components/MotionConfigExamples';
import { ReorderExamples } from './components/ReorderExamples';

// ---------- Motion Values ----------
import { OverviewExamples } from './motionValues/OverviewExamples';
import { UseMotionValueEventExamples } from './motionValues/UseMotionValueEventExamples';
import { UseMotionTemplateExamples } from './motionValues/UseMotionTemplateExamples';
import { UseScrollExamples } from './motionValues/UseScrollExamples';
import { UseSpringExamples } from './motionValues/UseSpringExamples';
import { UseTimeExamples } from './motionValues/UseTimeExamples';
import { UseTransformExamples } from './motionValues/UseTransformExamples';
import { UseVelocityExamples } from './motionValues/UseVelocityExamples';

// ---------- Hooks ----------
import { UseAnimateExamples } from './hooks/UseAnimateExamples';
import { UseAnimationFrameExamples } from './hooks/UseAnimationFrameExamples';
import { UseDragControlsExamples } from './hooks/UseDragControlsExamples';
import { UseInViewExamples } from './hooks/UseInViewExamples';
import { UseReducedMotionExamples } from './hooks/UseReducedMotionExamples';

// ---------- Demo ----------
import { Demo1 } from './demo/Demo1';

const Main = () => {
    return (
        <>
            {/* ---------- Animation ---------- */}
            <Overview />
            {/* <Transitions /> */}
            {/* <Gestures /> */}
            {/* <Scroll /> */}
            {/* <Layout /> */}

            {/* ---------- Components ---------- */}
            {/* <Motion /> */}
            {/* <AnimatePresenceComponent /> */}
            {/* <LazyMotionExamples /> */}
            {/* <LayoutGroupExamples /> */}
            {/* <MotionConfigExamples /> */}
            {/* <ReorderExamples /> */}

            {/* ---------- Motion Values ---------- */}
            {/* <OverviewExamples /> */}
            {/* <UseMotionValueEventExamples /> */}
            {/* <UseMotionTemplateExamples /> */}
            {/* <UseScrollExamples /> */}
            {/* <UseSpringExamples /> */}
            {/* <UseTimeExamples /> */}
            {/* <UseTransformExamples /> */}
            {/* <UseVelocityExamples /> */}

            {/* ---------- Hooks ---------- */}
            {/* <UseAnimateExamples /> */}
            {/* <UseAnimationFrameExamples /> */}
            {/* <UseDragControlsExamples /> */}
            {/* <UseInViewExamples /> */}
            {/* <UseReducedMotionExamples /> */}

            {/* ---------- Animation ---------- */}
            {/* <Demo1 /> */}
        </>
    );
};

export { Main };
