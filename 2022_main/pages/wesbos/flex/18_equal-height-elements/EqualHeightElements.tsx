import styles from "./EqualHeightElements.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function EqualHeightElements() {
    return (
        <div className={styles.container}>
            <PageNav title="WesBos" subTitle="flex - EqualHeightElements" />

            <div className={styles.content}>
                <div className={styles.elements}>
                    <div className={styles.item}>You can tell the world you never was my girl</div>
                    <div className={styles.item}>You can burn my clothes when I&apos;m gone</div>
                    <div className={cn(styles.item, styles.large)}>
                        Or you can tell your friends just what a fool I&apos;ve been
                    </div>
                    <div className={styles.item}>And </div>

                    <div className={styles.item}>You </div>
                    <div className={cn(styles.item, styles.small)}>You </div>
                    <div className={styles.item}>Or you can tell my lips to tell my fingertips</div>
                    <div className={cn(styles.item, styles.small)}>They won&apos;t be reaching out for you no more</div>

                    <div className={cn(styles.item, styles.large)}>
                        But don&apos;t tell my heart my achy breaky heart
                    </div>
                    <div className={styles.item}>I just don&apos;t think he&apos;d understand</div>
                    <div className={cn(styles.item, styles.small)}>And if you tell my heart</div>
                    <div className={cn(styles.item, styles.large)}>my achy breaky heart</div>
                    <div className={styles.item}>He might blow up and kill this man</div>

                    <div className={styles.item}>[guitar]</div>

                    <div className={styles.item}>You can tell your ma I moved to Arkansas</div>
                    <div className={cn(styles.item, styles.large)}>You can tell your dog to bite my leg</div>
                    <div className={styles.item}>Or tell your brother Cliff whose fist can can tell my lip</div>
                    <div className={cn(styles.item, styles.small)}>He never really liked me anyway</div>

                    <div className={styles.item}>Or tell your Aunt Louise tell anything you please</div>
                    <div className={styles.item}>Myself already knows I&apos;m not okay</div>
                    <div className={cn(styles.item, styles.large)}>
                        Or you can tell my eyes to watch out for my mind
                    </div>
                    <div className={styles.item}>It might be walking out on me today</div>

                    <div className={styles.item}>Don&apos;t tell my heart my achy breaky heart...</div>

                    <div className={styles.item}>[guitar]</div>

                    <div className={styles.item}>Don&apos;t tell my heart my achy breaky heart...</div>
                    <div className={styles.item}>Don&apos;t tell my heart my achy breaky heart...</div>
                </div>
            </div>
        </div>
    );
}

export default EqualHeightElements;
