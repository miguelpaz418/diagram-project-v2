import Action from "./action/component";
import actionIcon from "./action/icon";
import ObjectHardware from "./object-hardware/component";
import objectHardwareIcon from "./object-hardware/icon";
import ObjectPassive from "./object-passive/component";
import objectPassiveIcon from "./object-passive/icon";
import ObjectMultimedia from "./object-multimedia/component";
import objectMultimediaIcon from "./object-multimedia/icon";
import ObjectSoftware from "./object-software/component";
import objectSoftwareIcon from "./object-software/icon";
import Attribute from "./attribute/component";
import attributeIcon from "./attribute/icon";
import Reaction from "./reaction/component";
import reactionIcon from "./reaction/icon";
import Interrelation from "./interrelation/component";
import interrelationIcon from "./interrelation/icon";
import Interaction from "./interaction/component";
import interactionIcon from "./interaction/icon";
import Point from "./point/component";
import pointIcon from "./point/icon";

const config = {
  entityTypes: {
    Point: {
      width: 45,
      height: 45
    },
    Interaction: {
      width: 60,
      height: 45
    },
    Reaction: {
      width: 100,
      height: 90
    },
    Interrelation: {
      width: 100,
      height: 45
    },
    Attribute: {
      width: 100,
      height: 80
    },
    Action: {
      width: 100,
      height: 45
    },
    ObjectHardware: {
      width: 75,
      height: 75
    },
    ObjectPassive: {
      width: 75,
      height: 75
    },
    ObjectMultimedia: {
      width: 75,
      height: 75
    },
    ObjectSoftware: {
      width: 75,
      height: 75
    }
  },
  gridSize: 20
};

const customEntities = {
  Point: {
    component: Point,
    icon: pointIcon
  },
  Interaction: {
    component: Interaction,
    icon: interactionIcon
  },
  Reaction: {
    component: Reaction,
    icon: reactionIcon
  },
  Interrelation: {
    component: Interrelation,
    icon: interrelationIcon
  },
  Attribute: {
    component: Attribute,
    icon: attributeIcon
  },
  Action: {
    component: Action,
    icon: actionIcon
  },
  ObjectHardware: {
    component: ObjectHardware,
    icon: objectHardwareIcon
  },
  ObjectPassive: {
    component: ObjectPassive,
    icon: objectPassiveIcon
  },
  ObjectMultimedia: {
    component: ObjectMultimedia,
    icon: objectMultimediaIcon
  },
  ObjectSoftware: {
    component: ObjectSoftware,
    icon: objectSoftwareIcon
  }
};

export { config, customEntities };
