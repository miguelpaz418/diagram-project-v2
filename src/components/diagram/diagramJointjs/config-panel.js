import zoomInIcon from "./zoom-in/icon";
import zoomOutIcon from "./zoom-out/icon";
import Hardware from "./hardware/icon";
import Passive from "./passive/icon";
import Multimedia from "./multimedia/icon";
import Action from "./action/icon";
import Attribute from "./attribute/icon";
import Interaction from "./interaction/icon";

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
        default:
            console.log("default")
        break;
    }
    return res
};




export {  returnAction };
