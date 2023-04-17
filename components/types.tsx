export type Dish = {
    dishId: string,
    procedure: string,
}

export type DishPreview = {
    dishId: string,
    dishname: string,
    ingredients: string[],
    dishpicture: string,
    locality: string,
}

export type CompositeDishData = {
    dishId: string,
    dishname: string,
    ingredients: string[],
    dishpicture: string,
    locality: string,
    procedure: string,
}

export type SearchContextType = {
    searchData: DishPreview[],
    setSearchData: (a: DishPreview[]) => void
}