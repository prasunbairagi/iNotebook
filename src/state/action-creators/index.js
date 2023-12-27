export const lightTheme=(theme)=>{
    return(dispatch)=>{
        dispatch({
            type:'light',
            payload:theme
        })
    }
}
export const darkTheme=(theme)=>{
    return(dispatch)=>{
        dispatch({
            type:'dark',
            payload:theme
        })
    }
}