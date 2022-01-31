import "../styles/header_recherche.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {selectMe,selectLoading, setSearch} from "../features/counterSlice";
import {useEffect,useState} from "react";
import CloseIcon from '@material-ui/icons/Close';
const HeaderBack=({title})=>{
    const navigate=useNavigate ();
    const dispatch=useDispatch ();
    const go_back=()=>{
        navigate("/home");
    }

    const me=useSelector(selectMe);
    const loading=useSelector(selectLoading);

    useEffect(()=>{
        console.log(me,loading);
        if(me==null && loading==false){
          navigate("/")
        }
      },[me,loading])

      const [search,set_search]=useState("");
      useEffect(()=>{
        dispatch(setSearch(search))
      },[search]);

    return(
        <div className="header_recherche">
            <button onClick={go_back}><ArrowBackIcon /></button>
            <div>
                <input type="text"  placeholder="Rechercher" focus={true}
                value={search} onChange={e=>set_search(e.target.value)}
                />
                {search!="" && <button onClick={e=>set_search("")}>
                    <CloseIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                </button>
                }
            </div>
        </div>
    )
}
export default HeaderBack;