/* eslint-disable @next/next/no-img-element */
import styles from "./ResponsiveWebsite.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

/* 
        <script>
            const navButton = document.querySelector('button[aria-expanded]');

            function toggleNav({ target }) {
            const expanded = target.getAttribute('aria-expanded') === 'true' || false;
            navButton.setAttribute('aria-expanded', !expanded);
            }

            navButton.addEventListener('click', toggleNav);

        </script> 
    */

function ResponsiveWebsite() {
    return (
        <div className={styles.container}>
            <PageNav title="WesBos" subTitle="flex - ResponsiveWebsite" />
            <div className={styles.content}>
                <div className={styles.wrapper}>




                    
                    <div className={styles.top}>
                        <header className={styles.hero}>
                            <h1>Terry's Taco Joint</h1>
                            <p>Pretty Good Tacos!</p>
                        </header>
                        <div className={cn(styles.cta, styles.cta1)}>
                            <p className={styles.price}>$1.99</p>
                            <p>Tacos</p>
                        </div>
                        <div className={cn(styles.cta, styles.cta2)}>
                            <p className={styles.price}>$3.99</p>
                            <p>Kombucha</p>
                        </div>
                    </div>





                    <nav className={styles.menu}>
                        <button aria-expanded="false" aria-controls="menu-list">
                            <span className={styles.open}>☰</span>
                            <span className={styles.close}>×</span>
                            Menu
                        </button>
                        <ul id="menu-list">
                            <li>
                                <a href="">Tacos</a>
                            </li>
                            <li>
                                <a href="">Beers</a>
                            </li>
                            <li>
                                <a href="">Wines</a>
                            </li>
                            <li>
                                <a href="">Desserts</a>
                            </li>
                            <li>
                                <a href="">Reservations</a>
                            </li>
                        </ul>
                    </nav>






                    <section className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.icon}>🌮</span>
                            <h3>Tacos</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.icon}>🍺</span>
                            <h3>Beer</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.icon}>🍷</span>
                            <h3>Wine</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.icon}>🎵</span>
                            <h3>Music</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
                        </div>
                    </section>





                    <section className={styles.about}>
                        <img src="images/queso-taco.png" alt="Yummy Taco" className={styles.about__mockup} />
                        <div className={styles.about__details}>
                            <h2>Featured Taco</h2>
                            <p>Slim Profile, easy to hold and loaded with cheese.</p>
                            <p>This is the one you have been waiting for</p>
                            <button>Learn More →</button>
                        </div>
                    </section>




                    <section className={styles.gallery}>
                        <h2>Instant Grams</h2>
                        <img src="https://source.unsplash.com/random/201x201" alt="" />
                        <img src="https://source.unsplash.com/random/202x202" alt="" />
                        <img src="https://source.unsplash.com/random/203x203" alt="" />
                        <img src="https://source.unsplash.com/random/204x204" alt="" />
                        <img src="https://source.unsplash.com/random/205x205" alt="" />
                        <img src="https://source.unsplash.com/random/206x206" alt="" />
                        <img src="https://source.unsplash.com/random/207x207" alt="" />
                        <img src="https://source.unsplash.com/random/207x208" alt="" />
                        <img src="https://source.unsplash.com/random/207x209" alt="" />
                        <img src="https://source.unsplash.com/random/207x210" alt="" />
                    </section>









                </div>
            </div>
        </div>
    );
}

export default ResponsiveWebsite;
