#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;
const int Ncircle = 21;
const float period = 3.;
const float speed = 1.;

float hue2rgb(float f1, float f2, float hue) {
  if (hue < 0.0)
    hue += 1.0;
  else if (hue > 1.0)
    hue -= 1.0;
  float res;
  if ((6.0 * hue) < 1.0)
    res = f1 + (f2 - f1) * 6.0 * hue;
  else if ((2.0 * hue) < 1.0)
    res = f2;
  else if ((3.0 * hue) < 2.0)
    res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
  else
    res = f1;
  return res;
}

vec3 hsl2rgb(vec3 hsl) {
  vec3 rgb;
  
  if (hsl.y == 0.0) {
    rgb = vec3(hsl.z); // Luminance
  } else {
    float f2;
    
    if (hsl.z < 0.5)
      f2 = hsl.z * (1.0 + hsl.y);
    else
      f2 = hsl.z + hsl.y - hsl.y * hsl.z;
    
    float f1 = 2.0 * hsl.z - f2;
    
    rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
    rgb.g = hue2rgb(f1, f2, hsl.x);
    rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
  }   
  return rgb;
}

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(float s, float o){
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

float circle(vec2 p, vec2 pos, float scale){
  return 0.004 * scale / pow(length(p-pos),2.);
}

mat2 rot(float t){
  return mat2(cos(t),-sin(t),sin(t),cos(t));
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float circles = 0.;
  vec3 color = vec3(0.);

  float t = mod(time, period)/period*360.;

  vec2 pos = p * rot(radians(-10.+0.2*sin(radians(t))));
  pos.y += 0.002*pow(sin(radians(t)),2.);

  for(int i=0; i < Ncircle; i++){
    float tt = mod((time+pow(float(i)*0.73,2.))*speed, period);

    // float scale = 0.05 * rand(vec2(float(i))) * (10.+1.5*sin(radians(t+2000.*rand(vec2(float(i))))));
    float scale = 0.05 * rand(vec2(float(i))) * (10.+5.*noise(tt,float(i)*0.1));

    // float circle = min(circle(p, vec2(float(i)/float(Ncircle-1)*2.-1.,0.), scale),0.5);
    float circle = min(circle(vec2(pos.x, pos.y+noise(tt,float(i)*0.2)*0.02), vec2(float(i)/float(Ncircle-1)*2.-1.,0.), scale),0.5);

    // float h = 210./360. + rand(vec2(float(i)))*0.2 + sin(radians(t+2000.*rand(vec2(float(i)))))*rand(vec2(float(i)))*0.1;
    // float h = 210./360. + rand(vec2(float(i)))*0.2 + sin(radians(tt/period*360.))*rand(vec2(float(i)))*0.1;
    float h = 200./360. + rand(vec2(float(i)))*0.2 + noise(tt,float(i)*0.3)*0.1;
    // float s = 80./100.;
    float s = 78./100. + rand(vec2(float(i)))*0.05 + noise(tt,float(i)*0.4)*0.05;
    // float l = 44./100.;
    float l = 42./100. + rand(vec2(float(i)))*0.05 + noise(tt,float(i)*0.5)*0.05;
    color += hsl2rgb(vec3(h,s,l)) * circle;
  }

  gl_FragColor = vec4(color, 1.);
}
