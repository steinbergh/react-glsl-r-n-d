import GL from 'gl-react';
import React from 'react';

const shaders = GL.Shaders.create({
    gradient: {
        frag: `
            #define PI 3.14159265359
            #define TWO_PI 6.28318530718

            precision highp float;
            varying vec2 uv;
            
            uniform float time;
            uniform vec4 color_stop_1;
            uniform vec4 color_stop_2;
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

           	
            float parabola( in float x, in float k ) {
                return pow( 4.0*x*(1.0-x), k );
            }


            void main () {
                
                //temporarily store the resolution as local var
                vec2 st = uv;
                
                //remap space from -1 to 1
                st = st *2.-1.;
                
                float pct = sin(time * .0005) + length(noise(st));
                
                gl_FragColor = mix(color_stop_1,color_stop_2, parabola(pct, 7.));
        
            }
        `
    }
});

export default GL.createComponent(({ color_stop_1, color_stop_2, time }) => (
    <GL.Node
        shader={shaders.gradient}
        uniforms={{ color_stop_1, color_stop_2, time }}
    />
));
