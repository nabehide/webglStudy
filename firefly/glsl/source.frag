#ifdef GL_ES
precision mediump float;
#define GLSLIFY 1
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

const int NGrass = 100;
const int NCloud = 1;
const int NBug = 9;
const float period = 3.;
const float offset = 0.;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(float s, float o, float period){
  float i = floor(s);
  float f = fract(s);
  float u = f * f * (3. - 2. * f);

  float s1 = rand(vec2(i/100.,i*o/100.));
  float s2;
  if(s < period-1.){
     s2 = rand(vec2((i+1.)/100.,(i+1.)*o/100.));
  }else{
     s2 = rand(vec2(0.,0.));
  }

  return mix(s1, s2, u);
}

float noise2d(in vec2 st, float seed){
  vec2 i = floor(st + seed);
  vec2 f = fract(st + seed);
  vec2 u = f*f*(3.-2.*f);

  float MAX = 0.3;

  float a = max(MAX,rand(i));
  float b = max(MAX,rand(i + vec2(1.,0.)));
  float c = max(MAX,rand(i + vec2(0.,1.)));
  float d = max(MAX,rand(i + vec2(1.,1.)));

  return mix(a, b, u.x) + (c - a) * u.y * (1. - u.x) + (d - b) * u.x * u.y;
}

float moon(vec2 p){
  return min(0.05 / pow(length(p - vec2(0., 0.4)), 1.0), 0.4);
}

float circle(vec2 p, float size){
  return smoothstep(size, size-0.01, length(p));
}

float grass(vec2 p, vec2 a, vec2 wind){
  vec2 pos = vec2(p.x, p.y/1.5);
  float ground = smoothstep(0., 0.-0.01, pos.y);

  float c1, c2;
  float c = 0.;
  if(a.x < 0.){
    c1 = circle(vec2(pos.x    *wind.x, (pos).y  *wind.y), 0.5);
    c2 = circle(vec2((pos-a).x*wind.x, (pos-a).y*wind.y), 0.5);
    c = c1 - c2;
  }else{
    c1 = circle(vec2(pos.x    *wind.x, pos.y    *wind.y), 0.5);
    c2 = circle(vec2((pos-a).x*wind.x, (pos-a).y*wind.y), 0.5);
    c = c1 - c2;
  }

  return max(c - ground, 0.);
}

float grasses(vec2 p){
  float draw = 0.;
  for(int i=0; i < NGrass; i++){
    float posX = rand(vec2(float(i))) * 2. - 0.5;

    float MAX_AX = 0.04;
    float MIN_AX = -0.04;
    float aX = rand(vec2(float(i)+0.1)) * (MAX_AX-MIN_AX)+MIN_AX;

    float aY = rand(vec2(float(i)+0.2)) * 0.1 + 0.04;
    float t = mod(time+float(i)*0.1, period);

    float n = noise(float(t), float(i), period);
    // float n = noise(mod((time+p.x)*2., period*2.), 0., period*2.);

    vec2 wind = vec2(1.+0.05*n, 1.+0.1*n);
    wind.y /= 0.8;
    draw -= grass(p-vec2(posX, -1.), vec2(aX, aY), wind);
  }
  return draw;
}

float fog(vec2 p){
  return smoothstep(1., -1., p.y) * 0.15;
}

float cloud(in vec2 p, in float t, in float index){
  float draw = noise2d(vec2(
    (p.x + (noise(float(t), index, period)*2.-1.)*0.4 )*1.,
    (p.y + (noise(float(t), index, period)*2.-1.)*0.02)*8.
  ), index) * 0.2;
  draw *= smoothstep(-1., 1., p.y);
  return draw;
}

float clouds(in vec2 p, float t){
  float draw = 0.;
  for(int i=0; i < NCloud; i++){
    draw += cloud(p, t, float(i));
  }
  draw = min(1., draw);
  return draw;
}

float bug(vec2 p, float index, float t, float t2){
  float random  = rand(vec2(index+t2*0.1)+0.0);
  float random2 = rand(vec2(index+t2*0.2)+0.1);

  float MAX_POS_X =  1.0;
  float MIN_POS_X = -1.0;
  float MAX_POS_Y =  0.0;
  float MIN_POS_Y = -1.0;
  vec2 pos = vec2(
    random  * (MAX_POS_X - MIN_POS_X) + MIN_POS_X,
    random2 * (MAX_POS_Y - MIN_POS_Y) + MIN_POS_Y
  );
  pos += vec2(
    cos((t+random2*3.3)/period*PI/2.)*random *0.2,
    sin((t+random *3.3)/period*PI/2.)*random2*0.2
  );

  float MAX_S = 2.0;
  float MIN_S = 0.5;
  float s = max((sin(t+random)*PI/2. - 0.5)*(random*(MAX_S-MIN_S)+MIN_S), 0.);

  return min(0.001 / pow(length(p - pos), 1.0), 0.4) * s;
}

float bugs(vec2 p, float t){
  float draw = 0.;
  for(int i=0; i < NBug; i++){
    draw += bug(p, float(i), t, floor(time/period+offset));
  }
  return draw;
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float t = mod(time, period);

  vec3 color = vec3(0.);

  color += moon(p);
  color += grasses(p);
  color += fog(p);
  color += clouds(p, t);
  color += bugs(p, t);

  gl_FragColor = vec4(color, 1.);
}
