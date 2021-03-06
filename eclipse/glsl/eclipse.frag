#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

const float width = 0.05;

float rand(float x){
  return fract(sin(x)*100000.);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float color = 0.;

  color += smoothstep(0.7, 0.7-0.01, length(p));

  float MIN = -0.71;
  float MAX = 0.7;

  // float t = mod(time,6.)-mod(time,0.1);
  float t = 9.;
  for(int i=0; i < int(2./width); i++){
    float pos = -1.+width*float(i);
    vec2 hv = step(vec2(MIN,pos), p) * step(p, vec2(rand(pos+t)*(MAX-MIN)+MIN,pos+width));
    color -= hv.x * hv.y;
  }

  gl_FragColor = vec4(vec3(color), 1.);
}
