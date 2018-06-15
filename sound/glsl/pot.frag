#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2  resolution;

const float PI = 3.14159265;

const float handle_size = 0.02;
const float lid_thick = 0.02;
const float body_width = 0.3;

float rect(vec2 p, float l, float u, float r, float d, float a){
  // return smoothstep(l-a,l,p.x) * smoothstep(r,r-a,p.x) * smoothstep(u,u-a,p.y) * smoothstep(d-a,d,p.y);
  if(l<=p.x&&p.x<=r&&d<=p.y&&p.y<=u) return 1.;
  else                               return 0.;
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec3 color = vec3(0.);

  float a = 0.0001;

  float pot = 0.;

  // body
  pot += rect(p,-body_width,0.1,body_width,-0.2,a);
  pot -= rect(p,-body_width+0.02,0.1,body_width-0.02,-0.2+0.02,a);

  // left handle
  pot += rect(p,-body_width-0.1,0.05,-body_width,-0.05,a);
  pot -= rect(p,-body_width-0.1+handle_size,0.05-handle_size,-body_width,-0.05+handle_size,a);

  // right handle
  pot += rect(p,body_width,0.05,body_width+0.1,-0.05,a);
  pot -= rect(p,body_width,0.05-handle_size,body_width+0.1-handle_size,-0.05+handle_size,a);

  // lid
  pot += rect(p,-0.05,0.15+lid_thick,0.05,0.1+lid_thick,a);
  pot += rect(p,-body_width-0.02,0.1+lid_thick,body_width+0.02,0.1,a);

  color += vec3(pot);

  for(int i=0; i<3; i++){
    float offset = 0.2;
    float le = float(i)*0.1-0.2+offset;
    float up = float(i)*0.1-0.1;
    float ri = float(i)*0.1-0.1+offset;
    float dw = float(i)*0.1-0.2;

    float re;
    float gr;
    float bl;
    float sel = mod(float(i)+time,3.);
    if(sel<1.){
      re = 49./255.;
      gr = 49./255.;
      bl = 92./255.;
    }else if(sel<2.){
      re = 147./255.;
      gr = 0./255.;
      bl = 86./255.;
    }else{
      re = 210./255.;
      gr = 182./255.;
      bl = 46./255.;
    }
    color -= (1.-vec3(re,gr,bl)) * rect(p,le,up,ri,dw,a);
  }

  gl_FragColor = vec4(vec3(color), 1.);
}
