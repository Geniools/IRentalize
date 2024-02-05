import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";

import axiosInstanceFormDataAPI from "../services/axios/axios_content_type_formdata";

const createChatRoom = async (listingId) => {
    const formData = new FormData();
    formData.append("listing", listingId);

    return await axiosInstanceFormDataAPI.post("/api/chat/create-room/", formData);
}

const useCreateChatRoom = ({listingId}) => {
    const [chatRoomId, setChatRoomId] = useState(null);
    const {
        mutate,
        isPending,
        isError,
        isSuccess,
        error,
        data
    } = useMutation({
        mutationFn: createChatRoom,
    })

    useEffect(() => {
        if (isSuccess) {
            setChatRoomId(data.data.chat_room_id);
        }

        if (isError) {
            // Set the chat room id to the error response chat room id
            setChatRoomId(error.response.data.chat_room_id);
            // TODO: In case of a unexpected error, do something with the error here
            console.log(error.response.data.error)
        }

    }, [isSuccess, isError]);

    const createChatRoomHandler = () => {
        mutate(listingId);
    }

    return {
        createChatRoomHandler,
        isPending,
        chatRoomId,
        listingId
    };
}

export default useCreateChatRoom;