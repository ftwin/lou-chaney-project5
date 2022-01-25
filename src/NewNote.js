import React, { Component, useState } from "react";
import axios from "axios";
import firebase from './Firebase.js';

  // class NewNote extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       note: "",
  //       image: "",
  //       alt: "",
  //       errorMessage: ""
  //     };
  //   }

  //   handleChange = e => {
  //     this.setState({
  //       //reset error message
  //       errorMessage: "",
  //       //record the user input
  //       note: e.target.value
  //     });
  //     console.log(note);
  //   };

  //   handleSubmit = e => {
  //     e.preventDefault()

      
  //     const dbRef = firebase.database().ref();
  //     const regEx = /\S/;

  //     //check that input isn't empty then make api call for image then push to db
  //     if (regEx.test(this.state.note)) {
  //       axios({
  //         url: `https://api.unsplash.com/photos/random`,
  //         method: `GET`,
  //         dataResponse: `json`,
  //         params: {
  //           client_id: `3538ec3e67ff5208b17b884280d4f5548757cf54956c39cbe73c070ec5442549`,
  //           query: `cat`
  //         }
  //       }).then(response => {
  //         this.setState({
  //           image: response.data.urls.regular,
  //           alt: response.data.alt_description
  //         });

  //         dbRef.push({ comments: "", note: this.state.note, image: this.state.image, altText: this.state.alt });

  //         //reset the user input fields
  //         this.setState({
  //           note: "",
  //           errorMessage: ""
  //         });
  //       });

  //     } else {
  //       this.setState({
  //         errorMessage: "please enter a note"
  //       })
  //     };       
  //   };

  //   render() {

  //     return (
  //       <div className="newNote">
  //         <form action="">
  //           <label htmlFor="newNote" className="visuallyHidden" >Add your note here</label>
  //           {this.state.errorMessage !== '' ? <div className="error">{this.state.errorMessage}</div> : ''}
  //           <textarea onChange={this.handleChange} value={this.state.note} rows="12" cols="30" name="newNote" id="newNote" placeholder="add your note here"
  //           ></textarea>
  //           <button onClick={this.handleSubmit} name="addNote" id="addNote" aria-label="add note">
  //             +
  //           </button>
  //         </form>
  //       </div>
  //     );
  //   }
  // }

const NewNote = (props) => {

  const [note, setNote] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  console.log(alt, setAlt);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = e => {
    setErrorMessage("")
    //record the user input
    setNote(e.target.value)

    console.log(note);
  };

  const handleSubmit = e => {
    e.preventDefault()
    const dbRef = firebase.database().ref();
    const regEx = /\S/;

    //check that input isn't empty then make api call for image then push to db
    if (regEx.test(note)) {
      axios({
        url: `https://api.unsplash.com/photos/random`,
        method: `GET`,
        dataResponse: `json`,
        params: {
          client_id: `3538ec3e67ff5208b17b884280d4f5548757cf54956c39cbe73c070ec5442549`,
          query: `cat`
        }
      }).then(response => {
        setImage(response.data.urls.regular)
        console.log(image);
        setAlt(response.data.alt_description)

        dbRef.push({ comments: "", note: note, image: image, altText: alt });

        //reset the user input fields
        setNote("")
        setErrorMessage("")
      });

    } else {
      setErrorMessage("please enter a note");
    };       
  };

  return (
    <div className="newNote">
      <form action="">
        <label htmlFor="newNote" className="visuallyHidden" >Add your note here</label>
        {errorMessage !== '' ? <div className="error">{errorMessage}</div> : ''}
        <textarea onChange={handleChange} value={note} rows="12" cols="30" name="newNote" id="newNote" placeholder="add your note here"
        ></textarea>
        <button onClick={handleSubmit} name="addNote" id="addNote" aria-label="add note">
          +
        </button>
      </form>
    </div>
  );
}

  export default NewNote;