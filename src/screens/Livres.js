import HeaderBack from "../components/HeaderBack";
import "../styles/livres.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectLivres,selectMatiere, setLivres,setLivre, setEtape} from "../features/counterSlice";
import Livre from "../components/Livre";
import {useNavigate} from "react-router-dom"

const Livres=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate ();
    const [matiere,set_matiere]=useState("");
    const l=useSelector(selectLivres);
    const m=useSelector(selectMatiere);
    const [data,set_data]=useState([]);
    const [total,set_total]=useState(0);

    useEffect(()=>{
        if(m==null) return;
        set_matiere(m.nom);
    },[m]);

    useEffect(()=>{
        
        if(m==null || l.length==0){
            window.location.href="/";
        };

        const res=l.filter((item)=>{
            return item.matiere==m.id;
        })
        set_total(res.length);
        set_data(res);
    },[l,m]);

    const go_to_livre_detail=(livre)=>{
        dispatch(setLivre(livre))
        dispatch(setEtape(1));
        navigate("/livre-detail")
    }

    return(
        <div className="livres">
            <HeaderBack title={`Tous les livres > ${matiere} (${total})`} />
            <div className="body">
                {
                    total==0 && <div className="line">
                                <p>Aucun livre de la matière selectionnée({matiere}) n'est trouvé</p>
                        </div>
                }

                {
                    data.length >0 && 
                        <div className="mes_livres">
                            {
                                data.map((livre,i)=>{
                                    return(
                                        <Livre key={i} livre={livre} click={go_to_livre_detail.bind(this,livre)} />
                                    );
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}
export default Livres;