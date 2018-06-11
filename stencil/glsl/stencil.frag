precision mediump float;
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

const float period = 3.;
const float width = 0.05;
const float offset = 0.;

float rand(float x){
  return fract(sin(x)*100000.);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec3 bg = vec3(1.);
  vec3 color = vec3(0.);

  float t = mod(time,period);

  for(int i=0; i<10; i++){
    float seed = floor((time+offset)/period+float(i));
    float stain = t/period;
    float x = rand(seed)*2.-1.;
    float y = rand(seed+1.)*2.-1.;
    vec2 center = vec2(x,y);
    float d = rand(float(i))*period/2.;
    float ts = max(t-d,0.);

    int sel = int(floor(rand(seed+2.)*3.));
    vec3 rgb = vec3(0.);
    if(sel==0){  // yellow
      rgb = bg-vec3(1.,1.,stain);
    }else if(sel==1){  // blue
      rgb = bg-vec3(stain,0.5+0.5*stain,1.);
    }else if(sel==2){  // green
      rgb = bg-vec3(0.3+0.7*stain,1.,stain);
    }

    float MAX_SIZE = 0.009;
    float MIN_SIZE = 0.0005;
    float MAX_SIZE_I = 0.15;
    float MIN_SIZE_I = 0.07;
    float size = (rand(seed+3.)*(MAX_SIZE-MIN_SIZE)+MIN_SIZE)*exp(ts);
    float size_i = (rand(seed+4.)*(MAX_SIZE_I-MIN_SIZE_I)+MIN_SIZE_I)*exp(ts);
    int selc = int(floor(rand(seed+3.)*3.));
    if(selc==0){  // yellow
      size = 0.009*(ts);
      size_i = 0.15*exp(ts);
      rgb = bg-vec3(1.,1.,stain);
    }else if(selc==1){  // blue
      size = 0.0015*(ts);
      size_i = 0.1*exp(ts);
      rgb = bg-vec3(stain,0.5+0.5*stain,1.);
    }else if(selc==2){  // green
      size = 0.0005*(ts);
      size_i = 0.07*exp(ts);
      rgb = bg-vec3(0.3+0.7*stain,1.,stain);
    }

    float add = 0.;
    add += min(size / pow(length(p-center),3.),1.);
    add -= min(smoothstep(size_i,size_i-0.02,length(p-center)),1.);

    color += add * rgb;
  }
  color = bg-color;

  gl_FragColor = vec4(color, 1.);
}
