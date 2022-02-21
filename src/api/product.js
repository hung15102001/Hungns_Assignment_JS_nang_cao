import instance from "./config";

export const getAll = () => {
    const url = "/products";
    return instance.get(url);
};
export const get = (id) => {
    const url = `/products/${id}`;
    return instance.get(url);
};
export const remove = (id) => {
    const url = `/products/${id}`;
    return instance.delete(url);
};
export const add = (product) => {
    const url = `/products`;
    return instance.post(url, product);
};
export const edit = (post) => {
    const url = `/products/${post.id}`;
    return instance.put(url, post);
};
export const getCate = (id) =>{
    const url = `/products?cateId=${id}`;
    return instance.post(url, id)
}

