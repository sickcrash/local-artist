import { useNavigate } from "react-router-dom";
import { useAuth } from "../componenti/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"

function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate()
  const [datiUtente, setDatiUtente] = useState("")

  useEffect(() => {
    const ottieniDati = async () => {
      const retrieved = await getDoc(doc(db, "utenti", currentUser.uid));
      if (retrieved.data()) setDatiUtente(retrieved.data())
    }
    ottieniDati()
  }, [])

  const handleLogout = async (e) => {
    try {
      await logout();
      navigate("/")
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const setPersonalField = async () => {
    await setDoc(doc(db, "utenti", currentUser.uid), {
      nickname: "",
      city: "",
      preferenze: ""
    })
  }
  
  const updateProfile = (elemento) => {
    switch (elemento) {
      case "nickname":
        const setNickname = async () => {
          await updateDoc(doc(db, "utenti", currentUser.uid), {
            nickname: document.getElementById("nickname").value
          })
          window.location.reload(false);
        }
        setNickname().catch((error) => setPersonalField()).then(() => setNickname())
        break
      case "city":
        const setCity = async () => {
          const retrieved = await updateDoc(doc(db, "utenti", currentUser.uid), {
            city: document.getElementById("city").value
          })
          window.location.reload(false);
        }
        setCity().catch((error) => setPersonalField())
        break
    }
  }

  return (
    <div className="main">
      <div className="profile-picture">
        <img src="https://picsum.photos/200" alt="Foto Profilo" />
      </div>
      <h2>Benvenuto, {currentUser ? currentUser.email : 'Ospite'}!</h2>
      <br />
      <section>
        <p>Nome d'arte</p>
        <input type="text" value={datiUtente.nickname ? datiUtente.nickname : ""} disabled />
        <input type="text" placeholder="Nuovo nome" id="nickname" />
        <button style={{ backgroundColor: "gray", padding: "0.5vw" }} onClick={() => updateProfile("nickname")}>Aggiorna</button>
      </section>
      <section>
        <p>Città</p>
        <input type="text" value={datiUtente.city ? datiUtente.city : ""} disabled />
        <input type="text" placeholder="Nuova città" id="city" />
        <button style={{ backgroundColor: "gray", padding: "0.5vw" }} onClick={() => updateProfile("city")}>Aggiorna</button>
      </section>
      <br />
      {currentUser && <button
        onClick={handleLogout}
        style={{ paddingInline: "5vw" }}>Esci</button>}
    </div>
  );
}

export default Home;