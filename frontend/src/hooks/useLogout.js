import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: "LOGOUT", payload: null })
        workoutsDispatch({type: "SET_WORKOUTS", payload: null})
    }

    return { logout }
}