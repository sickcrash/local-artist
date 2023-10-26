import { useState } from "react";
import { useAuth } from "../componenti/AuthContext";
import './Home.css';

function Home() {
  const { currentUser, logout } = useAuth();
  const { categoria, setCategoria } = useState("")
  const { primoLivello, setPrimoLivello } = useState("")
  const { secondoLivello, setSecondoLivello } = useState("")

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

  return (
    <div className="main" >
      <h1>LocalTalentHub: scopri chi condivide le tue passioni nella tua stessa città</h1>
      <p>Mettiti in contatto con altri artisti con i tuoi stessi interessi:
        scambia opinioni e inizia nuove collaborazioni.
      </p>
      <h2>Cerca:</h2>
      <div style={{ height: "auto", overflowY: "auto" }}>
        <div style={{ flexDirection: "row", width: "80%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom: "1vw" }}>
          {Object.keys(categorie).map((categoria) => (
            <button style={{ backgroundColor: "#7F0799" }}>{categoria}</button>
          ))}
        </div>
        {categoria ? <div style={{ flexDirection: "row", width: "80%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom: "1vw" }}>
          {categorie["Design"].livello1.map((sottocategoria) => (
            <button style={{ backgroundColor: "#9649CB" }}>{sottocategoria}</button>
          ))}
        </div> : null}
        {primoLivello ? <div style={{ flexDirection: "row", width: "80%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom: "1vw" }}>
          {categorie["Design"].livello2.map((sottocategoria) => (
            <button style={{ backgroundColor: "#0C7489" }}>{sottocategoria}</button>
          ))}
        </div> : null}
      </div>
    </div>
  );
}

export default Home;
