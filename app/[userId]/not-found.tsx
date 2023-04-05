import NotFoundAnim from "../components/errors/NotFoundAnim"

export default function NotFound() {
    const message = "Seems that the user you were looking for is not here..."

    return (
        <NotFoundAnim message={message} />
    );
}
