type Player = {}

type PlayField = {}

enum GameState {
    default
}

class Game {
    localPlayer?: Player;
    remotePlayer?: Player;
    playfield: PlayField;
    state: GameState;

    constructor() {
        this.playfield = {}
        this.state = GameState.default;
    }

    // fire at position on map
    fireAt(x: number, y: number) {
        console.log("fire @ x:", x, "| y:", y);
    }


    // place ship in preperation phase
    placeShip() {

    }

    // confirm placed ships on map 
    // and send positions to remote
    confirmShips() {

    }


}