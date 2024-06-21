import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

const Home = () => {

  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  const getNotes = () => {
    api
      .get('/api/notes/')
      .then((res) => res.data)
      .then(data => {
        setNotes(data);
        console.log("====> notes", data)
      })
      .catch((err) => alert(err))
  }

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!")
        else alert("failed to deleted note")

        getNotes()

      })
      .catch(err => alert(err))

  }

  const createNote = (e) => {
    e.preventDefault()
    api
      .post('/api/notes/', { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!")
        else alert("Failed to Create Note")

        getNotes()


      })
      .catch((err) => alert(err))

  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div>
      <div>
        {
          notes.map(note => (
            <Note key={note.id} note={note} onDelete={deleteNote} />
          ))
        }
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote} >
        <label htmlFor="title">Title: </label>
        <br />
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="content">Content: </label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Home