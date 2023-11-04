import { AxiosResponse } from 'axios';
import apiInstance  from "../../utils/createAxioInstance";
import { PostCreateRoom } from './types';

export async function postRoomCreateRequest(postBoardData: PostCreateRoom): Promise<void>{
    try {
        const response: AxiosResponse = await apiInstance.post('/api/rooms/create', postBoardData);
        console.log('POST 요청 성공:', response.data);
    } catch (error) {
        console.error('POST 요청 오류:', error);
    }
}

