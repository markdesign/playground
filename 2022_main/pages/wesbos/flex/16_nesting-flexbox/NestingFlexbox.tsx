import Image from "next/image";
import styles from "./NestingFlexbox.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function NestingFlexbox() {
    return (
        <div className={styles.container}>
            <PageNav title="WesBos" subTitle="flex - NestingFlexbox" />
            <div className={cn(styles.wrapper)}>
                <div className={styles.slider}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="./slider.jpeg" alt="slider"/>
                    {/* <Image src="/pages/wesbos/flex/16_nesting-flexbox/slide.jpeg/slider.jpeg" alt="slider" width={1000} height={450} /> */}
                </div>

                <nav className={styles.sliderNav}>
                    <ul>
                        <li className={styles.arrow}>
                            <a href="#">
                                <span>←</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <span>Add a CLI to Node Apps with Vantage</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <span>NewSprint, Spectacle</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <span>Small Modules: Tales from a Serial Module Author</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <span>The End</span>
                            </a>
                        </li>

                        <li className={styles.arrow}>
                            <a href="#">
                                <span>→</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default NestingFlexbox;
