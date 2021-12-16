import * as joint from 'jointjs';

export default function Action() {

    var rect2 = new joint.shapes.standard.EmbeddedImage({
        position: { x: 450, y: 250 },
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
            
        }
    });

    return rect2

}