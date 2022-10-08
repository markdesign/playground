import { useRouter } from "next/router";
import { PageHeader } from "antd";

const PageNav = props => {
    const router = useRouter();
    const { title = "title goes here", subTitle = "sub title goes here" } = props;
    const onBack = () => {
        console.log("back");
        router.push("/");
    };
    return <PageHeader className="site-page-header" onBack={onBack} title={title} subTitle={subTitle} />;
};

export default PageNav;
