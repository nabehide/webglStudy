mat2 rot(float t){
  return mat2(cos(t),-sin(t),sin(t),cos(t));
}

#pragma glslify: export(rot)
