import { AxiosResponse } from 'axios';
import apiInstance  from "../../utils/createAxioInstance";
import { PostBoardData } from './types';

export async function postBoardRequest(postBoardData: PostBoardData): Promise<void>{
    try {
        const response: AxiosResponse = await apiInstance.post('/api/board/create', postBoardData);
        console.log('POST 요청 성공:', response.data);
    } catch (error) {
        console.error('POST 요청 오류:', error);
    }
}

export async function getAllBoard(): Promise<AxiosResponse<PostBoardData[]>> {
    try {
        const response: AxiosResponse = await apiInstance.get('/api/board/all');
        console.log('GET 요청 성공:', response.data);
        return response;
    } catch (error) {
        console.error('GET 요청 오류:', error);
        throw error;
    }
}

export async function getPostById(postId: number): Promise<void>{
    try {
        const response: AxiosResponse = await apiInstance.get(`/api/board/${postId}`);
        console.log('GET 요청 성공:', response.data);
      } catch (error) {
        console.error('GET 요청 오류:', error);
      }
}

export async function postUpdateBoardRequest(postUpdateBoardData: PostBoardData): Promise<void>{
    try {
        const postId = postUpdateBoardData.id;
        const response: AxiosResponse = await apiInstance.post(`/api/board/${postId}/update`, postUpdateBoardData);
        console.log('POST 요청 성공:', response.data);
    } catch (error) {
        console.error('POST 요청 오류:', error);
    }
}

export async function deleteBoard(postId: number): Promise<void>{
    try {
        const response: AxiosResponse = await apiInstance.delete(`/api/board/${postId}/delete`);
        console.log('DELETE 요청 성공:', response.data);
      } catch (error) {
        console.error('DELETE 요청 오류:', error);
      }
}