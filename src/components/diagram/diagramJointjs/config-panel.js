import zoomInIcon from "./zoom-in/icon";
import zoomOutIcon from "./zoom-out/icon";
import Hardware from "./hardware/icon";
import Passive from "./passive/icon";
import Multimedia from "./multimedia/icon";
import Action from "./action/icon";
import Attribute from "./attribute/icon";
import Interaction from "./interaction/icon";
import Interrelation from "./interrelation/icon"
import Reaction from "./reaction/icon"
import ContinuousLine from "./lines/continuousLine"
import DottedLine from "./lines/dottedLine"

function returnAction (type) {
    let res = {}
    switch (type) {
        case "Objecto pasivo":

            res = {
                icon: Passive(),
                action: 'passive',
                title: 'Add ObjectPassive'
            }
        break;
        case "Objecto hardware":

            res = {
                icon: Hardware(),
                action: 'hardware',
                title: 'Add ObjectHardware'
            }
        break;
        case "Objecto multimedia":

            res = {
                icon: Multimedia(),
                action: 'multimedia',
                title: 'Add ObjectMultimedia'
            }
        break;
        case "action":

            res =     {
                icon: Action(),
                action: 'action',
                title: 'Add Action'
            }
        break;
        case "attribute":

            res =  {
                icon: Attribute(),
                action: 'attribute',
                title: 'Add attribute'
            }
        break;
        case "interaction":

            res =  {
                icon: Interaction(),
                action: 'interaction',
                title: 'Add interaction'
            }
        break;
        case "interrelation":
            res =  {
                icon: Interrelation(),
                action: 'interrelation',
                title: 'Add interrelation'
            }
        break;
        case "reaction":
            res =  {
                icon: Reaction(),
                action: 'reaction',
                title: 'Add reaction'
            }
        break;
        case "in":

            res = {
                icon: zoomInIcon(),
                action: 'in',
                title: 'Zoom in',
            }
        break;
        case "out":

            res = {
                icon: zoomOutIcon(),
                action: 'out',
                title: 'Zoom out'
            }
        break;
        case "dotted":

            res = {
                icon: DottedLine(),
                action: 'dot',
                title: 'Dotted line'
            }
        break;
        case "continuous":

            res = {
                icon: ContinuousLine(),
                action: 'con',
                title: 'Continuous line'
            }
        break;
        default:
            console.log("default")
        break;
    }
    return res
};




export {  returnAction };
