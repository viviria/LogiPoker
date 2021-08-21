export class GameManager {
    private static _instance : GameManager | null = null
    private static _IsPlayerLogin : boolean = false

    private constructor() {
    }

    static GetInstance(): GameManager {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager();
        }
        return GameManager._instance
    }

    static UserLogin() { this._IsPlayerLogin = true }
    static get IsUserLogin() : boolean { return this._IsPlayerLogin }
}

export default GameManager
