import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext() 

export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((obj) => obj._id !== action.payload._id)
            }
        case "UPDATE_WORKOUT":
            return {
                workouts: state.workouts.map((obj) => obj._id === action.payload._id ? action.payload : obj )
            }    
        default:
            return state
    }

}


export const WorkoutsContextProvided = ({  children  }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null})
    
    // dispatch({type: "", payload: [{}, {}]})

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    );
}