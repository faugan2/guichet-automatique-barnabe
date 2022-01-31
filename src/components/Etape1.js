import CallIcon from '@material-ui/icons/Call';
import "../styles/etape1.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {setEtape,setResultatDetection,setTelephone} from "../features/counterSlice";

import {setCode,selectCode} from "../features/counterSlice";

const Etape1=({generate_code})=>{
    const dispatch=useDispatch ();
    const send_code_via_sms=async(e)=>{
        set_alerte("");
        if(telephone==""){
            set_alerte("Vous devez saisir un numéro telephone");
            setTimeout(()=>{
                set_alerte("");
            },3000)
            return;
        }

        if(code==""){
            generate_code();
        }

        dispatch(setTelephone(telephone));
        dispatch(setEtape(2));
       
        
    }

    const [telephone,set_telephone]=useState("");
    const [alerte,set_alerte]=useState("");
    const [code,set_code]=useState("");
    const c=useSelector(selectCode);

    useEffect(()=>{
        generate_code();
        dispatch(setResultatDetection(null))
    },[]);

   
    useEffect(()=>{
        set_code(c);
    },[c])
    return(
        <div className="etape1">
           <p>Veuillez saisir votre numéro de téléphone</p>
           <div className="line">
               <div>
                   <input type="tel" placeholder="+228 92 95 08 03" 
                   autoFocus
                   value={telephone} onChange={e=>set_telephone(e.target.value)} />
                   <CallIcon style={{color:"gray",fontSize:"1.2rem"}} />
               </div>
           </div>

           <div className="line">
               <button onClick={send_code_via_sms}>Continuez</button>
           </div>

           <div className="line">
               <p>{alerte}</p>
           </div>
        </div>
    );
}

export default Etape1;