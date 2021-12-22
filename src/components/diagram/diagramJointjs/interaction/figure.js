import * as joint from 'jointjs';

export default function Interaction() {

    var portAttrs = { circle: { r: 5, magnet: true, fill: '#ffffff', stroke: 'gray' }};

    var rect2 = new joint.shapes.standard.EmbeddedImage({
        position: { x: 450, y: 250 },
        size: { width: 60, height: 45 },
        class: 'interaction',
        attrs: {
            root: {
                tabindex: 2,
                removey: '0%',
                removex: '100%',
                title: 'Seleccione una interacción'
            },
            body: {
                fill: '#ffffff',
                rx: 5,
                ry: 5,
                strokeWidth: 2.5,
                strokeDasharray: '0,0 100,10 10,10',
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