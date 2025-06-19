import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { 
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Header,
    Modal,
 } from 'semantic-ui-react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({  workout  }) => {

    const {  dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [isPopupOpen, setPopupOpen] = useState(false)

    const [editId, setEditId] = useState("")
    const [editTitle, setEditTitle] = useState("")
    const [editRep, setEditRep] = useState("")
    const [editLoad, setEditLoad] = useState("")
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)

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

    const handleEditClick = (workout) => {
        setEditId(workout._id)
        setEditTitle(workout.title)
        setEditRep(workout.reps)
        setEditLoad(workout.load)
        setPopupOpen(true)
    }
    
    const handleUpdateClicked =  async () => {
        if(!user) {
            setError(["You must be logged In"])
            return
        }

        const workout = { title: editTitle, load: editLoad, reps: editRep }

        const response = await fetch(`/api/workouts/${editId}`, {
            method: "PATCH",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        
        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setEmptyFields([])
            dispatch({type: "UPDATE_WORKOUT", payload: json})
            setError(null)
            console.log("Workout Edit")
            setEditTitle('')
            setEditLoad('')
            setEditRep('')
            setEditId('')
        }

        setPopupOpen(false)
    }

    return (
        <div className="workout-details" key={workout._id}>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps: </strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleClick} className="material-symbols-outlined">delete</span>
            <span onClick={() => {handleEditClick(workout)}} className="edit material-symbols-outlined">edit</span>
            

            <Modal
            onClose={() => setPopupOpen(false)}
            onOpen={() => setPopupOpen(true)}
            open={isPopupOpen}
            >
            <ModalHeader>Workout Edit</ModalHeader>
            <ModalContent>
                <ModalDescription>
                    <form className="edit" onSubmit={() => {}}>
                        <label>Excersize Title: </label>
                        <input
                            type="text"
                            onChange={ (e) => setEditTitle(e.target.value) }
                            value={editTitle}
                            className={emptyFields.includes("title") ? "error" : ""}
                        />

                        <label>Load (kg): </label>
                        <input
                            type="number"
                            onChange={ (e) => setEditLoad(e.target.value) }
                            value={editLoad}
                            className={emptyFields.includes("load") ? "error" : ""}
                        />


                        <label>Number of Reps: </label>
                        <input
                            type="number"
                            onChange={ (e) => setEditRep(e.target.value) }
                            value={editRep}
                            className={emptyFields.includes("reps") ? "error" : ""}
                        />

                        <button className="hidden">Update Workout</button>
                        {error && <div className="error" dangerouslySetInnerHTML={{__html: error.join("<br>")}}></div>}
                    </form>
                </ModalDescription>
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setPopupOpen(false)}>Not Now</Button>
                <Button
                content="Yep, Update Workout"
                labelPosition='right'
                icon='checkmark'
                onClick={handleUpdateClicked}
                positive
                />
            </ModalActions>
            </Modal>
        </div>
    );
}


export default WorkoutDetails