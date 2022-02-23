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
export const getCate = (cateId) =>{
    const url = `/products?cateId=${cateId}`;
    return instance.get(url)
}
export const getAllByFilter = async (sort, listId) => {
    let queryString = "";
    listId.forEach((id, index) => {
        if (index === 0) {
            queryString += `?id=${id}`;
        } else {
            queryString += `&id=${id}`;
        }
    });

    if (sort) {
        const sortArr = sort.split("-");
        queryString += `&_sort=${sortArr[0]}&_order=${sortArr[1]}`;
    } else {
        queryString += "&_sort=id&_order=desc";
    }

    const url = `/products/${queryString}&_expand=category&_embed=ratings`;
    return instance.get(url);
};
