import { auth } from "../connexion_base";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import "../styles/home.scss";
import {useState,useEffect} from "react";
import SwipeableViews from 'react-swipeable-views';
import {setTab,selectTab} from "../features/counterSlice";
import {useSelector,useDispatch} from "react-redux";
import Actions from "../components/Actions";
import MonCompte from "../components/MonCompte";
import Historique from "../components/Historique";
import Footer from "../components/Footer";
const Home=()=>{
    const navigate=useNavigate ();
    const dispatch=useDispatch();
    const tab_index=useSelector(selectTab);

    const logout=async ()=>{
        await auth.signOut();
        navigate("/");
    }
    const [index,set_index]=useState(tab_index);
    const handleChangeIndex=(index)=>{
       dispatch(setTab(index))
        set_index(index);
    }
    const [h,setH]=useState(100);
    useEffect(()=>{
        set_index(tab_index);
    },[tab_index])
    return(
        <div className="home">
            <Header />
            <SwipeableViews enableMouseEvents index={index} onChangeIndex={handleChangeIndex}>
               <Actions />
                <MonCompte />
                <Historique />
            </SwipeableViews>

            <Footer />
        </div>
    );
}

export default Home;