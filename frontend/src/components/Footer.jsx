// importing stylesheet
import "../style/footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <>
            <footer className="footer" id="footer">
                <div className="footer-sections">
                    <div className="foot-section">
                        <img
                            className="footer-logo"
                            src={
                                process.env.PUBLIC_URL +
                                "/images/store-name.png"
                            }
                            alt="footer-logo"
                        />
                        <h1 className="txt-ctr">Beauty Basket</h1>
                    </div>

                    <div
                        className="foot-section">
                        <li className="heading">
                            Store
                        </li>
                        <a onClick={() => { navigate("/shop") }}>View Shop</a>
                    </div>

                    <div className="foot-section">
                        <li className="heading">
                            Social
                        </li>

                        <a href="/">Instagram</a>
                        <a href="/">Youtube</a>
                        <a href="/">Facebook</a>
                    </div>
                    
                    <div className="foot-section">
                        <li className="heading">
                            Categories
                        </li>
                        <a onClick={() => { navigate("/shop") }}>Skincare</a>
                        <a onClick={() => { navigate("/shop") }}>Makeup</a>
                        <a onClick={() => { navigate("/shop") }}>Accessories</a>
                    </div>

                    <div className="foot-section">
                        <li className="heading">
                            About Us
                        </li>

                        <a href="/">BeautyBasket</a>
                    </div>
                </div>
            </footer>
        </>
    );
};
