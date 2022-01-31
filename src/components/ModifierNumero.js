import "../styles/modifier_numero.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {setTelephone} from "../features/counterSlice";
import CallIcon from '@material-ui/icons/Call';
const ModifierNumero=({click})=>{
    const change_number=async (e)=>{
        set_alerte("");
        if(telephone== ""){
            set_alerte("Le telephone est vide");
            return;
        }

        dispatch(setTelephone(telephone));
        click();


        
    }
    const dispatch=useDispatch ();
    const [alerte,set_alerte]=useState("");
    const [telephone,set_telephone]=useState("");
    return(
        <div className="modifier_numero">
            <div className="line">
                <label>Saisissez le nouveau  numéro</label>
                <div>
                    <input type="tel" autoFocus placeholder="+228 91 56 75 90"
                    value={telephone} onChange={e=>set_telephone(e.target.value)}
                    />
                    <CallIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                </div>
            </div>

            <div className="line">
                <button onClick={change_number}>Valider</button>
            </div>

            {alerte!="" && <div className="line">
                <p>{alerte}</p>
            </div>}
        </div>
    );
}
export default ModifierNumero;