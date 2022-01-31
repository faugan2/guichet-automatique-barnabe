import "../styles/etape3.scss";
import {useState,useEffect,useRef} from "react";
import {storage} from "../connexion_base";
import { useDispatch,useSelector } from "react-redux";
import {setPiece,setEtape} from "../features/counterSlice";
import CircularProgress from '@material-ui/core/CircularProgress';

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

        //ref2.current.disabled=true;
        set_sending(true);
        set_alerte("Patientez...");
        const file=files[0];
        const file_ref=storage.ref("image/"+file.name);

        file_ref.put(file).then(()=>{
            file_ref.getDownloadURL().then((url)=>{
                dispatch(setPiece(url));
                dispatch(setEtape(4));

            }).catch((err)=>{
                //ref2.current.disabled=false;
                set_alerte(err.message);
            })
        }).catch((err)=>{
            //ref2.current.disabled=false;
            set_alerte(err.message);
        })

        
    }
    const [alerte,set_alerte]=useState("");
    const ref=useRef(null);
    const ref2=useRef(null);
    const dispatch=useDispatch ();
    const [sending,set_sending]=useState(false);
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
                {sending==false && <button onClick={joindre_piece} ref={ref2}>Joindre la pièce maintenant</button>}
               {sending==true && <CircularProgress  />} 
            </div>

            <div>
                <p style={{fontWeight:"normal"}}>{alerte}</p>
            </div>

            <input type="file" ref={ref}  onChange={file_changed} style={{display:"none"}} accept="image/*" />
           
        </div>
    );
}

export default Etape3;