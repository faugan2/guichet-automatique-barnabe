import "../styles/splash.scss";
import {auth, db} from "../connexion_base";
import {useState,useEffect} from "react";
import logo from "../components/img/logo.jpg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setMe,setLoading,setMouvements, setLivres,setLoadingModels,selectLoadingModels, selectLoading} from "../features/counterSlice";
import Footer from "../components/Footer";
import * as faceapi from 'face-api.js';

const Splash=()=>{
    const navigate=useNavigate ();
    const dispatch=useDispatch ();
    const loading_models=useSelector(selectLoadingModels)
    const loading=useSelector(selectLoading);
    useEffect(()=>{

        (async ()=>{
            dispatch(setLoading(true));
            await load_livres();
            dispatch(setLoading(false));
        })();


        const loadModels=()=>{
            dispatch(setLoadingModels(true))
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            ]).then(()=>{
               console.log("models are loaded");
               //navigate("/home");
               dispatch(setLoadingModels(false))
            }).catch((err)=>{
                console.log("error loading modules");
                //navigate("/");
            })
        }

        loadModels();
        
        
      
    },[auth]);

    const load_user_info=async ()=>{
        dispatch(setLoading(true))
        db.collection("clients")
        .where("email","==",auth?.currentUser.email)
        .onSnapshot((snap)=>{
            if(snap.docs.length==0){
                auth.signOut();
                navigate("/login");
            }else{
                const doc=snap.docs[0];
                const key=doc.id;
                const user=doc.data();
                user.key=key;
                dispatch(setMe(user))
                dispatch(setLoading(false))
            }
            
        })
    }

    const load_user_mouvements=async()=>{
        db.collection("mouvements")
        .where("email","==",auth?.currentUser.email)
        .onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
                const data=doc.data();
                data.key=key;
                d.push(data);
            })
            dispatch(setMouvements(d));
        })
    }

    const load_livres=async ()=>{
        db.collection("barnabe_livres").onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
                const data=doc.data();
                data.key=key;
                d.push(data);
            })
            dispatch(setLivres(d))
        })
    }


    useEffect(()=>{
        console.log(loading,loading_models);
        if(loading_models==false){
            navigate("/home");
        }
    },[loading_models])
    return(
        <div className="splash">
                <div>
                    <img src={logo}  style={{width:"4rem",height:"4rem"}}/>
                    <p>Guichet Automatique</p>
                    <p>Chargement...</p>
                </div>

                <Footer />
                
        </div>
    );
}

export default Splash;