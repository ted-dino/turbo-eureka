export interface Result {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Item {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    first_air_date?:    Date;
    name?:              string;
    origin_country?:    OriginCountry[];
    original_name?:     string;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export enum OriginCountry {
    CA = "CA",
    Jp = "JP",
    Kr = "KR",
    Us = "US",
}

export enum OriginalLanguage {
    En = "en",
    Fr = "fr",
    Ja = "ja",
    Uk = "uk",
}
