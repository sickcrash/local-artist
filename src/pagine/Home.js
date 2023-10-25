import { useAuth } from "../componenti/AuthContext";
import './Home.css';

function Home() {
  const { currentUser, logout } = useAuth();
  return (
    <div className="main" >
      <h1>LocalTalentHub: scopri chi condivide le tue passioni nella tua stessa città</h1>
      <p>Mettiti in contatto con altri artisti con i tuoi stessi interessi:
        scambia opinioni e inizia nuove collaborazioni.
      </p>
      <h2>Cerca:</h2>
      <div style={{height:"auto", overflowY:"auto"}}>
        <div style={{flexDirection: "row", width: "60%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom:"1vw" }}>
          <button style={{ backgroundColor: "#7F0799" }}>Artisti simili</button>
          <button style={{ backgroundColor: "#7F0799" }}>Artisti complementari</button>
          <button style={{ backgroundColor: "#7F0799" }}>Artisti specifici</button>
        </div>
        <div style={{ flexDirection: "row", width: "60%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom:"1vw" }}>
          <button style={{ backgroundColor: "#9649CB" }}>Musica</button>
          <button style={{ backgroundColor: "#9649CB" }}>Arti visive</button>
          <button style={{ backgroundColor: "#9649CB" }}>Design</button>
        </div>
        <div style={{ flexDirection: "row", width: "60%", flexWrap: "wrap", gap: "1vw", justifyContent: "center", marginBottom:"1vw" }}>
          <button style={{ backgroundColor: "#0C7489" }}>Pittura</button>
          <button style={{ backgroundColor: "#0C7489" }}>Scultura</button>
          <button style={{ backgroundColor: "#0C7489" }}>Disegno</button>
          <button style={{ backgroundColor: "#0C7489" }}>3D Modeling</button>
          <button style={{ backgroundColor: "#0C7489" }}>Fotografia</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
