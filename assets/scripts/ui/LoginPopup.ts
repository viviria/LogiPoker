
import { _decorator, Component, Node, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoginPopup')
export class LoginPopup extends Component {
    @property
    NameBox : Node = new Node()
    
    private _Callback = (name: string) => {}

    OnClicked(callback: (name: string) => void) {
        this._Callback = callback
    }

    Enter() {
        const Name = this.NameBox.getComponent(EditBox)?.string
        if (Name && Name != "") {
            this._Callback(Name)
        }
    }
}
