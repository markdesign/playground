import styles from "./FlexGrowAndShrink.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function FlexGrowAndShrink() {
    return (
        <>
            <PageNav title="WesBos" subTitle="flex - FlexGrowAndShrink" />
            <div className={styles.container}>
                <div className={cn(styles.box, styles.box1)}>one 😎</div>
                <div className={cn(styles.box, styles.box2)}>two 🍕</div>
            </div>
        </>
    );
}

export default FlexGrowAndShrink;
