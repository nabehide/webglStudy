precision mediump float;
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

const float width = 0.05;

float rand(vec2 co){
  float a=fract(dot(co.xy, vec2(2.067390879775102, 12.451168662908249)))-0.5;
  float s=a*(6.182785114200511+a*a*(-38.026512460676566+a*a*53.392573080032137));
  return fract(s * 43758.5453);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float color = 0.;

  color += smoothstep(0.7, 0.7-0.01, length(p));

  // float t = time-mod(time,1.);
  float t = 27.;
  for(int i=0; i < int(2./width); i++){
    float pos = -1.+width*float(i);
    vec2 hv = step(vec2(-0.7,pos), p) * step(p, vec2(rand(vec2(t+pos,t+pos))*2.-1.7,pos+width));
    color -= hv.x * hv.y;
  }

  gl_FragColor = vec4(vec3(color), 1.);
}
