import zoomInIcon from "./zoom-in/icon";
import zoomOutIcon from "./zoom-out/icon";
import Hardware from "./hardware/icon";
import Passive from "./passive/icon";
import Multimedia from "./multimedia/icon";
import Action from "./action/icon";
import Attribute from "./attribute/icon";

function getActions (type) {
    let list = []
    if(type === "observer"){
        list = observerActions
    }else{
        list = coordinadorActions
    }

    return list
};


const observerActions = [    
    {
        icon: zoomInIcon(),
        action: 'in',
        title: 'Zoom in',
    },
    {
        icon: zoomOutIcon(),
        action: 'out',
        title: 'Zoom out'
    }
]

const coordinadorActions = [    
    {
        icon: zoomInIcon(),
        action: 'in',
        title: 'Zoom in'
    },
    {
        icon: zoomOutIcon(),
        action: 'out',
        title: 'Zoom out'
    },
    {
        icon: Hardware(),
        action: 'hardware',
        title: 'Add ObjectHardware'
    },
    {
        icon: Passive(),
        action: 'passive',
        title: 'Add ObjectPassive'
    },
    {
        icon: Multimedia(),
        action: 'multimedia',
        title: 'Add ObjectMultimedia'
    },
    {
        icon: Action(),
        action: 'action',
        title: 'Add Action'
    },
    {
        icon: Attribute(),
        action: 'attribute',
        title: 'Add attribute'
    }
]


export { getActions };
