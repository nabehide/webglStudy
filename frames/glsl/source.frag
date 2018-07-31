#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;
const int NSquare = 5;
const float speed = 2.;
const float period = 6.;

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

float square(vec2 p, float size){
  return smoothstep(size*1.01, size, p.y) * smoothstep(-size*1.01, -size, p.y) * smoothstep(-size*1.01, -size, p.x) * smoothstep(size*1.01, size, p.x);
}

float frame(vec2 p, float outer_size, float inner_size){
  return square(p, outer_size) - square(p, inner_size);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float frames = 0.;

  // float t = mod(time, period) / period * 2. * PI;
  // float t = mod(time, period / speed) * speed;

  for(int i=0; i < NSquare; i++){
    float a;
    if(i<3)  a = float(i+1);
    else if(i==3)  a = 1.;
    else if(i==4)  a = 2.;
    float t = mod(time, period / a) * a;

    float size = 0.9 - float(i)*0.2;
    // frames += frame(p - vec2(sin(float(i+1)*-t)*sin(float(i+1+NSquare))*0.1, pow(sin(float(i+1)*-t),2.))*0.1, size, size-0.05);
    frames += frame((p - vec2(noise(t, float(i)), noise(t, float(i+NSquare)))*0.2)*3., size, size-0.05);
  }

  vec3 color = vec3(frames);

  gl_FragColor = vec4(color, 1.);
}
