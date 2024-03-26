// importing stylesheet
import "../style/home.css";

export default function Home() {
    return (
        <>
            <h1 className="title txt-ctr">Welcome to BeautyBasket</h1>
            <h1 className="subtitle txt-ctr">Discover Your Beauty Essentials at Beauty Basket</h1>
            <img
                className="home-main"
                src={
                    process.env.PUBLIC_URL +
                    "/images/home-main.png"
                }
                alt="shop logo"
            ></img>
        </>
    );
};
