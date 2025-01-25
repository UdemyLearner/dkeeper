import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
// import {DKeeper} from "../../declarations/dkeeper_backend"
import { dkeeper_backend } from "../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper_backend.createNote(newNote.title, newNote.content)
      return [newNote,...prevNotes];
    });
  }

  useEffect(() =>{
    console.log("render effect triggered");
    fetchData();
  },[])

  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    dkeeper_backend.removeNotes(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

// import { useState } from 'react';
// import { dkeeper_backend } from 'declarations/dkeeper_backend';

// function App() {
//   const [greeting, setGreeting] = useState('');

//   function handleSubmit(event) {
//     event.preventDefault();
//     const name = event.target.elements.name.value;
//     dkeeper_backend.greet(name).then((greeting) => {
//       setGreeting(greeting);
//     });
//     return false;
//   }

//   return (
//     <main>
//       <img src="/logo2.svg" alt="DFINITY logo" />
//       <br />
//       <br />
//       <form action="#" onSubmit={handleSubmit}>
//         <label htmlFor="name">Enter your name: &nbsp;</label>
//         <input id="name" alt="Name" type="text" />
//         <button type="submit">Click Me not!</button>
//       </form>
//       <section id="greeting">{greeting}</section>
//     </main>
//   );
// }

// export default App;
