import styles from "./FlexWrappingAndColumns.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function FlexWrappingAndColumns() {
    return (
        <>
            <PageNav title="WesBos" subTitle="flex - FlexWrappingAndColumns" />
            <div className={styles.container}>
                <div className={cn(styles.box, styles.box1)}>one 😎</div>
                <div className={cn(styles.box, styles.box2)}>two 🍕</div>
                <div className={cn(styles.box, styles.box3)}>three 🍟</div>
                <div className={cn(styles.box, styles.box4)}>four 👍</div>
                <div className={cn(styles.box, styles.box5)}>five 👀</div>
                <div className={cn(styles.box, styles.box6)}>six 💩</div>
            </div>
        </>
    );
}

export default FlexWrappingAndColumns;
