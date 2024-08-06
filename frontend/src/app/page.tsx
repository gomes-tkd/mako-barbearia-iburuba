import TodosComentarios from "@/components/todos-comentarios/todos-comentarios";

export default function Home() {
  return (
    <section className={"container mainContainer"}>
      <h1>Olá main!!</h1>
        <TodosComentarios />
    </section>
  );
}
