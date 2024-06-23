export default function ErrorMessage({ message }: { message: string }) {
    if (message === null) {
        return null;
    }

    return (
        <p style={{ color: "#f00", margin: "1rem 0" }}>{message}</p>
    )
}
