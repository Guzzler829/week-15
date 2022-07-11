import React from 'react';
import Comment from './comment';
import InputField from './input-field';

let apiURL = "https://api.thecatapi.com/v1/images/";
let commentApiURL = "https://my-json-server.typicode.com/Guzzler829/json-server/comments";


export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            imageURL: '',
            breed: '',
            comments: []
        }
        this.fetchImageURL = this.fetchImageURL.bind(this);
    }
    

    componentDidMount() {
        this.fetchImageURL();
        this.getAllComments();
    }

    componentDidUpdate() {
        this.getAllComments(); //Should this go here?
    }

    getAllComments() {
        fetch(commentApiURL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then( res => res.json() )
            .then( res => this.state.comments.push(<Comment text={res.text} />))
            .catch( error => console.error(error) );
    }

    fetchImageURL() {
        fetch(apiURL + 'search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then( res => res.json() )
            .then( res => {
                this.setState({imageURL: res[0].url});
                if(res[0].breeds[0]){
                    this.setState({breed: res[0].breeds[0].name});
                }
                console.log(res[0].url);
            })
            .catch(error => console.error(error));
    }

    render() { 
        return ( 
            <div className='card-container'>
                <img src={this.state.imageURL} />

                <div className='break-line'></div>
                {this.state.comments}
                <div className='break-line'></div>

                <InputField />
                
            </div>
        );
    }
}