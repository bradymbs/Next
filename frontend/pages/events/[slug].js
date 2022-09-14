import { useRouter } from "next/router";
import Link from "next/link";

const EventPage = () => {
    const router = useRouter();

    console.log(router);
    return (
        <>
            <h1>My Event</h1>
            <h3>{router.query.slug}</h3>
            <button onClick={() => router.push("/")}>Home</button>
            <Link href="/events">Events</Link>
        </>
    );
};

export default EventPage;
