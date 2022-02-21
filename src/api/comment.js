import instance from "./config";
export const add = (comment) =>{
    const url =  `/comments`;
    return instance.post(url, comment);
}
export const getAll = () => {
    const url = `/comments`;
    return instance.get(url)
}
export const remove = (id) => {
    const url = `/comments/${id}`;
    return instance.delete(url)
}  
