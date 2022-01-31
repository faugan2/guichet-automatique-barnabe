import "../styles/recherche.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectMe,selectMouvements, selectSearch} from "../features/counterSlice";
import {useNavigate} from "react-router-dom";

import Mouvement from "../components/Mouvement";

import HeaderRecherche from "../components/HeaderRecherche";
const Recherche=()=>{
    const navigate=useNavigate ();
    const [data,set_data]=useState([]);
    const m=useSelector(selectMouvements);
    const search=useSelector(selectSearch);

    useEffect(()=>{
        set_data(m);
    },[m]);

    const go_to_retrait=()=>{
        navigate("/retrait");
    }

    useEffect(()=>{
        if(search==""){
            set_data(m);
            return;
        }

        const res=m.filter((item)=>{
            let date=new Date(item.date?.seconds*1000).toUTCString()

            return item.montant.indexOf(search)>=0 ||
            date.toLowerCase().indexOf(search.toLowerCase())>=0
            ;
        })
        set_data(res);
    },[search]);

    return (
        <div className="recherche">

            <HeaderRecherche />
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
export default Recherche;