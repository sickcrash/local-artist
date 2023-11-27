import { useEffect, useState } from "react";
import { useAuth } from "../componenti/AuthContext";
import './Home.css';
import { useNavigate } from "react-router-dom";
import setPersonalField from "./Dashboard.js"
import { db } from "../firebase.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function Home() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [categoria, setCategoria] = useState("")
  const [primoLivello, setPrimoLivello] = useState("")
  const [secondoLivello, setSecondoLivello] = useState("")
  const [loading, setLoading] = useState(true)

  const categorie = {
    "Musica": {
      livello1: ["canto", "strumenti", "studio", "live"],
      livello2: ["Pop e Indie", "Raggaeton", "Rap e Hip Hop", "Rock e Metal",
        "Classica", "Elettronica, Techno e Disco", "Jazz e Blues", "Gospel e Soul", "Funk e Raggae", "altro"
      ]
    },
    "Arti visive": {
      livello1: ["pittura", "scultura", "disegno", "fotografia", "3D modeling"],
      livello2: ["ritrattistica", "paesaggistica", "animali", "natura morta", "astrattismo",
        "concettuale", "fantasy", "altro"
      ]
    },
    "Design": {
      livello1: ["graphic design", "product design", "logo design"],
      livello2: ["flat e minimalismo", "massimalismo", " art dèco", "geometrico", "retrò",
        "corporate", "brutalismo", "media blending", "altro"
      ]
    }
  }

  useEffect(() => {
    if (currentUser) {
      const ottieniDati = async () => {
        const retrieved = await getDoc(doc(db, "preferenze_utenti", currentUser.uid));
        if (retrieved.data()) {
          setCategoria(retrieved.data()["preferenze"]["categoria"])
          setPrimoLivello(retrieved.data()["preferenze"]["primoLivello"])
          setSecondoLivello(retrieved.data()["preferenze"]["secondoLivello"])
        }
      }
      ottieniDati()
      setLoading(false)
    }
  }, [])

  const setPreferenze = () => {
    const updatePreferenze = async () => {
      await updateDoc(doc(db, "preferenze_utenti", currentUser.uid), {
        preferenze: { categoria, primoLivello, secondoLivello }
      })
    }
    const setPersonalField = async () => {
      await setDoc(doc(db, "preferenze_utenti", currentUser.uid), {
        preferenze: { categoria, primoLivello, secondoLivello }
      })
    }
    updatePreferenze().catch((error) => setPersonalField()).then(() => updatePreferenze())
  }

  const cercaMatch = () => {
  }

  useEffect(() => {
    if (!loading && currentUser) setPreferenze()
  }, [secondoLivello])

  return (
    <div className="main" style={{ overflowY: "scroll" }} >
      <h1>LocalTalentHub: scopri chi condivide le tue passioni nella tua stessa città</h1>
      <p>Mettiti in contatto con altri artisti con i tuoi stessi interessi:
        scambia opinioni e inizia nuove collaborazioni.
      </p>
      {secondoLivello ?
        <div>
          <h2>Le tue preferenze: {categoria}, {primoLivello}, {secondoLivello}</h2>
          <div style={{ width: "100%", flexDirection: "row", gap: "1vw" }}>
            <button style={{ backgroundColor: "green" }} onClick={() => cercaMatch()}>
              <ion-icon name="color-wand-outline"></ion-icon> cerca match
            </button>
            <button style={{ backgroundColor: "grey" }} onClick={() => { setCategoria(""); setPrimoLivello(""); setSecondoLivello("") }}>
              <ion-icon name="shuffle-outline"></ion-icon>cambia preferenze
            </button>
          </div>
        </div>
        : null}
      {secondoLivello ? null :
        <div><h2>Imposta preferenze:</h2>
          <div style={{ height: "auto", overflowY: "auto" }}>
            <div style={{ flexDirection: "row", width: "100%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom: "1vw" }}>
              {Object.keys(categorie).map((singolaCategoria) => (
                <div>
                  {categoria == singolaCategoria ?
                    <button style={{ backgroundColor: "#7F0799", border: "3px solid black" }}>
                      {singolaCategoria}
                    </button>
                    :
                    <button style={{ backgroundColor: "#7F0799" }}
                      onClick={() => {
                        if (currentUser) {
                          setCategoria(singolaCategoria);
                          setPrimoLivello("");
                          setSecondoLivello("")
                        }
                        else navigate("/login")
                      }}>
                      {singolaCategoria}
                    </button>
                  }
                </div>
              ))}
            </div>
            {categoria ? <div style={{ flexDirection: "row", width: "100%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom: "1vw" }}>
              {categorie[categoria].livello1.map((sottocategoria) => (
                <div>
                  {primoLivello == sottocategoria ?
                    <button style={{ backgroundColor: "#9649CB", border: "3px solid black" }}>
                      {sottocategoria}
                    </button>
                    :
                    <button style={{ backgroundColor: "#9649CB" }} onClick={() => setPrimoLivello(sottocategoria)}>
                      {sottocategoria}
                    </button>
                  }
                </div>
              ))}
            </div> : null}
            {primoLivello ? <div style={{ flexDirection: "row", width: "100%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom: "1vw" }}>
              {categorie[categoria].livello2.map((sottocategoria) => (
                <div>
                  {secondoLivello == sottocategoria ?
                    <button style={{ backgroundColor: "#0C7489", border: "3px solid black" }}>
                      {sottocategoria}
                    </button>
                    :
                    <button style={{ backgroundColor: "#0C7489" }} onClick={() => {
                      setSecondoLivello(sottocategoria)
                    }
                    }>
                      {sottocategoria}
                    </button>
                  }
                </div>
              ))}
            </div> : null}
          </div>
        </div>}
      <br />
      <div style={{flexDirection:"row", flexWrap:"wrap", gap:"2vw", width:"80%", justifyContent:"center"}}>
        <div class="user-info-window">
          <img src="https://picsum.photos/200/200" alt="Immagine Profilo" />
          <h2>Nome Utente</h2>
          <p>Descrizione dell'utente</p>
          <button class="contact-button">Contattami</button>
        </div>
        <div class="user-info-window">
          <img src="https://picsum.photos/200/200" alt="Immagine Profilo" />
          <h2>Nome Utente</h2>
          <p>Descrizione dell'utente</p>
          <button class="contact-button">Contattami</button>
        </div>
        <div class="user-info-window">
          <img src="https://picsum.photos/200/200" alt="Immagine Profilo" />
          <h2>Nome Utente</h2>
          <p>Descrizione dell'utente</p>
          <button class="contact-button">Contattami</button>
        </div>
        <div class="user-info-window">
          <img src="https://picsum.photos/200/200" alt="Immagine Profilo" />
          <h2>Nome Utente</h2>
          <p>Descrizione dell'utente</p>
          <button class="contact-button">Contattami</button>
        </div>
        <div class="user-info-window">
          <img src="https://picsum.photos/200/200" alt="Immagine Profilo" />
          <h2>Nome Utente</h2>
          <p>Descrizione dell'utente</p>
          <button class="contact-button">Contattami</button>
        </div>
      </div>
      <br/><br/>
    </div>
  );
}

export default Home;
