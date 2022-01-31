import HeaderBack from "../components/HeaderBack";
import "../styles/acheter.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectLivre,selectEtape,selectCode,selectTelephone, setCode} from "../features/counterSlice";
import Etape1 from "../components/Etape1";
import {navigate} from "react-router-dom";
import Etape2 from "../components/Etape2";
import Etape3 from "../components/Etape3";

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
                </div>
                <div className="bottom">
                    Etape {etape} sur 4 
                    <label>
                        {code}
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Acheter;