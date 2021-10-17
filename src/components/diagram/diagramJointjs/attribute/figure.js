import * as joint from 'jointjs';

export default function Attribute() {

    var portAttrs = { circle: { r: 5, magnet: true, fill: '#ffffff', stroke: 'gray' }};
    var rect2 = new joint.shapes.standard.Rectangle({
        position: { x: 60, y: 20 },
        size: { width: 100, height: 80 },
        attrs: {
            root: {
                tabindex: 2,
                ty: 'attribute',
                key: '',
                attrval: '',
                removey: '0%',
                removex: '100%',
                title: 'Atributo'
            },
            body: {
                fill: '#ffffff',
                rx: 5,
                ry: 5,
                strokeWidth: 2
            },
            label: {
                textWrap: {
                    ellipsis: true,
                    width: '75%',
                    height: 50
                },
                fontSize: 12,
                fontWeight: 'bold',
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