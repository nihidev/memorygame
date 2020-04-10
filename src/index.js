import React from 'react';
import ReactDOM from 'react-dom';
//import Tilt from 'react-tilt';

import Flip from 'react-reveal/Flip';
// import RubberBand from 'react-reveal/RubberBand';
import Swing from 'react-reveal/Swing';
import Pulse from 'react-reveal/Pulse';

//import Flash from 'react-reveal/Flash';
import Jello from 'react-reveal/Jello';
//import HeadShake from 'react-reveal/HeadShake';



import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

// import { memoryImages } from './images';
import bgImg from './images/logo.jpg';

import './index.css';
import CardComponent from "./CardComponent";
//import { colors } from '@material-ui/core';
// import { colors } from '@material-ui/core';

const cardStyle = {
  borderRadius: '8px',
  boxShadow: '2px 2px 10px grey'
};

const rating = {
  color: '#fc6100'
};

const staticContent = [
  {
    id: 1,
    pairId: 1,
    text: 'How many legs does a spider have?',
    isQuestion: true,
    color: 'red'
  },
  {
    id: 2,
    pairId: 1,
    text: 'Eight',
    isQuestion: false,
    color: 'red'
  },
  {
    id: 3,
    pairId: 2,
    text: 'What is the color of an emerald?',
    isQuestion: true,
    color: 'blue'
  },
  {
    id: 4,
    pairId: 2,
    text: 'Green',
    isQuestion: false,
    color: 'blue'
  },
  {
    id: 5,
    pairId: 3,
    text: 'What’s the name of a place you go to see lots of animals?',
    isQuestion: true,
    color: 'green'
  },
  {
    id: 6,
    pairId: 3,
    text: 'The zoo',
    isQuestion: false,
    color: 'green'
  },
  {
    id: 7,
    pairId: 4,
    text: 'Q4',
    isQuestion: true,
    color: 'gray'
  },
  {
    id: 8,
    pairId: 4,
    text: 'A4',
    isQuestion: false,
    color: 'gray'
  }
];

