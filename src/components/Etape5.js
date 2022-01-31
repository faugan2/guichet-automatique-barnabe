import "../styles/etape5.scss";
import {useState,useEffect,useRef} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectPiece,selectVisage, setResultatDetection} from "../features/counterSlice";
import * as faceapi from 'face-api.js';

const Etape5=()=>{
    const dispatch=useDispatch ();
    const [piece,set_piece]=useState(null);
    const [visage,set_visage]=useState(null);
    const p=useSelector(selectPiece);
    const v=useSelector(selectVisage);
    const [description_piece,set_description_piece]=useState(null);
    const [description_visage,set_description_visage]=useState(null);

    const ref_piece=useRef(null);
    const ref_piece_canvas=useRef(null);
    
    const ref_visage=useRef(null);
    const ref_visage_canvas=useRef(null);

    useEffect(()=>{
        console.log("la piece est ",p);
        set_piece(p);
    },[p]);
    useEffect(()=>{
        console.log("le visage est ",v);
        set_visage(v);
    },[v]);

    useEffect(()=>{
        
        if(visage==null || piece==null) return;
        handle_piece();
        handle_visage();
    },[piece,visage]);

    const handle_piece=async ()=>{
        const detection=await faceapi
        .detectSingleFace(ref_piece.current,new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptor()

        ref_piece_canvas.current.innerHTML=faceapi.createCanvasFromMedia(ref_piece.current)
        faceapi.matchDimensions(ref_piece_canvas.current,{
            width:"300",
            height:"250"
        })
        const resized=faceapi.resizeResults(detection,{
            width:"300",
            height:"250"
        })
        faceapi.draw.drawDetections(ref_piece_canvas.current,resized);
        faceapi.draw.drawFaceExpressions(ref_piece_canvas.current,resized);
        faceapi.draw.drawFaceLandmarks(ref_piece_canvas.current,resized);

        set_description_piece(detection.descriptor);
        
        //console.log("detection piece",detection);
    }

    const handle_visage=async ()=>{
        const detection=await faceapi
        .detectSingleFace(ref_visage.current,new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptor()

        ref_visage_canvas.current.innerHTML=faceapi.createCanvasFromMedia(ref_visage.current)
        faceapi.matchDimensions(ref_visage_canvas.current,{
            width:"300",
            height:"250"
        })
        const resized=faceapi.resizeResults(detection,{
            width:"300",
            height:"250"
        })
        faceapi.draw.drawDetections(ref_visage_canvas.current,resized);
        faceapi.draw.drawFaceExpressions(ref_visage_canvas.current,resized);
        faceapi.draw.drawFaceLandmarks(ref_visage_canvas.current,resized);
        
        set_description_visage(detection.descriptor);

       // console.log("detection visage",detection);
    }

    useEffect(()=>{
        if(description_piece==null || description_visage==null) return;
        console.log("piece=",description_piece);
        console.log("visage=",description_visage);
        const distance = faceapi.euclideanDistance(description_piece, description_visage)
        console.log("la distance euclidienne est ",distance);
        dispatch(setResultatDetection(distance))
    },[description_piece,description_visage])
    return (
        <div className="etape5">
            <div className="piece">
                {piece!=null && <img src={piece} ref={ref_piece} />}
                {piece!=null && <canvas ref={ref_piece_canvas} />}
            </div>
           <div className="visage">
                {visage!=null && <img src={visage} ref={ref_visage} />}
                {visage!=null && <canvas ref={ref_visage_canvas} />}
            </div>
            
        
        </div>
    )
}
export default Etape5;