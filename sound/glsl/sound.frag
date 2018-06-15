precision mediump float;
uniform float iSampleRate;
uniform float iBlockOffset;

float rand(float seed){
  return fract(sin(seed)*10000.);
}

float tri(in float freq, in float time) {
  return -abs(1. - mod(freq * time * 2., 2.));
}

vec2 mainSound( float time )
{
  float freq = 110.;
  // freq *= (1.+floor(mod(time, 6.));
  // freq *= fract(rand(fract(mod(time,1.))) * 6.);
  freq *= (1.+floor(rand(floor(time))*6.));
  return vec2(
    tri(freq, time)*0.5,
    tri(freq, time)*0.5
  );
}   

void main() {
  float t = iBlockOffset + ((gl_FragCoord.x-0.5) + (gl_FragCoord.y-0.5)*512.0) / iSampleRate;
  vec2 y = mainSound(t);
  vec2 v  = floor((0.5+0.5*y)*65536.0);
  vec2 vl = mod(v,256.0)/255.0;
  vec2 vh = floor(v/256.0)/255.0;
  gl_FragColor = vec4(vl.x,vh.x,vl.y,vh.y);
}
