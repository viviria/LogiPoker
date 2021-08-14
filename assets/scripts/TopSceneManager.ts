
import { _decorator, Component, Node } from 'cc';
import { APIController } from "./APIController"

const { ccclass, property } = _decorator;

@ccclass('TopSceneManager')
export class TopSceneManager extends Component {
    private _APIController : APIController | null = null;

    start () {
        this._APIController = APIController.GetInstance()
        this._APIController.SetSocket(window.io())

        this._APIController.CallAPI('UserEnter', 'aaa', () => {
            console.log('OK')
        })
    }
}