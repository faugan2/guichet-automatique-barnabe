import "../styles/etape3.scss";
import {useState,useEffect,useRef} from "react";
import {storage} from "../connexion_base";
import { useDispatch,useSelector } from "react-redux";
import {setPiece,setEtape,setVisage} from "../features/counterSlice";
import CircularProgress from '@material-ui/core/CircularProgress';
const Etape4=()=>{
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
                dispatch(setVisage(url));
                dispatch(setEtape(5));

            }).catch((err)=>{
                //ref2.current.disabled=false;
                set_alerte(err.message);
            })
        }).catch((err)=>{
           // ref2.current.disabled=false;
            set_alerte(err.message);
        })

        
    }
    const [alerte,set_alerte]=useState("");
    const ref=useRef(null);
    const ref2=useRef(null);
    const [sending,set_sending]=useState(false);
    const dispatch=useDispatch ();
    return(
        <div className="etape3">
            <p>Veillez prendre une photo de votre visage avec la caméra de votre téléphone</p>
            

            
            <div>
                {sending==false && <button onClick={joindre_piece} ref={ref2}>Prendre la photo maintenant</button>}
                {sending==true && <CircularProgress />}
            </div>

            <div>
                <p style={{fontWeight:"normal"}}>{alerte}</p>
            </div>

            <input type="file" ref={ref}  onChange={file_changed} style={{display:"none"}} accept="image/*" />
           
        </div>
    );
}

export default Etape4;