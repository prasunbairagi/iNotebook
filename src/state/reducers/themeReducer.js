const reducer = (state='light',action)=>{
    if(action.type==='light'){
        return action.payload
    }
    else if(action.type==='dark'){
        return action.payload
    }
    else{
        return state
    }
}
export default reducer