import { auth } from "@/auth";
import Navbar from "../components/navbar/navbar";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <Navbar />
      {/* {JSON.stringify(session)} */}
    </main>
  );
}
