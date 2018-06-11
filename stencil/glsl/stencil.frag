precision mediump float;
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

const float period = 3.;
const float width = 0.05;

float rand(float x){
  return fract(sin(x)*100000.);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec3 bg = vec3(1.);
  vec3 color = vec3(0.);

  float t = mod(time,period);

  for(int i=0; i<3; i++){
    float size;
    float size_i;
    vec2 center = vec2(0.);
    vec3 rgb = vec3(0.);
    float stain = t/period;
    float x = rand(floor(time/period)+float(i))*2.-1.;
    float y = rand(floor(time/period)+float(i)+1.)*2.-1.;
    if(i==0){  // yellow
      size = 0.009*t;
      size_i = 0.15*exp(t);
      center = vec2(x,y);
      rgb = bg-vec3(1.,1.,stain);
    }else if(i==1){  // blue
      size = 0.0015*t;
      size_i = 0.1*exp(t);
      center = vec2(-0.5,0.5);
      rgb = bg-vec3(stain,0.5+0.5*stain,1.);
    }else if(i==2){  // green
      size = 0.0015*t;
      size_i = 0.1*exp(t);
      center = vec2(-0.2,-0.7);
      rgb = bg-vec3(0.3+0.7*stain,1.,stain);
    }

    float add = 0.;
    add += size / pow(length(p-center),3.);
    add -= smoothstep(size_i,size_i-0.02,length(p-center)) * 10000000.;

    color += add * rgb;
  }
  color = bg-color;

  gl_FragColor = vec4(color, 1.);
}
