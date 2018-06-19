#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;
const float offset = 0.;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

mat2 rot(float t){
  return mat2(
    cos(t), -sin(t),
    sin(t), cos(t)
  );
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float t = time + offset;

  vec3 color = vec3(0.,0.,0.3);

  vec2 pos;
  float r = rand(vec2(t,t));
  if(r<0.05){
    pos = p * rot(0.5*PI);
    pos.y += rand(vec2(t,t+0.1))*2.-1.;
  }else if(r<0.1){
    pos = p * rot(0.);
    pos.y += rand(vec2(t,t+0.1))*2.-1.;
  }else{
    pos = p * rot(0.);
  }

  // line
  float line = min(0.5, 0.0001/abs(pos.y*(rand(vec2(pos.x,t-mod(t,0.1)))+0.003)));
  color += line;

  if(0.7<=abs(p.x) || 0.5<=abs(p.y)){
    color -= 1.;
  }

  gl_FragColor = vec4(color, 1.);
}
