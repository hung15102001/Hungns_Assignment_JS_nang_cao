import instance from "./config";

export const getAll = () => {
    const url = "/cateProducts";
    return instance.get(url);
};
export const get = (id) => {
    const url = `/cateProducts/${id}`;
    return instance.get(url);
};
export const remove = (id) => {
    const url = `/cateProducts/${id}`;
    return instance.detele(url);
};
export const add = (product) => {
    const url = `/cateProducts`;
    return instance.post(url, product);
};
export const edit = (post) => {
    const url = `/cateProducts/${post.id}`;
    return instance.put(url, post);
};