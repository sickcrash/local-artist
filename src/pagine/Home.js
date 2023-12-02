import { useEffect, useState } from "react";
import { useAuth } from "../componenti/AuthContext";
import './Home.css';
import { useNavigate } from "react-router-dom";
import setPersonalField from "./Dashboard.js"
import { db } from "../firebase.js";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

function Home() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [categoria, setCategoria] = useState("")
  const [primoLivello, setPrimoLivello] = useState("")
  const [secondoLivello, setSecondoLivello] = useState("")
  const [loading, setLoading] = useState(true)
  const [isMatching, setIsMatching] = useState(false)
  const [datiUtente, setDatiUtente] = useState("")
  const [artisti, setArtisti] = useState([])
  const [infoArtisti, setInfoArtisti] = useState([])

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

  const matchingState = () => {
    if (isMatching) setIsMatching(false)
    else setIsMatching(true)
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

  useEffect(() => {
    if (currentUser) {
      const ottieniDati = async () => {
        const retrieved = await getDoc(doc(db, "utenti", currentUser.uid));
        if (retrieved.data()) setDatiUtente(retrieved.data())
      }
      ottieniDati()
    }
  }, [])

  useEffect(() => {
    if (!loading && currentUser) setPreferenze()
  }, [secondoLivello])

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

  const cercaSimili = async () => {
    setArtisti([])
    const retrieved = await getDocs(query(
      collection(db, "preferenze_utenti"),
      where("preferenze.categoria", "==", categoria),
      where("preferenze.primoLivello", "==", primoLivello)
    ))
    const promises = retrieved.docs
      .filter(miodoc => miodoc.id != currentUser.uid)
      .map(async (miodoc) => {
        const utenteId = miodoc.id;
        const utenteRef = doc(db, "utenti", utenteId);
        const utenteSnap = await getDoc(utenteRef);
        if (utenteSnap.exists()) {
          const utenteData = utenteSnap.data();
          return {
            ...miodoc.data().preferenze,
            id: utenteId,
            nickname: utenteData.nickname,
            city: utenteData.city
          };
        }
        return null;
      });
    const results = await Promise.all(promises);
    const filteredResults = results.filter(result => result !== null);
    console.log(filteredResults)
    setArtisti(filteredResults)
    document.getElementById("artistiSimili").style.border = "3px solid black"
    document.getElementById("artistiComplementari").style.border = ""
  }

  const cercaComplementari = async () => {
    setArtisti([])
    const retrieved = await getDocs(query(
      collection(db, "preferenze_utenti"),
      where("preferenze.categoria", "==", categoria),
      where("preferenze.secondoLivello", "==", secondoLivello)
    ))
    const mappatura = retrieved.docs.filter(doc => doc.id !== currentUser.uid).map((doc) => ({ ...doc.data(), id: doc.id }))
    setArtisti(mappatura)
    document.getElementById("artistiComplementari").style.border = "3px solid black"
    document.getElementById("artistiSimili").style.border = ""
  }



  return (
    <div className="main" style={{ overflowY: "scroll" }} >
      <br />
      <h2>LocalTalentHub: scopri chi condivide le tue passioni nella tua stessa città</h2>
      <p>Mettiti in contatto con altri artisti con i tuoi stessi interessi:
        scambia opinioni e inizia nuove collaborazioni.
      </p>
      {secondoLivello && datiUtente.nickname && datiUtente.city && !loading ?
        <div>
          <h3 style={{ margin: "0", gap: "0.5vw" }}><ion-icon name="brush"></ion-icon> Le tue preferenze: {categoria}, {primoLivello}, {secondoLivello}</h3>
          <h3 style={{ gap: "0.5vw" }}><ion-icon name="location"></ion-icon>{datiUtente.nickname}, stai cercando presso: {datiUtente.city}</h3>
          <div style={{ width: "100%", flexDirection: "row", gap: "1vw", justifyContent: "center" }}>
            {isMatching ?
              <button style={{ backgroundColor: "green", border: "3px solid black" }} onClick={() => matchingState()}>
                <ion-icon name="color-wand-outline"></ion-icon> <b>avvia matching</b>
              </button>
              :
              <button style={{ backgroundColor: "green" }} onClick={() => matchingState()}>
                <ion-icon name="color-wand-outline"></ion-icon> <b>avvia matching</b>
              </button>
            }
            <button style={{ backgroundColor: "grey" }}
              onClick={() => { setCategoria(""); setPrimoLivello(""); setSecondoLivello("") }}>
              <ion-icon name="shuffle-outline"></ion-icon>cambia preferenze
            </button>
          </div>
          <br />
          {isMatching ?
            <div style={{ width: "100%", flexDirection: "row", gap: "1vw", justifyContent: "center" }}>
              <button id="artistiSimili" style={{ backgroundColor: "orange" }} onClick={() => cercaSimili()}>
                <ion-icon name="people-circle-outline"></ion-icon> <b>artisti <br /> simili</b>
              </button>
              <button id="artistiComplementari" style={{ backgroundColor: "salmon" }} onClick={() => cercaComplementari()}>
                <ion-icon name="people-circle"></ion-icon> <b>artisti <br /> complementari</b>
              </button>
            </div>
            : null}
        </div>
        : secondoLivello && !loading ?
          <div>
            <p>Non hai ancora aggiornato nickname e città!</p>
            <button style={{ backgroundColor: "grey" }}
              onClick={() => { navigate("/dashboard") }}>
              <ion-icon name="arrow-redo-circle-outline"></ion-icon> Vai alla Dashboard
            </button>
          </div>
          :
          null
      }
      {secondoLivello ? null :
        <div><h2>Imposta preferenze:</h2> <br />
          <div style={{ height: "auto", overflowY: "auto" }}>
            <div style={{ flexDirection: "row", width: "100%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom: "1vw" }}>
              {Object.keys(categorie).map((singolaCategoria) => (
                <div key={singolaCategoria}>
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
                <div key={sottocategoria}>
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
                <div key={sottocategoria}>
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
      {currentUser && artisti != [] ?
        <div style={{ flexDirection: "row", flexWrap: "wrap", gap: "2vw", width: "80%", justifyContent: "center" }}>
          {artisti.map((artista) => {
            return (
              <div key={artista.id} className="user-info-window" style={{ width: "27vw", overflow: "hidden" }}>
                <img src="https://picsum.photos/200/200" alt="Immagine Profilo" />
                <h2>{artista.nickname}, {artista.city} </h2>
                <p>{artista.categoria}, {artista.primoLivello}, {artista.secondoLivello}</p>
                <button className="contact-button">Contattami</button>
              </div>
            )
          })}
        </div>
        : null}
      <br /><br />
    </div>
  );
}

export default Home;
