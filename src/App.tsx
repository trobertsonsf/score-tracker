import React from 'react';
import './App.css';

type Props = {
}
type CurrentGame = {
  currentColor: string,
  ourScore: number,
  theirScore: number
}
type State = {
  isCreatingNewGame: boolean,
  currentGame: null | CurrentGame
}
class App extends React.Component<Props, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      isCreatingNewGame: false,
      currentGame: null,
    }
  }

  componentDidMount() {
    const lsItem = localStorage.getItem('currentGame');
    if(typeof lsItem === 'string') {
      try {
        const savedGame = JSON.parse(lsItem);
        this.updateCurrentGame(savedGame as CurrentGame);
      } catch {
        console.log('unable to parse local storage')
      }
    }
  }

  createNewGame(color: string) {
    return () => {
      this.updateCurrentGame({
        currentColor: color,
        ourScore: 0,
        theirScore: 0
      })
      this.setState(
        {isCreatingNewGame: false}
      )
    }
  }

  newGameForm() {
    const baseStyles = {
      color: 'white', width:'200px', height: '60px', display:'block', margin: '10px'
    }

    return (
      <div>
        <p>Which team are you?</p>
        <button style={{background: 'red', ...baseStyles}} onClick={this.createNewGame('red')}>Red</button>
        <button style={{background: 'black', ...baseStyles}} onClick={this.createNewGame('black')}>Black</button>
      </div>
    )
  }


  updateCurrentGame(currentGame: CurrentGame) {
    localStorage.setItem('currentGame', JSON.stringify(currentGame));
    this.setState((state) => {
      return {
        currentGame
      }
    })
  }

  renderCurrentGame() {
    return (
      <div className="game-container">
        <div style={{ height: '240px', width: '100%'}}> 
          <p style={{color: this.state.currentGame!.currentColor, fontSize: '32px'}}>Our Score</p>
          <p style={{color: this.state.currentGame!.currentColor, fontSize: '32px'}}>{this.state.currentGame!.ourScore}</p>
          <div className="goal-button-bar">
            <button onClick={() => this.updateCurrentGame(
                {
                  currentColor: this.state.currentGame!.currentColor,
                  ourScore: this.state.currentGame!.ourScore + 1,
                  theirScore: this.state.currentGame!.theirScore
                }
            )
            } className="add-goal">Add Goal!</button>
            <button onClick={() => this.updateCurrentGame(
                {
                  currentColor: this.state.currentGame!.currentColor,
                  ourScore: this.state.currentGame!.ourScore - 1,
                  theirScore: this.state.currentGame!.theirScore
                }
            )
            } className="remove-goal">Remove Goal</button>
            </div>
        </div>

        <div style={{ height: '240px', width: '100%'}}> 
          <p style={{color: 'lightgray', fontSize: '32px'}}>Their Score</p>
          <p  style={{color: 'lightgray', fontSize: '32px'}}>{this.state.currentGame!.theirScore}</p>
          <div className="goal-button-bar">
            <button onClick={() => this.updateCurrentGame(
                {
                  currentColor: this.state.currentGame!.currentColor,
                  ourScore: this.state.currentGame!.ourScore,
                  theirScore: this.state.currentGame!.theirScore + 1
                }
            )
            } className="add-goal">Add Goal!</button>
            <button onClick={() => this.updateCurrentGame(
                {
                  currentColor: this.state.currentGame!.currentColor,
                  ourScore: this.state.currentGame!.ourScore,
                  theirScore: this.state.currentGame!.theirScore  - 1
                }
            )
            } className="remove-goal">Remove Goal</button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Lonestar Score Tracker</h1>
          <p>
            You can use this app to help keep score during a game
          </p>
        </header>
        <div>
          <button onClick={() => this.setState({isCreatingNewGame: true})}>New Game</button>
        </div>

        {this.state.isCreatingNewGame && this.newGameForm()}
        {this.state.currentGame !== null && this.renderCurrentGame()}

      </div>
    );
  }
}


export default App;
