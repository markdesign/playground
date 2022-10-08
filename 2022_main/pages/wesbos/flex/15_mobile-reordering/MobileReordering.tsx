import styles from "./MobileReordering.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function MobileReordering() {
    return (
        <div className={styles.container}>
            <PageNav title="WesBos" subTitle="flex - MobileReordering" />

            <div className={styles.wrapper}>
                <header className={styles.top}>
                    <h1>
                        <a href="#">What The Flexbox?!</a>
                    </h1>
                </header>

                <nav className={styles.flexNav}>
                    <a href="#" className={styles.toggleNav}>
                        ☰ Menu
                    </a>
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
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li className={styles.social}>
                            <a href="http://facebook.com/wesbos.developer">
                                <i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li className={styles.social}>
                            <a href="http://github.com/wesbos">
                                <i className="fa fa-github"></i>
                            </a>
                        </li>
                        <li className={styles.social}>
                            <a href="http://instagram.com/wesbos">
                                <i className="fa fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </nav>

                <section className={styles.hero}>
                    <img src="http://picsum.photos/1000/600" />
                </section>

                <section className={styles.details}>
                    <p>A simple video course to help you master FlexBox.</p>
                    <p>Sign up today to grab all the videos and exercises!</p>
                </section>

                <section className={styles.signup}>
                    <form action="" className={styles.signup}>
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Email Address" />
                        <input type="submit" value="Sign me up!" />
                    </form>
                </section>

                <footer>
                    <p>&copy; Wes Bos</p>
                </footer>
            </div>
        </div>
    );
}

export default MobileReordering;
