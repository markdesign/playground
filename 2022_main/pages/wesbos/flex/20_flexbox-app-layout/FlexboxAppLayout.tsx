import styles from "./FlexboxAppLayout.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function FlexboxAppLayout() {
    return (
        <div className={styles.container}>
            <PageNav title="WesBos" subTitle="flex - FlexboxAppLayout" />

            <div className={styles.content}>
                <div className={styles.appWrap}>
                    {/* Header */}
                    <header className={styles.appHeader}>
                        <a href="#" className={styles.button}>
                            Back
                        </a>
                        <h1>FlexBox App Layout</h1>
                        <a href="#" className={styles.button}>
                            Change
                        </a>
                    </header>

                    {/* Content */}
                    <div className={styles.content}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, beatae?</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque deserunt quisquam
                            repellendus quia autem saepe culpa fugit nulla distinctio hic, beatae cum, perspiciatis
                            iusto natus nesciunt itaque quaerat, earum ex.
                        </p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://avatars2.githubusercontent.com/u/176013" alt="avatar" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam quo ipsa excepturi sunt,
                        quibusdam, quos!
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi natus dolores placeat esse
                            ratione fugiat voluptatum impedit blanditiis consequuntur quos debitis consequatur ea beatae
                            fuga perspiciatis vero, mollitia, molestias omnis. Dolorum quas iusto, molestiae ut at
                            architecto dolorem nulla est!
                        </p>
                        <p>lorem ipsum dolor sit amet, consectetur adipisicing elit. nulla, illum ea consectetur!</p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. cumque ea, mollitia sequi quo
                            consequatur dolor itaque numquam, aut tempore suscipit, ut quaerat. qui!
                        </p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. aliquam id rem numquam, illum
                            atque ducimus maiores assumenda dolorum ut.
                        </p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. accusantium cum unde animi,
                            obcaecati, minima odio.
                        </p>
                        <p>lorem ipsum dolor sit amet, consectetur adipisicing elit. nulla, illum ea consectetur!</p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. cumque ea, mollitia sequi quo
                            consequatur dolor itaque numquam, aut tempore suscipit, ut quaerat. qui!
                        </p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. aliquam id rem numquam, illum
                            atque ducimus maiores assumenda dolorum ut.
                        </p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. accusantium cum unde animi,
                            obcaecati, minima odio.
                        </p>
                        <p>lorem ipsum dolor sit amet, consectetur adipisicing elit. nulla, illum ea consectetur!</p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. cumque ea, mollitia sequi quo
                            consequatur dolor itaque numquam, aut tempore suscipit, ut quaerat. qui!
                        </p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. aliquam id rem numquam, illum
                            atque ducimus maiores assumenda dolorum ut.
                        </p>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipisicing elit. accusantium cum unde animi,
                            obcaecati, minima odio.
                        </p>
                    </div>

                    <div className={styles.iconBar}>
                        <a href="#">
                            <i className={cn(styles.fa, styles.faHome)}></i>
                            Home
                        </a>
                        <a href="#">
                            <i className={cn(styles.fa, styles.faBell)}></i>
                            Notifi
                        </a>
                        <a href="#">
                            <i className={cn(styles.fa, styles.faEjnvelope)}></i>
                            Messages
                        </a>
                        <a href="#">
                            <i className={cn(styles.fa, styles.faUser)}></i>
                            Me
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlexboxAppLayout;
