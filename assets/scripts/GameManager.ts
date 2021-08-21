export class GameManager {
    private static _instance : GameManager | null = null
    private _IsPlayerLogin : boolean = false

    private constructor() {
    }

    static GetInstance(): GameManager {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager();
        }
        return GameManager._instance
    }

    UserLogin() { this._IsPlayerLogin = true }
    get IsUserLogin() : boolean { return this._IsPlayerLogin }
}

export default GameManager
