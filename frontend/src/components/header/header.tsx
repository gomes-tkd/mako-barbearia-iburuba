import Link from 'next/link';
import styles from "./header.module.css";
import getUser from "@/app/actions/get-user";
import SairButton from "@/components/perfil/sair-button/sair-button";

export default async function Header() {
    const { data } = await getUser();

    return (
        <header className={styles.headerBg}>
            <nav className={`${styles.header} container`}>
                <Link href={"/"}>Home</Link>
                {data ? (
                    <div className={styles.sairBtnContainer}>
                        <Link className={styles.login} href={'/conta'}>Minha conta</Link>
                        <SairButton />
                    </div>
                ) : (
                    <Link href={"/login"}>Login | Entrar</Link>
                )}
            </nav>
        </header>
    )
}
