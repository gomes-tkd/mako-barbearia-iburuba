import Image from "next/image";

export default function CartaoFidelidade() {
    return <Image
        src={"/assets/cartao-fidelidade.png"}
        alt={"Cartao Fidelidade"}
        width={2607}
        height={1531}
        priority={true}
    />
}
