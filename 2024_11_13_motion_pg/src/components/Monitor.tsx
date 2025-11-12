import { cn } from "../lib/utils";
import styles from "./Monitor.module.css";

const Monitor = () => {
    return (
        <div className={cn('font-mono', styles.monitor)}>
            <div className={styles.screen}>
                <div className={styles.crt}>
                    <div className={styles.scanline}></div>
                    <div className={cn('',styles.terminal)} contentEditable={true}></div>
                </div>
            </div>
        </div>
    );
};

export { Monitor };
