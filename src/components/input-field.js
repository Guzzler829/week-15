import React from 'react';

let apiURL = "https://my-json-server.typicode.com/Guzzler829/json-server/comments";

export default class InputField extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments: []
        };

        this.theInput = React.createRef();
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        fetch(apiURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"text": this.theInput.current.value})
        })
            .then( res => res.json() )
            .then( res => console.log(res) )
            .catch( error => console.error(error) );
    }

    render(){
        return (
            <div className='input-container row'>
                <input ref={this.theInput} type='form' placeholder='Comment...' className='the-input'></input><br />
                <button className='btn btn-submit' onClick={this.submitForm}>Submit</button>
            </div>
        );
    }
}