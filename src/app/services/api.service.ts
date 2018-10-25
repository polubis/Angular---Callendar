

export class ApiService{
    transformObjectIntoArray(object){
    let keys = Object.keys(object);
    let array = [];
    
    for(let key in keys){
      const colors = Object.values(object[keys[key]]);
      array = array.concat(colors);
    }
    return array;
    }
}