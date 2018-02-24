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
           	
            float parabola( in float x, in float k ) {
                return pow( 4.0*x*(1.0-x), k );
            }

            void main () {
                
                //temporarily store the resolution as local var
                vec2 st = uv;
                
                //remap space from -1 to 1
                st = st *2.-1.;
                
                float pct = sin(time * .0005) + length(st);
                
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
