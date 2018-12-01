import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { subscribeToTimer } from './api';
import schoen1 from './schoen1.png';
import schoen2 from './schoen2.png';

function unicodeEscape(str) {
	return str.replace(/[\s\S]/g, function(character) {
		var escape = character.charCodeAt().toString(16),
		    longhand = escape.length > 2;
		return '\\' + (longhand ? 'u' : 'x') + ('0000' + escape).slice(longhand ? -4 : -2);
	});
}

class App extends Component {
    state = {
        response: "",
        post: "",
        responseToPost: "",
        shoe: 'no shoe found'
    };
    constructor(props) {
        super(props);
        subscribeToTimer((err, shoe) => this.setState({ 
            shoe: shoe.slice(1,shoe.length)
          }));
    }
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }
    callApi = async () => {
        const response = await fetch("/api/hello");
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch("/api/world", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ post: this.state.post })
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <p>
                    This is the shoe: <code>{this.state.shoe}</code>
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                {this.state.shoe === 'schoen1' && <img src={schoen1} />}
                {this.state.shoe === 'schoen2' && <img src={schoen2} />}
                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <strong>Post to Server:</strong>
                    </p>
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.setState({ post: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>
            </div>
        );
    }
}
export default App;
