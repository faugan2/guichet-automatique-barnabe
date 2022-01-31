import "../styles/etape3.scss";
import {useState,useEffect,useRef} from "react";

const Etape3=()=>{
    const joindre_piece=(e)=>{
        ref.current.click();
    }

    const file_changed=()=>{
        set_alerte("");
        const files=ref.current.files;
        if(files.length==0){
            set_alerte("Aucune pièce n'est choisie");
            return;
        }

        ref2.current.disabled=true;
        set_alerte("Patientez...");

        
        
    }
    const [alerte,set_alerte]=useState("");
    const ref=useRef(null);
    const ref2=useRef(null);
    return(
        <div className="etape3">
            <p>Veillez joindre une image d'une des pièces suivantes:</p>
            <ol>
                <li>Carte d'identité</li>
                <li>Passport</li>
                <li>Permis de conduire</li>
                <li>Carte d'électeur</li>
            </ol>

            <div>
                <p>NB: Votre visage doit être visible sur la pièce jointe</p>
            </div>
            <div>
                <button onClick={joindre_piece} ref={ref2}>Joindre la pièce maintenant</button>
            </div>

            <div>
                <p style={{fontWeight:"normal"}}>{alerte}</p>
            </div>

            <input type="file" ref={ref}  onChange={file_changed} style={{display:"none"}} accept="image/*" />
           
        </div>
    );
}

export default Etape3;