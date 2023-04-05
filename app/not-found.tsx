import NotFoundAnim from "./components/errors/NotFoundAnim";

export default function NotFound() {
    const message = "The page you're looking for doesn't exist here..."

    return (
        <NotFoundAnim message={message} />
    );
}
