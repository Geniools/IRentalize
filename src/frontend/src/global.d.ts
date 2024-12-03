import {Block} from "@blocknote/core";

export {};

declare global {
    type Location = {
        city: string,
        country: string,
    }

    type Address = {
        name?: string,
        street_name?: string,
        number?: number,
        number_addition?: string,
        zip_code: string,
        province?: string,
        location?: Location,
        latitude?: number,
        longitude?: number
    }

    type ListingCategory = {
        name: string,
        icon?: string,
    }

    type ListingImage = {
        image: string
    }

    type Listing = {
        id: number,
        images?: ListingImage[],
        category?: ListingCategory[],
        address?: Address,
        name: string,
        content: Block[],
        summary: Block[],
        price_details: Block[],
        contact_details: Block[],
        created_at: string,
        updated_at: string,
    }

    type ListingPage = {
        count: number,
        next?: number,
        previous?: number,
        results: Listing[]
    }
}
