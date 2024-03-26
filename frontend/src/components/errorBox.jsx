export default function ErrorBox(props) {
    return (
        <>
        <div className="err-msg">
            {props.message}
        </div>
        </>
    );
};
