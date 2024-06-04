import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom';
import { ReactComponent as Arrowleft} from '../assets/arrow-left.svg'

const NotePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    let [note, setNote] = useState(null)

    useEffect(()=> {
        getNote(id)
    }, [id])

    let getNote = async (noteId)=> {
        if(noteId === 'new') return 

        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/')
    }

    let updateNote = async (noteId) => {
        fetch(`/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async (noteId) => {
        fetch(`/api/notes/${noteId}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    let handleSubmit = (noteId) => {
        if(noteId !== 'new' && note.body === '') {
            deleteNote(noteId)
        } else if(noteId !== 'new'){
            updateNote(noteId)
        }
        // } else if(noteId == 'new' && !note.body){
        //     createNote()
        // }
        navigate('/')
    }

    // let handleChange = (value) => {
    //     setNote(note => ({ ...note, 'body': value }))
    //     console.log('Handle Change:', note)
    // }

  return (
    // <div className="note">
    //   <p>{note ? note.body : 'Loading...'} </p>
    // </div>

    <div className="note">
        <div className="note-header">
            <h3>
                <Link to='/'>
                  <Arrowleft onClick={() => handleSubmit(id)}/>
                </Link>
            </h3>
            {id !== 'new' ? (
                <button onClick={() => deleteNote(id)}>Delete</button>
            ) : (
                <button onClick={() => createNote()}>Done</button>
            )}
            
        </div>
      {note ? (
        <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note.body}></textarea>
      ) : (
        <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue=''></textarea>
      )}
    </div>

    // <textarea defaultValue={note ? note.body : 'Loading...'}></textarea>
  )
}

export default NotePage
