import "../styles/header_back.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {selectMe,selectLoading} from "../features/counterSlice";
import {useEffect} from "react";

const HeaderBack=({title})=>{
    const navigate=useNavigate ();
    const go_back=()=>{
        navigate(-1);
    }

    const me=useSelector(selectMe);
    const loading=useSelector(selectLoading);

    useEffect(()=>{
        /*console.log(me,loading);
        if(me==null && loading==false){
          navigate("/")
        }*/
      },[me,loading])

    return(
        <div className="header_back">
            <button onClick={go_back}><ArrowBackIcon /></button>
            <p>{title}</p>
        </div>
    )
}
export default HeaderBack;