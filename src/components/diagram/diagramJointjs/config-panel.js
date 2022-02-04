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
        case 'Objeto pasivo':
            res = {
                icon: Passive(),
                action: 'passive',
                title: 'Objeto pasivo'
            }
        break;
        case 'Objeto hardware':
            res = {
                icon: Hardware(),
                action: 'hardware',
                title: 'Objeto hardware'
            }
        break;
        case 'Objeto multimedia':
            res = {
                icon: Multimedia(),
                action: 'multimedia',
                title: 'Objeto multimedia'
            }
        break;
        case "action":
            res =     {
                icon: Action(),
                action: 'action',
                title: 'Acción'
            }
        break;
        case "attribute":

            res =  {
                icon: Attribute(),
                action: 'attribute',
                title: 'Atributo'
            }
        break;
        case "interaction":

            res =  {
                icon: Interaction(),
                action: 'interaction',
                title: 'Acción'
            }
        break;
        case "interrelation":
            res =  {
                icon: Interrelation(),
                action: 'interrelation',
                title: 'Acción'
            }
        break;
        case "reaction":
            res =  {
                icon: Reaction(),
                action: 'reaction',
                title: 'Reacción'
            }
        break;
        case "in":

            res = {
                icon: zoomInIcon(),
                action: 'in',
                title: 'Acercar',
            }
        break;
        case "out":

            res = {
                icon: zoomOutIcon(),
                action: 'out',
                title: 'Alejar'
            }
        break;
        case "dotted":

            res = {
                icon: DottedLine(),
                action: 'dot',
                title: 'Intra-acción'
            }
        break;
        case "continuous":

            res = {
                icon: ContinuousLine(),
                action: 'con',
                title: 'Interacción'
            }
        break;
        default:
            console.log("default")
        break;
    }
    return res
};




export {  returnAction };
