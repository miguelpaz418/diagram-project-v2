import * as joint from 'jointjs';

export default function Point() {

    var portAttrs = { circle: { r: 5, magnet: true, fill: '#ffffff', stroke: 'gray' }};

    var rect2 = new joint.shapes.standard.Path({
        position: { x: 60, y: 20 },
        size: { width: 45, height: 45 },
        class: 'point',
        attrs: {
            root: {
                tabindex: 2,
                title: 'Intersección'
            },
            body: {
                fill: '#ffffff',
                rx: 5,
                ry: 5,
                strokeWidth: 2.5,
                refD: 'M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14c-3.314 0-6-2.686-6-6s2.686-6 6-6c3.314 0 6 2.686 6 6s-2.686 6-6 6zM5 8c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3z',
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