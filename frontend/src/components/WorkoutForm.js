import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { 
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Modal,
 } from 'semantic-ui-react'

const WorkoutForm = ( ) => {
    const [title, setTitle] = useState("")
    const [reps, setReps] = useState("")
    const [load, setLoad] = useState("")
    const [error, setError] = useState(null)
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [emptyFields, setEmptyFields] = useState([])
    const [isPopupOpen, setPopupOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError(["You must be logged In"])
            return
        }

        const workout = { title, load, reps }

        const response = await fetch("/api/workouts", {
            method: "POST",
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
            dispatch({type: "CREATE_WORKOUT", payload: json})
            setError(null)
            console.log("New workout added")
            setTitle('')
            setLoad('')
            setReps('')
            setPopupOpen(false)
        }
    }

    return (
        <>
            <button onClick={ () => setPopupOpen(true) }>Add Workout</button>

            <Modal
            onClose={() => setPopupOpen(false)}
            onOpen={() => setPopupOpen(true)}
            open={isPopupOpen}
            >
            <ModalHeader>Add a New Workout</ModalHeader>
            <ModalContent>
                <ModalDescription>
                    <form className="create">
                        <label>Excersize Title: </label>
                        <input
                            type="text"
                            onChange={ (e) => setTitle(e.target.value) }
                            value={title}
                            className={emptyFields.includes("title") ? "error" : ""}
                        />

                        <label>Load (kg): </label>
                        <input
                            type="number"
                            onChange={ (e) => setLoad(e.target.value) }
                            value={load}
                            className={emptyFields.includes("load") ? "error" : ""}
                        />


                        <label>Number of Reps: </label>
                        <input
                            type="number"
                            onChange={ (e) => setReps(e.target.value) }
                            value={reps}
                            className={emptyFields.includes("reps") ? "error" : ""}
                        />
                        
                        {error && <div className="error" dangerouslySetInnerHTML={{__html: error.join("<br>")}}></div>}

                    </form>
                </ModalDescription>
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setPopupOpen(false)}>Not Now</Button>
                <Button
                content="Yep, Create Workout"
                labelPosition='right'
                icon='checkmark'
                onClick={handleSubmit}
                positive
                />
            </ModalActions>
            </Modal>
        </>
    );
}


export default WorkoutForm