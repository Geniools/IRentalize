import {useState} from "react";
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

    const createChatRoomHandler = () => {
        mutate(listingId);
    }

    return {
        createChatRoomHandler,
        isPending,
        isError,
        isSuccess,
        error,
        data,
        chatRoomId,
        listingId
    };
}

export default useCreateChatRoom;