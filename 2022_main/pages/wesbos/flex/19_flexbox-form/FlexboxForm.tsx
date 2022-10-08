import styles from "./FlexboxForm.module.scss";
import cn from "classnames";
import PageNav from "components/pageNav/PageNav";

function FlexboxForm() {
    return (
        <div className={styles.container}>
            <PageNav title="WesBos" subTitle="flex - FlexboxForm" />

            <div className={styles.content}>
                <form className={styles.flexForm}>
                    <input type="search" placeholder="Where do you want to go?" />

                    <label htmlFor="from">From</label>
                    <input type="date" name="from" />

                    <label htmlFor="from">To</label>
                    <input type="date" name="to" />

                    <select name="" id="">
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guest</option>
                        <option value="3">3 Guest</option>
                        <option value="4">4 Guest</option>
                        <option value="5">5 Guest</option>
                    </select>

                    <input type="submit" value="Search" />
                </form>
            </div>
        </div>
    );
}

export default FlexboxForm;
