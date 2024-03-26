export default function LoadingBox() {
    return (
        <>
            <img
                src={
                    process.env.PUBLIC_URL +
                    "/images/loading.gif"
                }
                alt="loading annimation"
                className="loading-img"
            />
        </>
    );
};
