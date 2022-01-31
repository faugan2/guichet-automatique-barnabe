import HeaderBack from "../components/HeaderBack";
import "../styles/livre_detail.scss";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Livre from "../components/Livre";
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectLivre} from "../features/counterSlice";
import {useNavigate} from "react-router-dom"
const LivreDetail=()=>{
    const livre=useSelector (selectLivre);
    const navigate=useNavigate ();
    const click=()=>{

    }

    const acheter=(e)=>{
        navigate("/acheter");
    }

    
    useEffect(()=>{
        if(livre==null){
            navigate("/");
        }
    },[livre]);


    return(
        <div className="livre_detail">
            <HeaderBack title="Detail du livre" />
            <div className="body">
                <div className="top">
                    {livre!=null && <Livre livre={livre} click={click} show_all={true} />}
                </div>
                <div className="bottom">
                    <button onClick={acheter}>
                        <ShoppingCartIcon style={{margin:0,padding:0,fontSize:"1.2rem"}}/>
                        Achetez Maintenant</button>
                </div>
            </div>
        </div>
    )
}
export default LivreDetail;