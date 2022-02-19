import * as joint from 'jointjs';

export default function Hardware() {

    var portAttrs = { circle: { r: 5, magnet: true, fill: '#ffffff', stroke: 'gray' }};
    var rect2 = new joint.shapes.standard.Circle({
        position: { x: 450, y: 250 },
        size: { width: 75, height: 75 },
        class: 'object',
        attrs: {
            root: {
                tabindex: 2,
                labelcolor: '#333333',
                removey: '15%',
                removex: '85%',
                title: 'Objeto hardware',
                rid: '0'
            },
            body: {
                fill: '#F06292',
                rx: 5,
                ry: 5,
                strokeWidth: 2
            },
            label: {
                fill: '#333333',
                textWrap: {
                    ellipsis: true,
                    width: '75%',
                    height: 50
                },
                fontSize: 12,
                fontWeight: 'bold',
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