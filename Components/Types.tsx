export type Address = {
    discName: string,
    latitude: number,
    longitude: number,
    throwDistance: number,
    id: string,
}
export type Store = {
    latitude: number,
    longitude: number,
    name: string,
    town: string,
}
export type SearchInput = {
    name: string,
}