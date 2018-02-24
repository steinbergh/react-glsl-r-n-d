import GL from 'gl-react';
import React from 'react';

const shaders = GL.Shaders.create({
    chromaticAberration: {
        frag: `
        precision highp float;
        varying vec2 uv;

        uniform vec3 offsets;
         
        uniform sampler2D tex;
         
        void main() {
         
        //access the colors of the texture at an offset
        float redValue = texture2D(tex, uv + offsets.r).r;
        float greenValue = texture2D(tex, uv + offsets.g).g;
        float blueValue = texture2D(tex, uv + offsets.b).b;
         
        //make a new color from the offset colors
         
        gl_FragColor = vec4( redValue, greenValue, blueValue, 1.0f);
        }
        `
    }
});

export default GL.createComponent(
    ({ offset_r, offset_g, offset_b, children: tex }) => (
        <GL.Node
            shader={shaders.chromaticAberration}
            uniforms={{ offsets: [offset_r, offset_g, offset_b], tex }}
        />
    ),
    { displayName: 'ChromaticAberration' }
);
