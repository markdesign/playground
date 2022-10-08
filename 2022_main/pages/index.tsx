import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import Link from "next/link";
import PageNav from "components/pageNav/PageNav";

const Home: NextPage = () => {
    const wesBosFlexLinks = [
        "01_intro/Intro",
        "02_flex-direction/FlexDirection",
        "03_flex-wrapping-and-columns/FlexWrappingAndColumns",
        "04_ordering/Ordering",
        "05_alignment-and-centering/AlignmentAndCentering",
        "06_flexbox-sizing/FlexboxSizing",
        "11_flex-grow-and-shrink/FlexGrowAndShrink",
        "14_flexbox-nav/FlexboxNav",
        "15_mobile-reordering/MobileReordering",
        "16_nesting-flexbox/NestingFlexbox",
        "17_pricing-grid/PricingGrid",
        "18_equal-height-elements/EqualHeightElements",
        "19_flexbox-form/FlexboxForm",
        "20_flexbox-app-layout/FlexboxAppLayout",
    ];

    const wesBoxGridLinks = [
        "24_responsive-website/ResponsiveWebsite",
        "25_full-bleed-layout/FullBleedLayout",
    ];

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageNav title="main" subTitle="page" />
            <ul>
                {wesBoxGridLinks.map(value => {
                    return (
                        <li key={value}>
                            <Link href={`wesbos/grid/${value}`}>
                                <a>{value}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <ul>
                {wesBosFlexLinks.map(value => {
                    return (
                        <li key={value}>
                            <Link href={`wesbos/flex/${value}`}>
                                <a>{value}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Home;
