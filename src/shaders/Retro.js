import GL from 'gl-react';
import React from 'react';

const shaders = GL.Shaders.create({
    retro: {
        frag: `
        precision highp float;
        varying vec2 uv;
        uniform vec2 res;

        uniform sampler2D tex;
        
        void main () {
            vec2 st = floor(uv * res) / res;
            gl_FragColor = texture2D(tex, st);
        }
        `
    }
});

export default GL.createComponent(
    ({ res_x, res_y, children: tex }) => (
        <GL.Node
            shader={shaders.retro}
            uniforms={{ res: [res_x, res_y], tex }}
        />
    ),
    { displayName: 'Retro' }
);
