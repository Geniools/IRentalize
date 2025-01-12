import {apiClient} from './client'

export const contactService = {
    submit: async (data: any) => {
        return apiClient.post('/contact-us/', data)
    }
}