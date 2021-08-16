
import { _decorator, Component, Node, Animation, AnimationClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Popup')
export class Popup extends Component {
    private _CloseCallback : any = null
    private _IsOpen : boolean = false

    open() {
        const Anim = this.getComponent(Animation)
        const AnimState = Anim?.getState('OpenCreateRoomPopup')
        AnimState!.wrapMode = AnimationClip.WrapMode.Normal
        this._IsOpen = true
        Anim?.play()
    }

    close() {
        const Anim  = this.getComponent(Animation)
        const AnimState = Anim?.getState('OpenCreateRoomPopup')
        AnimState!.wrapMode = AnimationClip.WrapMode.Reverse
        this._IsOpen = false
        Anim?.play()
    }

    SetCloseCallback(Callback: () => void) {
        this._CloseCallback = Callback

        const Anim  = this.getComponent(Animation)
        Anim?.off(Animation.EventType.FINISHED)
        Anim?.on(Animation.EventType.FINISHED, (EventType, State) => {
            if (!this._IsOpen) {
                if (this._CloseCallback) {
                    this._CloseCallback()
                }
            }
        }, this)
    }
}
