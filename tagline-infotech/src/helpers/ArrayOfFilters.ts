export interface IFilter {
    filter: string,
    values: string[]
}

export interface ICols {
    field: string
}

export const ArrayOfFilters = (filters: any) => {
    const result: IFilter[] = [];
    for (let data in filters) {
        result.push({ filter: data, values: filters[data] })
    }
    return result;
}

export const ColsFromFilters = (filters: any) => {
    const result:any = [];
    for (let data in filters) {
        result.push({field:data});
    }
    return result;
}