
import { _decorator, Component, Node, Prefab, Animation, instantiate, Size, Director, loader, Scene, AssetManager, SceneAsset, director } from 'cc';
import { APIController } from "./api/APIController";
import { APINames } from "./api/APINames";
import { Popup } from './ui/Popup';
import { RoomInfo } from './ui/RoomInfo';

const { ccclass, property } = _decorator;

@ccclass('TopSceneManager')
export class TopSceneManager extends Component {
    private _APIController : APIController | null = null;

    @property
    RoomInfoPrefab : Prefab = new Prefab()

    @property
    CreateRoomPopup : Node = new Node()

    @property
    RoomListView : Node = new Node()

    prepare() {
        APIController.SetSocket(window.io('http://localhost:12800'))
        director.preloadScene('MainScene')
    }

    start () {
        this.prepare()
        const RoomInfoPanel = this.CreateRoomInfo(0, () => {
            director.loadScene('MainScene')
        })
        this.RoomListView.addChild(RoomInfoPanel)

        this._APIController = APIController.GetInstance()
        this._APIController.CallAPI(APINames.UserEnter, APIController.GetUserID(), (RoomList: any[]) => {
            for (let i = 0; i < RoomList.length; i++) {
                const Room = RoomList[i]
                const RoomInfoPanel = this.CreateRoomInfo(i, () => {
                    director.loadScene('MainScene')
                })
                this.RoomListView.addChild(RoomInfoPanel)
            }
        })
    }

    CreateRoomInfo(Index: number, OnClick: () => void) : Node {
        const RoomInfoPanel = instantiate(this.RoomInfoPrefab)
        const RoomInfoSize : Size = RoomInfoPanel.getChildByName('RoomInfo')?.getComponent(RoomInfo)?.GetSize() || new Size(0, 0)
        RoomInfoPanel.position.set(0, -(Index * RoomInfoSize.height + 5), 0)
        RoomInfoPanel.getChildByName('RoomInfo')?.getComponent(RoomInfo)?.OnClickEnter(OnClick)
        return RoomInfoPanel
    }

    CreateRoom() {
        this.CreateRoomPopup.active = true
        const PopupComponent = this.CreateRoomPopup.getComponent(Popup)
        PopupComponent?.SetCloseCallback(() => {
            this.CreateRoomPopup.active = false
        })
        PopupComponent?.Open()
    }
}