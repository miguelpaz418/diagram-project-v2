import * as joint from 'jointjs';

export default function Multimedia() {

    var portAttrs = { circle: { r: 5, magnet: true, fill: '#ffffff', stroke: 'gray' }};

    var rect2 =  new joint.shapes.standard.Polygon({
        position: { x: 450, y: 250 },
        size: { width: 75, height: 75 },
        class: 'object',
        attrs: {
            root: {
                tabindex: 5,
                labelcolor: '#333333',
                removey: '25%',
                removex: '75%',
                title: 'Objeto multimedia',
                rid: '0'
            },
            body: {
                fill: '#FFB74D',
                rx: 5,
                ry: 5,
                strokeWidth: 2,
                refPoints: '0,10 10,0 20,10 10,20'
            },
            label: {
                textWrap: {
                    ellipsis: true,
                    width: '70%',
                    height: 40
                },
                fontSize: 12,
                fontWeight: 'bold',
                fill: '#333333',
            }
        },
        actions: [],
        attributes: [],
        embeds: [],
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