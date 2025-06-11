import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({  workout  }) => {

    const {  dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async ( ) => {
        if (!user) {
            return
        }

        const res = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await res.json()

        if(res.ok) {
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }
    
    return (
        <div className="workout-details" key={workout._id}>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps: </strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleClick} className="material-symbols-outlined">delete</span>
        </div>
    );
}


export default WorkoutDetails