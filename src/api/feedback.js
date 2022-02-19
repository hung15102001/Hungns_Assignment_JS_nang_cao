import instance from "./config";

export const add = (contact)=>{
    const url = `/contacts`;
    return instance.post(url, contact);
}

export const getAll = () => {
    const url = `/contacts`;
    return instance.get(url)
}