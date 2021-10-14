import zoomInIcon from "./zoom-in/icon";
import zoomOutIcon from "./zoom-out/icon";
import Hardware from "./hardware/icon";
import Passive from "./passive/icon";
import Multimedia from "./multimedia/icon";
import Action from "./action/icon";
import Attribute from "./attribute/icon";

const listOfActions = [    
    {
        icon: zoomInIcon(),
        action: 'in',
    },
    {
        icon: zoomOutIcon(),
        action: 'out',
    },
    {
        icon: Hardware(),
        action: 'hardware',
    },
    {
        icon: Passive(),
        action: 'passive',
    },
    {
        icon: Multimedia(),
        action: 'multimedia',
    },
    {
        icon: Action(),
        action: 'action',
    },
    {
        icon: Attribute(),
        action: 'attribute',
    }
]


export { listOfActions };
