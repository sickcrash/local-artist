import { useNavigate } from "react-router-dom";
import { useAuth } from "../componenti/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"

function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate()
  const [datiUtente, setDatiUtente] = useState("")

  useEffect(() =>{
    const ottieniDati = async () => {
      const retrieved = await getDoc(doc(db, "utenti", currentUser.uid));
      setDatiUtente(retrieved.data())
    }
    ottieniDati()
    // il retrieve avviene con successo
  },[])

  const handleLogout = async (e) => {
    try {
      await logout();
      navigate("/")
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div>
      <div class="profile-picture">
        <img src="https://picsum.photos/200" alt="Foto Profilo" />
      </div>
      <h2>Benvenuto, {currentUser ? currentUser.email : 'Ospite'}!</h2>
      <br />
      <section>
        <p>Nome d'arte</p>
        <input type="text" value={datiUtente.nickname} disabled />
        <input type="text" placeholder="Nuovo nome" />
        <button style={{ backgroundColor: "gray" }}>Aggiorna</button>
      </section>
      <section>
        <p>Città</p>
        <input type="text" value={datiUtente.city} disabled />
        <input type="text" placeholder="Nuova città" />
        <button style={{ backgroundColor: "gray" }}>Aggiorna</button>
      </section>
      <br />
      {currentUser && <button 
        onClick={handleLogout}
        style={{paddingInline:"5vw"}}>Esci</button>}
    </div>
  );
}

export default Home;