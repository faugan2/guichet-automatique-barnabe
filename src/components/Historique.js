import "../styles/historique.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectMe,selectMouvements} from "../features/counterSlice";
import {useNavigate} from "react-router-dom";

import Mouvement from "./Mouvement";

const Historique=()=>{
    const navigate=useNavigate ();
    const [data,set_data]=useState([]);
    const m=useSelector(selectMouvements);

    useEffect(()=>{
        set_data(m);
    },[m]);

    const go_to_retrait=()=>{
        navigate("/retrait");
    }
    return (
        <div className="historique">
            {
                data.length==0 && 
                <div className="line">
                    <p>Aucun mouvement n'est trouvé sur votre compte.</p>
                    <p>Commencez une opération de retrait maintenant.</p>

                    <button onClick={go_to_retrait}>
                        Continuez avec un retrait
                    </button>
                </div>
            }

            {
                data.length>0 && 
                <div className="mouvements">
                    {
                        data.map((m,i)=>{
                            return(
                               <Mouvement key={m.key} mouvement={m}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}
export default Historique;