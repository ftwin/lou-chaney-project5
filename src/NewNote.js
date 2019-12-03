import React, { Component } from "react";
import axios from "axios";
import firebase from './Firebase.js';

  class NewNote extends Component {
    constructor() {
      super();
      this.state = {
        note: "",
        image: "",
        alt: "",
        errorMessage: ""
      };
    }

    handleChange = e => {
      this.setState({
        //record the user input
        note: e.target.value
      });
    };

    handleSubmit = e => {
      e.preventDefault()

      const dbRef = firebase.database().ref();

      //check that input isn't empty then make api call for image then push to db
      if (noteContent !== "") {
        axios({
          url: `https://api.unsplash.com/photos/random`,
          method: `GET`,
          dataResponse: `json`,
          params: {
            client_id: `3538ec3e67ff5208b17b884280d4f5548757cf54956c39cbe73c070ec5442549`,
            query: `cat`
          }
        }).then(response => {
          this.setState({
            image: response.data.urls.small,
            alt: response.data.alt_description
          });

          dbRef.push({ comments: "", note: this.state.note, image: this.state.image, altText: this.state.alt });

        });
        //reset the user input fields
        this.setState({
          note: "",
          errorMessage: ""
        });

      } else {
        this.setState({
          errorMessage: "please enter a comment"
        })
      };       
    };

    render() {
      return (
        <div className="newNote">
          <form action="">
            <textarea onChange={this.handleChange} value={this.state.note} rows="12" cols="30" name="newNote" id="newNote" placeholder="add your note here"
            ></textarea>
            <button onClick={this.handleSubmit} name="addNote" id="addNote">
              +
            </button>
          </form>
        </div>
      );
    }
  }

  export default NewNote;