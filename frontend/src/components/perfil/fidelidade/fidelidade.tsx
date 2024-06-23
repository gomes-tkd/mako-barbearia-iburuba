import styles from "./fidelidade.module.css";
import Image from "next/image";

export default function Fidelidade() {
    return (
        <div className={styles.fidelidadeGrid}>
            <Image
                src={"/assets/img.png"}
                alt={"Imagem do cartão fidelidade"}
                width={2940}
                height={1960}
                priority={true}
            />
            <div className={styles.fidelidadeDias}>
                <div>
                    <p>10</p>
                    <p>20</p>
                    <p>30</p>
                    <p>40</p>
                </div>
                <div>
                    <p>50</p>
                    <p>60</p>
                    <p>70</p>
                    <p>80</p>
                </div>
                <div>
                    <p>90</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>
            </div>

        </div>
    )
}
