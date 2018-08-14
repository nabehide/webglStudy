float rect(vec2 p, float l, float u, float r, float d, float a){
  return smoothstep(l-a,l,p.x) * smoothstep(r,r-a,p.x) * smoothstep(u,u-a,p.y) * smoothstep(d-a,d,p.y);
  // if(l<=p.x&&p.x<=r&&d<=p.y&&p.y<=u) return 1.;
  // else                               return 0.;
}

#pragma glslify: export(rect)
