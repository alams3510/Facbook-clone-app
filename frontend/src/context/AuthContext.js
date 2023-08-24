import {createContext, useEffect, useReducer} from "react";
import AuthReducer from "./AuthReducer";


const INITIALSTATE={
    // user:{
    //     _id:"63afcdcb60e19a128c6847fa",
    //     profilePicture:"person/noAvatar.png",
    //     coverPicture:"person/coverPicture.webp",
    //     followers:[],
    //     followings:["63ad52833644fb1ef00e0be5"],
    //     username:"huzaifa",
    //     email:"huzaifa@jhh.com",
    //JSON.parse(localStorage.getItem("user"))
       
    // },
    user:JSON.parse(localStorage.getItem("user"))||null,
    isFetching:false,
    error:false,isupdate:null
}
export const AuthContext =createContext(INITIALSTATE);

const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIALSTATE);
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])
      
    return (
        <AuthContext.Provider value={
            {user:state.user,
             isFetching:state.isFetching,
             error:state.error,
             dispatch
            }
        }>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;