#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

float rect(vec2 p, float l, float u, float r, float d, float a){
  // return smoothstep(l-a,l,p.x) * smoothstep(r,r-a,p.x) * smoothstep(u,u-a,p.y) * smoothstep(d-a,d,p.y);
  if(l<=p.x&&p.x<=r&&d<=p.y&&p.y<=u) return 1.;
  else                               return 0.;
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec3 color = vec3(0.);

  float t = mod(time,1.);

  // bass
  float sign = 0.;
  if(mod(time,8.)<4.){
    sign = 1.;
  }else{
    sign = -1.;
  }

  // hihat
  if(0.<mod(t,0.25) && mod(t,0.25)<0.05){
    color += sign * p.x;
  }

  // snere
  if(0.5<t && t<0.55){
    color += 1.;
  }

  // bassdrum
  if((0.<t&&t<0.05) || (0.25<t&&t<0.3) || (0.75<t&&t<0.8)){
    color += sign * p.y;
  }

  gl_FragColor = vec4(vec3(color), 1.);
}
