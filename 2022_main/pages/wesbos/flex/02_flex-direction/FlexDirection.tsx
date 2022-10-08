import styles from "./FlexDirection.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function FlexDirection() {
    return (
        <>
            <PageNav title="WesBos" subTitle="flex - Intro" />
            <div className={styles.container}>
                <div className={cn(styles.box, styles.box1)}>1</div>
                <div className={cn(styles.box, styles.box2)}>2</div>
                <div className={cn(styles.box, styles.box3)}>3</div>
                <div className={cn(styles.box, styles.box4)}>4</div>
                <div className={cn(styles.box, styles.box5)}>5</div>
                <div className={cn(styles.box, styles.box6)}>6</div>
                <div className={cn(styles.box, styles.box7)}>7</div>
                <div className={cn(styles.box, styles.box8)}>8</div>
                <div className={cn(styles.box, styles.box9)}>9</div>
                <div className={cn(styles.box, styles.box1)}>10</div>
            </div>
        </>
    );
}

export default FlexDirection;
