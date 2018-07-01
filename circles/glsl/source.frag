#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;
const int Ncircle = 100;
const float period = 3.;

float circle(vec2 p, vec2 pos, float scale){
  return 0.0004 / pow(abs(scale - length(p-pos)),1.);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec3 color = vec3(0.);

  float t = mod(time, period)/period*360.;

  for(int i=0; i < Ncircle; i++){
    float theta = radians(360./float(Ncircle)*float(i));
    float r = 0.6 + 0.01*cos(radians((t+float(i)/float(Ncircle)*360.*10.)));
    float scale = 0.01*(cos(radians((t-float(i)/float(Ncircle)*360.*10.)))+1.);
    color += circle(p, vec2(r*cos(theta), r*sin(theta)), scale);
  }

  gl_FragColor = vec4(color*vec3(p.x+sin(radians(t)),p.y+cos(radians(t)),length(p)+sin(radians(t))*cos(radians(t))), 1.);
}
