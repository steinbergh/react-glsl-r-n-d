import GL from 'gl-react';
import React from 'react';

const shaders = GL.Shaders.create({
    noise: {
        frag: `
        precision highp float;
        varying vec2 uv;

        // uniform float intensity;

        uniform sampler2D tex;

        // 2D Random
        float random (in vec2 st) {
            return fract(sin(dot(st.xy,
                                vec2(12.9898,78.233)))
                        * 43758.5453123);
        }

        float noise (in vec2 _st) {
            vec2 i = floor(_st);
            vec2 f = fract(_st);
        
            // Four corners in 2D of a tile
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));
        
            vec2 u = f * f * (3.0 - 2.0 * f);
        
            return mix(a, b, u.x) +
                    (c - a)* u.y * (1.0 - u.x) +
                    (d - b) * u.x * u.y;
        }

        void main () {
            gl_FragColor = texture2D(tex, vec2(noise(uv)));
        }
        `
    }
});

export default GL.createComponent(
    ({ children: tex }) => (
        <GL.Node shader={shaders.noise} uniforms={{ tex }} />
    ),
    { displayName: 'Noise' }
);
