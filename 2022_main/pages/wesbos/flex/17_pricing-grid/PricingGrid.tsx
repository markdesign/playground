import styles from "./PricingGrid.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function PricingGrid() {
    return (
        <div className={styles.container}>
            <PageNav title="WesBos" subTitle="flex - PricingGrid" />
            <div className={styles.pricingGrid}>
                <div className={cn(styles.plan, styles.plan1)}>
                    <h2>Cat</h2>
                    <p>Common, yet regarded by many as the worst house pet.</p>
                    <ul className={styles.features}>
                        <li>Scratches everything</li>
                        <li>Easily lost for days</li>
                        <li>Kind of a bummer</li>
                    </ul>
                    <p className={styles.price}>free</p>
                    <a href="#" className={styles.cta}>
                        😾 Really?
                    </a>
                </div>

                <div className={cn(styles.plan, styles.plan2)}>
                    <h2>Dog</h2>
                    <p>
                        Loving, gentle and caring. Dogs are the best house pet to have and will increase happiness ten
                        fold.
                    </p>
                    <ul className={styles.features}>
                        <li>Super Fun</li>
                        <li>Friends love them</li>
                        <li>Plays games</li>
                        <li>Not a cat</li>
                    </ul>
                    <p className={styles.price}>$90</p>
                    <a href="#" className={styles.cta}>
                        🐶 Best Deal →
                    </a>
                </div>

                <div className={cn(styles.plan, styles.plan3)}>
                    <h2>Fish</h2>
                    {/* <p>Cheap n' easy.</p> */}
                    {/* <ul className={styles.features}>
                        <li>Eats flakes</li>
                        <li>Cop out</li>
                        <li>Replaceable</li>
                    </ul> */}
                    {/* <p className={styles.price}>$3</p> */}
                    <a href="#" className={styles.cta}>
                        🐠
                    </a>
                </div>
            </div>
        </div>
    );
}

export default PricingGrid;
