import {AxiosRequestConfig} from "axios";

declare module "axios"{
    export interface AxiosInstance{
        <T=any>(config:AxiosRequestConfig):Promise<T>;
        request<T=any>(config:AxiosRequestConfig):Promise<T>;
        get<T=any>(config:AxiosRequestConfig):Promise<T>;
        delete<T=any>(config:AxiosRequestConfig):Promise<T>;
        head<T=any>(config:AxiosRequestConfig):Promise<T>;
        post<T=any>(config:AxiosRequestConfig):Promise<T>;
        put<T=any>(config:AxiosRequestConfig):Promise<T>;
        patch<T=any>(config:AxiosRequestConfig):Promise<T>;
    }
}
