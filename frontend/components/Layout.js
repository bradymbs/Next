import Head from "next/head";

const Home = ({
    title = "Coolest Todo App Ever",
    description = "Coolest Todo App Ever",
    keywords = "todo",
    children,
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <div className="container">{children}</div>
        </>
    );
};

export default Home;
