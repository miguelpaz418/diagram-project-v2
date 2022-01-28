import * as joint from 'jointjs';

export default function Reaction() {
    var rect2 = new joint.shapes.standard.Path({
        position: { x: 450, y: 250 },
        size: { width: 100, height: 90 },
        class: 'reaction',
        attrs: {            
            root: {
                tabindex: 2,
                removey: '0%',
                removex: '100%',
                title: 'Reacción'
            },
            body: {
                fill: '#ffffff',
                rx: 5,
                ry: 5,
                strokeWidth: 2.5,
                refD: 'M 0 0 L 100 0 L 100 45 C 100 45 100 90 50 90 C 50 90 0 90 0 45 L 0 45 Z',
            },
            label: {
                fill: '#333333',
                textWrap: {
                    ellipsis: true,
                    width: '75%',
                    height: '85%'
                },
                fontSize: 12,
                fontWeight: 'bold',
            }

        }
    });

    return rect2

}