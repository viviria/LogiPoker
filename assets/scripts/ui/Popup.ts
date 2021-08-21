
import { _decorator, Component, Node, Animation, AnimationClip, AnimationState } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Popup')
export class Popup extends Component {
    private _CloseCallback : any = null
    private _IsOpen : boolean = false

    GetAnimationState() : AnimationState | undefined {
        const Anim = this.getComponent(Animation)
        const AnimName = Anim?.defaultClip?.name || ''
        return Anim?.getState(AnimName)
    }

    Play() {
        const Anim = this.getComponent(Animation)
        Anim?.play()
    }

    Open() {
        const AnimState = this.GetAnimationState()
        AnimState!.wrapMode = AnimationClip.WrapMode.Normal
        this._IsOpen = true
        this.Play()
    }

    Close() {
        const Anim  = this.getComponent(Animation)
        const AnimName = Anim?.defaultClip?.name || ''
        const AnimState = Anim?.getState(AnimName)
        AnimState!.wrapMode = AnimationClip.WrapMode.Reverse
        this._IsOpen = false
        this.Play()
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
