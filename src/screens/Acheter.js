import HeaderBack from "../components/HeaderBack";
import "../styles/acheter.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectLivre,selectEtape,selectCode,selectTelephone, setCode, setTelephone, selectResultatDection} from "../features/counterSlice";
import Etape1 from "../components/Etape1";
import {navigate} from "react-router-dom";
import Etape2 from "../components/Etape2";
import Etape3 from "../components/Etape3";
import Etape4 from "../components/Etape4";
import Etape5 from "../components/Etape5";
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from "../screens/admin/components/Modal";
import Resultat from "../components/Resultat";

const Acheter=()=>{
    const [etape,set_etape]=useState(1);
    const livre=useSelector (selectLivre);
    const e=useSelector(selectEtape);
    const navigate=useNavigate ();
    const code=useSelector(selectCode);
    const telephone=useSelector(selectTelephone);
    const dispatch=useDispatch ();
    const result=useSelector(selectResultatDection)

    useEffect(()=>{
        set_etape(e);
    },[e]);

    useEffect(()=>{
        if(livre==null){
            navigate("/livres");
        }
    },[livre]);

    useEffect(()=>{
        if(code=="" || telephone=="") return;

        let new_telephone=telephone.replace(" ","");
        const url=process.env.REACT_APP_EASYSENDSMS_URL;
        /*fetch(`${url}&to=${new_telephone}&text=Votre code de confirmation est : ${code}`,{
            mode: 'no-cors',
        }).then((res)=>{
           console.log("Code envoyé",code);
        }).catch((err)=>{
            console.log("Erreur d'envoyé",err.message);
        })*/


    },[code,telephone])

    const annuler=()=>{
        dispatch(setCode(""));
        dispatch(setTelephone(""));
        navigate("/");
    }

    const generate_code=()=>{
        /*if(code!=null || code!="" ){
            console.log("code deja existant",code);
            dispatch(setCode(""));
            setTimeout(()=>{
                dispatch(setCode(code));
                return;
            },100)
           
            
        }*/
        console.log("genere un nouveau code");
        let new_code="";
        for(var i=0;i<6; i++){
            const c=Math.round(Math.random()*9);
            new_code+=c;
        }
        dispatch(setCode(new_code));
        //return new_code
    }
    const [open,set_open]=useState(false);
    useEffect(()=>{
        if(result==null){
            set_open(false)
            return;
        } 
        set_open(true)
    },[result]);

    const close_modal=()=>{
        //set_open(false);
    }
    return(
        <div className="acheter">
            <HeaderBack title="Identification" />
            <div className="body">
                <div className="top">
                    {etape==1 && <Etape1 generate_code={generate_code} />}
                    {etape==2 && <Etape2 generate_code={generate_code} />}
                    {etape==3 && <Etape3 />}
                    {etape==4 && <Etape4 />}
                    {etape==5 && <Etape5 />}
                </div>
                <div className="bottom">
                    {etape==5 && <button className="annuler" onClick={annuler}>Annuler</button>}
                    <div>
                        Etape {etape} sur 5 
                        <label>
                            {code}
                        </label>
                    </div>
                    {(etape==5 && result==null) && <div className="detection">
                        <CircularProgress  size={15} />
                        <p>Dectection encours...</p>
                    </div>}
                    {result!=null && <div className="result">
                            <p>Resemblance</p>
                            <p>{result.toFixed(2)*100} %</p>
                        </div>}
                   


                </div>
            </div>

            {open==true && <Modal 
                content={<Resultat />}
                open={true}
                click={close_modal}
                width={200}
            />}
        </div>
    );
}

export default Acheter;