import Layout from "@/components/Layout";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <Layout title="Page Not Found">
            <Link href="/">Go Back Home</Link>
        </Layout>
    );
};

export default NotFoundPage;