// let starRating = 5;

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCards: 0,
      memoryCards: this.shuffleCards(),
      screenHeight: window.innerHeight,
      timer: 0,
      staringTime: 0,
      moves: 0,
      won: false,
      starRating: 0
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleClick = id => {
    let newMemoryCards = this.state.memoryCards.slice();
    let newMoves = this.state.moves;
    let clickedCard = newMemoryCards.find((card) => { return card.id === id; } );
    let currentOpenCards = this.state.openCards;
    let newStarRating = this.state.starRating;
    let newTimer = this.state.timer;

    if (currentOpenCards === 0) {
      newTimer = this.startTimer();
      currentOpenCards = 1;
    } else if (currentOpenCards === 1) {
      newMoves++;
      currentOpenCards = 2;
      this.checkMatch(clickedCard, this.state.memoryCards.find((card) => { return (!card.faceDown && !card.solved) }));
    } else if (currentOpenCards === 2) {
      currentOpenCards = 1;
      this.allCardsDown();
    }

    console.log(newTimer);

    if (newMoves > 0 && newMoves < 6 ){
      if((newTimer > 0 && newTimer < 25))
      {
        console.log("5 star")
        newStarRating = 5;
      }
      else if((newTimer > 25 && newTimer < 35))
      {
        console.log("4 star")
        newStarRating = 4;
      }
      else if((newTimer > 35 && newTimer < 45))
      {
        console.log("3 star")
        newStarRating = 3;
      }
      else if((newTimer > 45 && newTimer < 55))
      {
        console.log("2 star")
        newStarRating = 2;
      }
      else 
      {
        console.log("1 star")
        newStarRating = 1;
      }
      
    }
    else if ((newMoves > 6 && newMoves < 8)){
      if((newTimer > 0 && newTimer < 35))
      {
        console.log("4 star")
        newStarRating = 4;
      }
      else if((newTimer > 35 && newTimer < 45))
      {
        console.log("3 star")
        newStarRating = 3;
      }
      else if((newTimer > 45 && newTimer < 55))
      {
        console.log("2 star")
        newStarRating = 2;
      }
      else 
      {
        console.log("1 star")
        newStarRating = 1;
      }
    }
    else if ((newMoves > 8 && newMoves < 10)){
      if((newTimer > 0 && newTimer < 45))
      {
        console.log("3 star")
        newStarRating = 3;
      }
      else if((newTimer > 45 && newTimer < 55))
      {
        console.log("2 star")
        newStarRating = 2;
      }
      else 
      {
        console.log("1 star")
        newStarRating = 1;
      }
     }
     else if ((newMoves > 10 && newMoves < 12 )){
      if((newTimer > 0 && newTimer < 55))
      {
        console.log("2 star")
        newStarRating = 2;
      }
      else 
      {
        console.log("1 star")
        newStarRating = 1;
      }
    }
    else if(newMoves > 12){
       newStarRating = 1;
     }
    
    clickedCard.faceDown = false;

    // console.log(
    //   "Clicked Pair-ID: " + clickedCard.pairId,
    //   "Clicked ID: " + clickedCard.id,
    //   "Open Cards: " + currentOpenCards,
    //   "Timer: " + newTimer,
    //   "Moves: " + newMoves
    // )

    this.setState({
      openCards: currentOpenCards,
      memoryCards: newMemoryCards,
      moves: newMoves,
      starRating : newStarRating,
      // timer : newTimer
    });

  }

  shuffleCards = () => {
    let memoryCards = [];
    for (let i = 0; i <8; i++) {
      const staticContentElement = staticContent[i];
      memoryCards[i] = {
        ...staticContentElement,
        id: staticContentElement.id,
        pairId: staticContentElement.pairId,
        faceDown: true,
        solved: false,
      };
    }
    memoryCards.sort(() => Math.random() - 0.5);

    console.log('>>>>>> memoryCards', memoryCards);
    return memoryCards;
  }

  startTimer = () => {
    this.setState({
      startingTime: Date.now()
    })
    this.timer = setInterval(() => {
      this.setState({
        timer: ((Date.now() - this.state.startingTime) / 1000).toFixed(0)
      });
    }, 1000)
    return this.state.timer;
  }

  stopTimer = () => {
    clearInterval(this.timer);
    console.log("timer stop");
  }

  checkMatch = (card1, card2) => {
    if (card1.pairId === card2.pairId && card1.id !== card2.id) {
      card1.faceDown = false;
      let newMemoryCards = this.state.memoryCards;
      newMemoryCards.find((card) => { return card.id === card1.id }).solved = true;
      newMemoryCards.find((card) => { return card.id === card2.id }).solved = true;
      this.setState({
        openCards: 0,
        memoryCards: newMemoryCards
      });
      this.checkWin();
    }
  }

  checkWin() {
    let win = true;
    this.state.memoryCards.forEach((card) => {
      if (!card.solved) {
        win = false;
        return;
      }
    });
    if (win) {
      this.stopTimer();
      this.setState({
        won: true
      })
    }
  }

  allCardsDown = () => {
    let newMemoryCards = this.state.memoryCards;
    newMemoryCards.forEach((card) => {
      card.faceDown = true;
      if (card.solved) card.faceDown = false;
    });
    this.setState({
      memoryCards: newMemoryCards
    })
  }

  restartGame = () => {
    this.setState({
      openCards: 0,
      memoryCards: this.shuffleCards(),
      timer: 0,
      staringTime: 0,
      moves: 0,
      won: false,
      starRating: 0
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.addEventListener("resize", null);
  }
  handleResize(screenHeight, event) {
    this.setState({screenHeight: window.innerHeight})
  }

  
  

  render() {
    return(
      <Container maxWidth="lg">
        <Grid container direction="column" justify="flex-start" alignItems="center">
          <Grid item xs={9} container className="gameStats" alignItems="stretch" style={{height: this.state.screenHeight}}>
              <Grid item xs={3}><span className="title">Memory-Spiel</span></Grid>
              <Grid item xs={3}>
                <Rating
                style={rating}
                size="large"
                name="customized-empty"
                defaultValue={5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                readOnly = 'false'
                max= {5}
                value = {this.state.starRating}

                />
        </Grid>
              <Grid item xs={3} className="stat">{this.state.timer}<span className="stat"> Seconds</span></Grid>
              <Grid item xs={3} className="stat">{this.state.moves}<span className="stat"> Moves</span></Grid>
          </Grid>
          <Grid item container className="gameTiles" spacing={2} style={{height: this.state.screenHeight/6*4}}>
              { this.state.memoryCards.map((card) => {
                return <MemoryCard key={card.id} card={card} onClick={(id) => this.handleClick(id)} />
              }) }
          </Grid>
        </Grid>
        {this.state.won ? <GameOverScreen onClick={this.restartGame} time={this.state.timer} moves={this.state.moves} starRating={this.state.starRating} /> : null}
      </Container>
    );
  }
}

function MemoryCard(props) {
  return(
    <Grid item xs={4} sm={4} md={4} xl={4}>
        <Jello className="Tilt">
          <Flip right spy={props.card.faceDown}>
          <Swing spy={props.card.solved}>
              <Card style={cardStyle} className="memoryCard">
                {/*<CardMedia */}
                {/*  image={ props.card.faceDown ? bgImg : memoryImages[props.card.pairId] }*/}
                {/*  className="memoryImg"*/}
                {/*  onClick={props.card.solved || !props.card.faceDown ? null : () => props.onClick(props.card.id)}            */}
                {/*  />*/}
                <CardComponent
                  color= {props.card.color}
                  className="memoryImg"
                  question = {props.card.isQuestion}
                  text={props.card.faceDown ? 
                  <CardMedia 
                  image={bgImg}
                  className="memoryImg"         
                    /> 
                  : props.card.text}
                  handleClick={props.card.solved || !props.card.faceDown ? null : () => props.onClick(props.card.id)}
              />
              </Card>
            </Swing>
          </Flip>
        </Jello>
    </Grid>
  );
}

function GameOverScreen(props) {
  return (
    <div className="gameOver">
      <Container maxWidth="lg">
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={8} sm={6}>
            <Pulse>
              <Card style={cardStyle} className="message">
                <CardContent>
                  <Grid container alignItems="center" justify="center">
                    <Grid item xs={12} className="title">You Win</Grid>
                    <Grid item xs={6} className="title">{props.time} <span className="stat"> seconds</span></Grid>
                    <Grid item xs={6} className="title">{props.moves} <span className="stat"> moves</span></Grid>
                    <Grid item xs={6}>
                      <Rating
                      size="large"
                      name="customized-empty"
                      defaultValue={5}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      readOnly = 'false'
                      max= {5}
                      value = {props.starRating}
                            />
                    </Grid>
                    <Grid item xs={10}>
                      {/* <HeadShake > */}
                        <Card style={cardStyle} className="restartBtn title" onClick={props.onClick}>
                          Play Again?
                          </Card>
                        {/* </HeadShake> */}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Pulse>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

ReactDOM.render(
  <MemoryGame />,
  document.getElementById('root')
);