import Fidelidade from "@/components/perfil/fidelidade/fidelidade";
import Servicos from "@/components/servicos/servicos";
import ServicosPage from "@/app/servicos/page";

export default function Home() {
  return (
    <section className={"container mainContainer"}>
      <h1>Olá main!!</h1>
        <ServicosPage />
    </section>
  );
}
