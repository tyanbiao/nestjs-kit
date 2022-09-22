export function wrapDataWithPagination<T>(
    list: T[],
    total: number,
    param: {
        current?: number
        pageSize?: number
    }
) {
    return {
        results: list,
        total,
        ...param,
    }
}

export function handleSorter(orderBy: string[]) {
    const sorter: {
        [key: string]: 'asc' | 'desc'
    } = {}
    orderBy &&
        orderBy.forEach((item) => {
            if (item.startsWith('-')) {
                sorter[item.slice(1)] = 'desc'
            } else if (item.startsWith('+')) {
                sorter[item.slice(1)] = 'asc'
            } else {
                sorter[item] = 'asc'
            }
        })
    return sorter
}
