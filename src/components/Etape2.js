import "../styles/etape2.scss";
import {useState,useEffect,useRef} from "react";
import { useSelector,useDispatch} from "react-redux";
import { selectCode,selectTelephone,setEtape } from "../features/counterSlice";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Modal from "../screens/admin/components/Modal";
import ModifierNumero from "./ModifierNumero";

const Etape2=({generate_code})=>{
    const dispatch=useDispatch ();
    const telephone=useSelector (selectTelephone);
    const code=useSelector(selectCode);
    const [open,set_open]=useState(false);
    const [alerte,set_alerte]=useState("");
    const [input_code,set_input_code]=useState("");
    const ref=useRef(null);
    const close_modal=()=>{
        set_open(false);
    }

    const renvoi_code=()=>{
        
        generate_code();
        set_alerte("Code renvoyé");
        setTimeout(()=>{
            set_alerte("");
        },3000) 
        
    }

    useEffect(()=>{
        if(input_code.length<6) {
            ref.current.style.borderBottom="1px solid silver";
            return;
        }
        if(code!=input_code){
            ref.current.style.borderBottom="2px solid red";
            return;
        }

        set_alerte("Patientez...");
        ref.current.disabled=true;
        setTimeout(()=>{
            dispatch(setEtape(3));
        },3000)
        

    },[input_code]);
    return(
        <div className="etape2">
            <p>Saisissez le code à 6 chiffre qui est envoyé sur votre numéro de téléphone 
                 <label style={{marginLeft:"0.1rem"}}>{telephone}</label>. <button onClick={e=>set_open(true)}>Numéro erroné ?</button>
            </p>

            <div className="line">
                <div>
                    <input type="tel" maxLength={6} autoFocus 
                    ref={ref}
                    value={input_code} onChange={e=>set_input_code(e.target.value)}
                   />
                </div>
            </div>
            <button onClick={renvoi_code}>
                <label>Code Non recu ? <span>Renvoyer le code</span></label>
            </button>

            <div className="line">
                <p>{alerte}</p>
            </div>

            {open==true && <Modal click={close_modal} content={<ModifierNumero  click={close_modal}/>} width={200} />}
        </div>
    );
}
export default Etape2;