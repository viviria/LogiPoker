
import { _decorator, Component, Node, Label, Vec3, UITransform, Size, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoomInfo')
export class RoomInfo extends Component {
    @property
    Background : Node = new Node()
    @property
    RoomID : Node = new Node()
    @property
    HostPlayer : Node = new Node()

    private _EnterRoomCallback = () => {}

    SetRoomInfo(ID: number, HostName: string) {
        this.RoomID.getComponent(Label)!.string = 'ID: ' + ID.toString()
        this.HostPlayer.getComponent(Label)!.string = 'HostName: ' + HostName
    }

    OnClickEnter(callback: () => void) {
        this._EnterRoomCallback = callback
    }

    GetSize(): Size | undefined {
        return this.Background.getComponent(UITransform)?.contentSize
    }

    EnterRoom() {
        this._EnterRoomCallback()
    }
}
