import * as joint from 'jointjs';

export default function Action() {

    var portAttrs = { circle: { r: 5, magnet: true, fill: '#ffffff', stroke: 'gray' }};
    var rect2 = new joint.shapes.standard.EmbeddedImage({
        position: { x: 60, y: 20 },
        size: { width: 100, height: 45 },
        attrs: {
            root: {
                tabindex: 2,
                ty: 'action',
                removey: '0%',
                removex: '100%',
                title: 'Seleccione una acción'
                
            },
            body: {
                fill: '#ffffff',
                rx: 5,
                ry: 5,
                strokeWidth: 2.5,
                strokeDasharray: '3 3 3',
            },
            image: { x: 35 }
            
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