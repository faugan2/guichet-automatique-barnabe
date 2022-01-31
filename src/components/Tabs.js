import "../styles/tabs.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {setTab,selectTab} from "../features/counterSlice";

const Tabs=()=>{
    const dispatch=useDispatch ();
    const tab_index=useSelector(selectTab);

    const set_tab=(index)=>{
        dispatch(setTab(index));
    }

    useEffect(()=>{
        const btns=document.querySelectorAll(".tabs >button");
        for(var i=0; i<btns.length; i++){
            btns[i].classList.remove("active");
        }
        btns[tab_index].classList.add("active");

    },[tab_index]);

    return(
        <div className="tabs">
            <button className="active" onClick={set_tab.bind(this,0)}>Actions</button>
            <button onClick={set_tab.bind(this,1)}>Mes Livres</button>
            <button onClick={set_tab.bind(this,2)}>Ma Galerie</button>
        </div>
    );
}

export default Tabs;