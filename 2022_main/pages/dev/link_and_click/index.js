import styles from "./LinkAndClick.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function LinkAndClick() {

    const onClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('Here');
    }
    return (
        <>
            <PageNav title="WesBos" subTitle="flex - LinkAndClick" />
            <div className={styles.container}>
                LINK AND CLICK

                <a href="http://www.google.com" target="_blank" rel="noreferrer" onClick={onClick}>click me</a>
            </div>
        </>
    );
}

export default LinkAndClick;
