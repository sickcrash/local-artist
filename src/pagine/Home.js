import { useAuth } from "../componenti/AuthContext";
import './Home.css';

function Home() {
  const { currentUser, logout } = useAuth();
  return (
    <div>
      <h1>LocalTalentHub: scopri chi condivide le tue passioni nella tua stessa città</h1>
      <p>Mettiti in contatto con altri artisti con i tuoi stessi interessi:
        scambia opinioni e inizia nuove collaborazioni.
      </p>
    </div>
  );
}

export default Home;
