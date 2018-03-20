// normRand = function(m, s){
function normRand(m, s){
  const a = 1 - Math.random();
  const b = 1 - Math.random();
  const c = Math.sqrt(-2 * Math.log(a));
  if (0.5 < Math.random()){
    return c * Math.sin(Math.PI * 2 * b) * s + m;
  }else{
    return c * Math.cos(Math.PI * 2 * b) * s + m;
  }
}
