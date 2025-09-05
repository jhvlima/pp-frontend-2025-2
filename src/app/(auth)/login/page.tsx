'use client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormData, loginFormSchema } from "@/types/login";
import { login } from "@/api/login";
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import Image from "next/image";
import Link from 'next/link';
import { Key, Envelope } from 'phosphor-react';


export default function LoginPage() {
    const router = useRouter();

    // Para gerenciar o formulário de login
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            senha: ""
        },
        resolver: zodResolver(loginFormSchema)
    })
    // Executada quando ocorre a submissão
    async function handleLogin(data: LoginFormData) {
        try {
            const response = await login(data);
            if (response && typeof response === 'object' && 'error' in response) {
                toast.error(response.error as string);
                return;
            }
            Cookies.set("token", response);
            router.push('/inbox');
        } catch (error) {
            toast.error("Erro ao realizar o login.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="flex w-full max-w-sm flex-col items-center justify-center rounded-2xl bg-black p-6 sm:w-96 sm:p-8">
                <div className="w-48 md:w-64 mb-8">
                    <Image src="/logo2.svg" alt="Logo" width={512} height={128} />
                </div>

                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="flex w-full flex-col items-center gap-y-5"
                >
                    <div className="flex items-center border-b border-orange-700 py-1">
                        <Envelope className="text-gray-400 mr-3" size={20} />
                        <input
                            type="email"
                            placeholder="Seu ct-mail"
                            className="text-white p-2"
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (<span className="text-red-500 text-xs mt-1">{errors.email.message}</span>)}

                    <div className='flex items-center border-b border-orange-700 py-1'>
                        <Key className="text-gray-400 mr-3" size={20} />
                        <input
                            type="senha"
                            placeholder="Sua Senha"
                            className="text-white p-2"
                            {...register("senha")}
                        />
                    </div>
                    {errors.password && (<span className="text-red-500 text-xs mt-1">{errors.password.message}</span>)}

                    <button
                        type="submit"
                        className=" p-8 mt-4 bg-orange-600 py-3 rounded-lg font-bold text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black disabled:bg-gray-500"
                    >Entrar</button>

                    <div className="mt-2 text-center">
                        <Link href="/cadastro" className="hover:underline">
                            Não possui cadastro? Clique aqui para se cadastrar.
                        </Link>
                    </div>
                </form >
            </div >
        </div >
    );
}