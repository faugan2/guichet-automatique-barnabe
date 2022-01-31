import "../styles/historique.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectMe,selectMouvements,setTab} from "../features/counterSlice";
import {useNavigate} from "react-router-dom";

import Mouvement from "./Mouvement";

const Historique=()=>{
    const navigate=useNavigate ();
    const [data,set_data]=useState([]);
    const m=useSelector(selectMouvements);
    const dispatch=useDispatch ();

    useEffect(()=>{
        set_data(m);
    },[m]);

    const go_to_retrait=()=>{
        dispatch(setTab(0));
    }
    return (
        <div className="historique">
            {
                data.length==0 && 
                <div className="line">
                    <p>Aucune photo ou pièce d'identité n'est trouvé dans votre galerie.</p>
                    <p>Commencez une opération d'achat maintenant.</p>

                    <button onClick={go_to_retrait}>
                        Continuez avec un retrait
                    </button>
                </div>
            }

            
        </div>
    );
}
export default Historique;