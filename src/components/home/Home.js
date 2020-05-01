import React from "react";
import {Link, withRouter} from "react-router-dom";
import { api } from "../../helpers/api";
import './style.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.startGamehandler = this.startGamehandler.bind(this);
        this.interval = null;
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    state = {
        moves: '',
        players: [],
        id: '',
        gameState: false
    };

    /* componentDidMount() {
        this.interval = setInterval(() => {
            api.get("/games/"+ this.props.match.params.id ).then((res) => {
                this.setState(res.data);
                if(res.data && res.data.started) {
                    this.props.history.push("/game/"+this.props.match.params.id+"/dashboard");
                }
            })
        }, 1000);
    } */


    componentDidMount() {

        api.get("/games/"+ this.props.match.params.id ).then((res) => {
            this.state.id = JSON.stringify(res.data.gameId)
            this.gameState = res.data.started
            console.log(res.data.moves.length, "what is your plan")
            if (res.data.moves.length == 0) {
                this.setState({
                    moves: +0

                })
                if(res.data && res.data.started) {
                    this.props.history.push("/game/"+this.props.match.params.id+"/dashboard");
                }
            }
            else if (res.data.players.length > 1) {
                this.setState({
                    moves: res.data.moves[0].moveId,
                    players: res.data.players

                })
                if(res.data && res.data.started) {
                    this.props.history.push("/game/"+this.props.match.params.id+"/dashboard");
                }
            }
            console.log(this.state, "show the state")
        })
        console.log(this.props.match, "coming from props")

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async startGamehandler () {
        const token  =  localStorage.getItem("token");
        console.log(token)
        console.log(this.state.moves, "moveid checker?")
        console.log(this.props.match.params.id)


        const requestBody = JSON.stringify({
            moveId: this.state.moves
        });
        console.log(requestBody, "what is the requestbody?")
        await api.put("/games/" + this.props.match.params.id, requestBody).then(
          //this.props.history.push("/game/"+ this.props.match.params.id+"/dashboard")
        )



        // this.props.history.push("/game/"+ this.props.match.params.id+"/dashboard")
        // fetch("http://localhost:3000/games/"+ this.props.match.params.id, {
        //     method: "PATCH",
        //     headers:{
        //         "Content-type": "application/json",
        //         Authorization: token
        //     },
        //     body: JSON.stringify({
        //         moveId: this.state.moves
        //     })
        // } )
        //     .then(res => res.json())
        //     .then(res => console.log(res, "coming from put"))
        //     .catch(err => console.log(err, "sorry cannot do a put request"))
    }

    render() {

        return <div className="body1"><div className="center">
            <div className="left">
                <h1 className="heading">
                    <b>Players around the world</b>
                </h1>
            </div>
            <div className="right">
                <div className="up">
                    <div className="box1">

                        <h1><b>~Chat~</b></h1>
                        <p>
                            <b>>> user_2</b> asdf joined the game

                        </p>
                        <p>
                            <b>>> user_1</b> hello there :)
                        </p>
                    </div>
                    <div className="box2">
                        <p>Hi there...!</p>
                        <img src={require('./send.svg')} height={'20px'} width="20px"/>
                    </div>
                </div>
                <div className="down">
                    <div className="box3">
                        {this.state && this.state.players && this.state.players.map((player, index) => <p key={index}>{player.username}</p>)}
                    </div>
                    <div className="box4">
                        <p>Let's start this game </p>
                        <img onClick={this.startGamehandler} src={require('./send.svg')} height={'20px'} width="20px"/>
                    </div>
                    <div className="buttons">
                        <p className="button1">
                            <a href="#" onClick={() => this.logout()}>Logout</a></p>
                        <p className="button2">

                        </p>
                        <p className="button3">

                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>
    }
}

export default withRouter(Home);
