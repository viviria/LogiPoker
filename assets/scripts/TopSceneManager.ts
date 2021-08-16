
import { _decorator, Component, Node, Prefab, Animation, instantiate } from 'cc';
import { APIController } from "./APIController";
import { APINames } from "./APINames";
import { Popup } from './ui/Popup';

const { ccclass, property } = _decorator;

@ccclass('TopSceneManager')
export class TopSceneManager extends Component {
    private _APIController : APIController | null = null;

    @property
    RoomInfoPrefab : Prefab = new Prefab()

    @property
    CreateRoomPopup : Node = new Node()

    start () {
        this._APIController = APIController.GetInstance()
        APIController.SetSocket(window.io())

        this._APIController.CallAPI(APINames.UserEnter, APIController.GetUserID(), (RoomList: any[]) => {
            console.log(RoomList)
        })
    }

    CreateRoom() {
        this.CreateRoomPopup.active = true
        const PopupComponent = this.CreateRoomPopup.getComponent(Popup)
        PopupComponent?.SetCloseCallback(() => {
            this.CreateRoomPopup.active = false
        })
        PopupComponent?.open()
    }
}