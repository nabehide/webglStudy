precision mediump float;
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

const float width = 0.05;

float rand(float x){
  return fract(sin(x)*100000.);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float color = 0.;

  for(int i=0; i<10; i++){
    float MIN = -0.2;
    float MAX = 0.2;
    float x = rand(float(i*2))*(MAX-MIN)+MIN;
    float y = rand(float(i*3))*(MAX-MIN)+MIN;
    color += 0.000001 / pow(length(p-vec2(x,y)),2.);
  }

  gl_FragColor = vec4(vec3(color), 1.);
}
