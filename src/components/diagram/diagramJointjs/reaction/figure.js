import * as joint from 'jointjs';

export default function Hardware() {

    var portAttrs = { circle: { r: 5, magnet: true, fill: '#ffffff', stroke: 'gray' }};

    var rect2 = new joint.shapes.standard.Path({
        position: { x: 60, y: 20 },
        size: { width: 100, height: 90 },
        attrs: {            
            root: {
                tabindex: 2,
                title: 'Reacción'
            },
            body: {
                fill: '#ffffff',
                rx: 5,
                ry: 5,
                strokeWidth: 2.5,
                refD: 'M 0 0 L 100 0 L 100 45 C 100 45 100 90 50 90 C 50 90 0 90 0 45 L 0 45 Z',
            }

        },
        ports: {
            groups: {
                left: { position: 'left', attrs: portAttrs },
                top: { position: 'top', attrs: portAttrs },
                bottom: { position: 'bottom', attrs: portAttrs },
                right: { position: 'right', attrs: portAttrs }
            }
        }
    });

    // set args on newly added
    rect2.addPort({ group: 'left' });
    rect2.addPort({ group: 'top' });
    rect2.addPort({ group: 'bottom' });
    rect2.addPort({ group: 'right' });

    return rect2

}