type QueryParms = {
    [key: string]: string;
};

type Indices = {
    indices: Array<Array<number>>;
    value: string;
    key: string;
    arrayIndex: number;
}

type PostFuse = {
    title: string;
    date: string;
    description: string;
    cover_image: string;
    tags: Array<string>;
    slug: string;
    path: string;
    [key: string]: string | Array<string>;
};

type PostMatchesFuse = {
    item: PostFuse;
    matches: Array<Indices>;
    score: number;
}
