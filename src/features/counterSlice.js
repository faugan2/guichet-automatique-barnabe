import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
 page:3,
 client:null,
 tab:0,
 me:null,
 loading:false,
 mouvements:[],
 search:"",
 livre:null,
 livres:[],
 matiere:null,
 etape:1,
 code:"",
 telephone:"",
 piece:null,
 visage:null,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  
  reducers: {
  
    setPage: (state, action) => {
      state.page= action.payload;
    },
    setClient:(state,action)=>{
      state.client= action.payload;
    },
    setTab:(state, action)=>{
      state.tab= action.payload;
    },
    setMe:(state, action)=>{
      state.me= action.payload;
    },
    setLoading:(state, action)=>{
      state.loading= action.payload;
    },
    setMouvements:(state, action)=>{
      state.mouvements= action.payload;
    },
    setSearch:(state, action)=>{
      state.search= action.payload;
    },
    setLivre:(state, action)=>{
      state.livre= action.payload;
    },
    setLivres:(state, action)=>{
      state.livres= action.payload;
    },

    setMatiere:(state, action)=>{
      state.matiere= action.payload;
    },
    setEtape:(state, action)=>{
      state.etape= action.payload;
    },
    setCode:(state, action)=>{
      state.code= action.payload;
    },
    setTelephone:(state, action)=>{
      state.telephone= action.payload;
    },
    setPiece:(state, action)=>{
      state.piece= action.payload;
    },
    setVisage:(state, action)=>{
      state.visage= action.payload;
    }
  },
 
  
});

export const {
  setPage,
  setClient,
  setTab,
  setMe,
  setLoading,
  setMouvements,
  setSearch,
  setLivre,
  setLivres,
  setMatiere,
  setEtape,
  setCode,
  setTelephone,
  setPiece,
  setVisage,
} = counterSlice.actions;


export const selectPage = (state) => state.counter.page;
export const selectClient=(state)=> state.counter.client;
export const selectTab= (state) => state.counter.tab;
export const selectMe=(state)=> state.counter.me;
export const selectLoading= (state) => state.counter.loading;
export const selectMouvements= (state) => state.counter.mouvements;
export const selectSearch= (state) => state.counter.search;
export const selectLivre= (state) => state.counter.livre;
export const selectLivres= (state) => state.counter.livres;
export const selectMatiere= (state) => state.counter.matiere
export const selectEtape= (state) => state.counter.etape;
export const selectCode= (state) => state.counter.code;
export const selectTelephone= (state) => state.counter.telephone;
export const selectPiece= (state) => state.counter.piece;
export const selectVisage= (state) => state.counter.visage;

export default counterSlice.reducer;
