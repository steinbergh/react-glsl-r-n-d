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

            mat2 scale(vec2 _scale){
                return mat2(_scale.x,0.0,
                            0.0,_scale.y);
            }

            void main () {
                
                //temporarily store the resolution as local var
                vec2 st = uv;
                
                st = scale(vec2(0.5)) * st;

                //translate space
                vec2 translate = vec2(mod(time * .00009, 2.0), 0.0);
                st += translate;

                //give cells indices
                float index = 0.0;
                index += step(1., mod(st.x,2.0));

                //space now repeats
                st = fract(st);

                //check index and alternate gradients for smooth infinite movement
                float pct = index == 0.0 ? smoothstep(1.0, 0.0, st.x) : smoothstep(1.0, 0.0, 1.-st.x);
                

                //mix our colors
                vec4 color = mix(color_stop_1, color_stop_2, pct);

                gl_FragColor = color;
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
