import * as joint from 'jointjs';

export default function Attribute() {

    var rect2 = new joint.shapes.standard.Rectangle({
        position: { x: 450, y: 250 },
        size: { width: 100, height: 80 },
        class: 'attribute',
        attrs: {
            root: {
                tabindex: 2,
                key: '',
                attrval: '',
                removey: '0%',
                removex: '100%',
                title: 'Seleccione un atributo'
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
        }
    });


    return rect2

}