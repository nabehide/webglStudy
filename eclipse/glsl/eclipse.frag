precision mediump float;
// uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

const float width = 0.05;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float alpha = 0.;

  alpha += smoothstep(0.7, 0.7-0.05, length(vec2(p.x,p.y)));

  // float t = time-mod(time,1.);
  float t = 34.;
  for(int i=0; i < int(2./width); i++){
    float pos = -1.+width*float(i);
    vec2 hv = step(vec2(-1.,pos), p) * step(p, vec2(rand(vec2(t+pos,t+pos))*2.-1.5,pos+width));
    alpha -= hv.x * hv.y;
  }

  gl_FragColor = vec4(0.5, 0.5, 0.5, alpha);
}
