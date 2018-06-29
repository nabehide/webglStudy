#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;
const float speed = 1.5;

mat2 rot(float t){
  return mat2(cos(t), -sin(t), sin(t), cos(t));
}

float pentagon(vec2 st, float scale, float theta){
  float d = 0.0;
  st = (st *2.-1.) * scale * rot(radians(theta));
  int N = 5;
  float a = atan(st.x,st.y)+PI;
  float r = 2.*PI/float(N);
  d = cos(floor(.5+a/r)*r-a)*length(st);
  return (1.0-smoothstep(.4,.41,d));
}

void main(void){
  vec2 p = gl_FragCoord.xy/resolution.xy;
  p.x *= resolution.x/resolution.y;

  float color = 0.;
  for(int i=0; i<10; i++){
    float scale = pow(sin(54.0/180.0*PI),float(i));
    color += pentagon(p,1./scale,108.0*float(i)) * sin(-time*float(i+1)*speed);
  }

  gl_FragColor = vec4(vec3(0.,0.,color),1.0);
}
