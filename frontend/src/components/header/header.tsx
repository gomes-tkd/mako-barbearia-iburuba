import Link from 'next/link';
import styles from "./header.module.css";
export default async function Header() {

    return (
        <header className={styles.headerBg}>
            <nav className={`${styles.header} container`}>
                <Link href={"/"}>Home</Link>
                <Link href={"/login"}>Login | Entrar</Link>
            </nav>
        </header>
    )
}
