
import { _decorator, Component, Node, EditBox } from 'cc';
const { ccclass, property } = _decorator;
import { Popup } from './Popup';
import { APIController } from '../api/APIController'
import { APINames } from "../api/APINames";

@ccclass('CreateRoomPopup')
export class CreateRoomPopup extends Component {
    @property
    NameEditBox : Node = new Node()
    @property
    RoomPassEditBox : Node = new Node()
    @property
    Loading : Node = new Node()

    ExecuteCreateRoom() {
        const PopupComponent = this.node.getComponent(Popup)
        const NameEditBoxComponent = this.NameEditBox?.getComponent(EditBox)
        const RoomPassEditBoxComponent = this.RoomPassEditBox?.getComponent(EditBox)

        const Name = NameEditBoxComponent?.string
        const RoomPass = RoomPassEditBoxComponent?.string

        if (Name!.length <= 0) {
            console.log('no input name.')
            return
        }

        this.Loading.active = true
        APIController.GetInstance().CallAPI(
            APINames.CreateRoom,
            APIController.GetUserID(),
            Name,
            RoomPass,
            (RoomData: any) => {
                this.Loading.active = false
                console.log(RoomData)
                PopupComponent?.close()
            }
        )
    }
}
