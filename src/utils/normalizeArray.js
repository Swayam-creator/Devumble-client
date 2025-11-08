export const normalize=(value)=>{
    if(Array.isArray(value)) return value
    else if(value) return [value];
    return [];
}