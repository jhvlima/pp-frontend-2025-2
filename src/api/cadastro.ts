import { AxiosError } from "axios";
import { api } from '@/lib/api';
import { CadastroFormData } from '@/types/cadastro';

export async function cadastro(data: CadastroFormData) {
    console.log(data)
    try {
        const response = await api.post("/user", data);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError){
            return {error: error.response?.data.messenge}
        }
        return { error: "Erro inesperado" };
    }
}