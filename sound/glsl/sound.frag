precision mediump float;
uniform float iSampleRate;
uniform float iBlockOffset;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float tri(in float freq, in float time) {
  return -abs(1. - mod(freq * time * 2., 2.));
}

float bassDrum(float time){
  float T = 4.;
  float t = mod(time*T,T);
  if(T/2.<=t && t<T/2.+1.){
    return 0.0;
  }
  return (tri(80.,time) + tri(50.,time)) * max(1.-1.5*mod(t,1.),0.);
}

float hiHat(float time){
  return rand(vec2(fract(time), fract(time+0.5))) * max(1.-50.*mod(time,0.25),0.);
}

float snere(float time){
  float t = fract(time) + 0.5;
  return rand(vec2(fract(t), fract(t+0.5))) * max(1.-10.*mod(t,1.),0.);
}

float bass(float time){
  float T = 8.;
  float s = 0.;
  float t = mod(time, T);
  if(t<(T/2.)){
    s = 110.;
  }else{
    s = 55. * (1. + 6./12.);
  }
  return tri(s, time) * max(1.-5.*mod(time, 0.25),0.);
}

vec2 mainSound( float time )
{
  float sound = 0.;

  // drum
  sound += bassDrum(time);
  sound += hiHat(time);
  sound += snere(time);

  // bass
  sound += bass(time);

  return vec2(sound, sound);
}   

void main() {
 float t = iBlockOffset + ((gl_FragCoord.x-0.5) + (gl_FragCoord.y-0.5)*512.0) / iSampleRate;
 vec2 y = mainSound(t);
 vec2 v  = floor((0.5+0.5*y)*65536.0);
 vec2 vl = mod(v,256.0)/255.0;
 vec2 vh = floor(v/256.0)/255.0;
 gl_FragColor = vec4(vl.x,vh.x,vl.y,vh.y);
} 
