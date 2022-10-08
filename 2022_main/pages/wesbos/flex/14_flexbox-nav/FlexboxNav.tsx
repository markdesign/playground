import styles from "./FlexboxNav.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function FlexboxNav() {
    return (
        <div className={styles.container}>
            <PageNav title="WesBos" subTitle="flex - FlexboxNav" />
            <div className={styles.wrapper}>
                <nav className={styles.flexNav}>
                    <ul>
                        <li>
                            <a href="#">Item 01</a>
                        </li>
                        <li>
                            <a href="#">Item 02</a>
                        </li>
                        <li>
                            <a href="#">Item 03</a>
                        </li>
                        <li>
                            <a href="#">Item 04</a>
                        </li>
                        <li>
                            <a href="#">Item 05</a>
                        </li>
                        <li>
                            <a href="#">Item 06</a>
                        </li>
                        <li className={styles.social}>
                            <a href="http://twitter.com/wesbos">
                                <i className={cn(styles.fa, styles.faTwitter)}></i>
                            </a>
                        </li>
                        <li className={styles.social}>
                            <a href="http://facebook.com/wesbos.developer">
                                <i className={cn(styles.fa, styles.faFacebook)}></i>
                            </a>
                        </li>
                        <li className={styles.social}>
                            <a href="http://github.com/wesbos">
                                <i className={cn(styles.fa, styles.faGithub)}></i>
                            </a>
                        </li>
                        <li className={styles.social}>
                            <a href="http://instagram.com/wesbos">
                                <i className={cn(styles.fa, styles.faInstagram)}></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default FlexboxNav;
