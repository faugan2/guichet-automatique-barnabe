import HeaderBack from "../components/HeaderBack";
import "../styles/acheter.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectLivre,selectEtape,selectCode,selectTelephone, setCode, setTelephone} from "../features/counterSlice";
import Etape1 from "../components/Etape1";
import {navigate} from "react-router-dom";
import Etape2 from "../components/Etape2";
import Etape3 from "../components/Etape3";
import Etape4 from "../components/Etape4";
import Etape5 from "../components/Etape5";
import CircularProgress from '@material-ui/core/CircularProgress';

const Acheter=()=>{
    const [etape,set_etape]=useState(1);
    const livre=useSelector (selectLivre);
    const e=useSelector(selectEtape);
    const navigate=useNavigate ();
    const code=useSelector(selectCode);
    const telephone=useSelector(selectTelephone);
    const dispatch=useDispatch ();

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
        if(code!=""){
            console.log("code deja existant",code);
            dispatch(setCode(""));
            setTimeout(()=>{
                dispatch(setCode(code));
            },100)
           
            return;
        }
        console.log("genere un nouveau code");
        let new_code="";
        for(var i=0;i<6; i++){
            const c=Math.round(Math.random()*9);
            new_code+=c;
        }
        dispatch(setCode(new_code));
        //return new_code
    }
    console.log("nous somme a letape ",etape," de lachat de",livre)
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
                    {etape==5 && <div className="detection">
                        <CircularProgress  size={15} />
                        <p>Dectection encours...</p>
                    </div>}
                    {etape==6 && <button>Valider</button>}
                   


                </div>
            </div>
        </div>
    );
}

export default Acheter;