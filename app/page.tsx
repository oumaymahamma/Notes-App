import { getUser } from "@/actions/userActions";
import Todos from "@/components/Todos";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user: any = await currentUser();
  if (!user) {
    return <div>Veuillez vous connecter</div>;
  }

  const fetchedData = await getUser(user?.id);
  console.log("fetchedData:", fetchedData);

  // Si aucune donnée n'est trouvée
  if (!fetchedData || fetchedData.length === 0) {
    return <div>Aucune donnée trouvée pour cet utilisateur</div>;
  }

  const current = fetchedData[0];

  // Si pas de todos
  if (!current.todos) {
    return <div>Pas de todos pour cet utilisateur</div>;
  }

  return (
    <main className="flex items-center justify-between">
      <Todos todos={current.todos} user={current} />
    </main>
  );
}
