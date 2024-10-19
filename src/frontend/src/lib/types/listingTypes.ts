export type Listing = {
    id: number,
    category: number,
    category_name: string,
    title: string,
    description: string,
    price: string,
    images: [
        {
            id: number,
            image: string,
            listing: number,
        }
    ],
    host: number,
    host_username: string,
    host_first_name: string,
    host_about_me: string,
    host_profile_picture: string | null,
    host_member_since: string,
    host_response_rate: string,
    host_response_time: string,
    host_email_address: string,
    address: {
        street_name: string,
        house_number: number,
        house_addition: string,
        zip_code: string,
        latitude: number,
        longitude: number
    },
    created_at: string,
    updated_at: string,
    availabilities: [{
        id: number,
        listing: number,
        start_date: string,
        end_date: string
    }]
    unavailable_dates: [string],
    views: number,
    enable_booking: boolean
}

export type ListingPage = {
    next: number | null,
    previous: number | null,
    count: number,
    results: Listing[]
}