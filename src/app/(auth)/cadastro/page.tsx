'use client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CadastroFormData, cadastroFormSchema } from "@/types/cadastro";
import { cadastro } from "@/api/cadastro";
import { toast } from 'sonner';
import Image from "next/image";
import Link from 'next/link';
import { Key, Envelope, CheckCircle, User } from 'phosphor-react';

export default function CadastroPage() {
    const router = useRouter();

    // Para gerenciar o formulário de cadastro
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CadastroFormData>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        resolver: zodResolver(cadastroFormSchema)
    })
    // Executada quando ocorre a submissão
    async function handleCadastro(data: CadastroFormData) {
        try {
            const response = await cadastro(data);
            if (response && typeof response === 'object' && 'error' in response) {
                toast.error(response.error as string);
                return;
            }
            toast.success("Cadastro realizado com sucesso!");
            router.push('/');
        } catch (error) {
            toast.error("Erro ao realizar o cadastro.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="flex w-full max-w flex-col items-center justify-center rounded-2xl bg-black p-6 sm:p-8">
                <div className="w-48 md:w-64 mb-8">
                    <Image src="/logo2.svg" alt="Logo" width={512} height={128} />
                </div>
                <form
                    onSubmit={handleSubmit(handleCadastro)}
                    className="flex w-full max-w-sm flex-col items-center"
                >
                    <div className="flex items-center border-b border-orange-700 py-1">
                        <User className="text-gray-400 mr-3" size={20} />
                        <input
                            type="name"
                            placeholder="Nome"
                            className="text-white p-2"
                            {...register("name")}
                        />
                    </div>
                    {errors.name && (<span className="text-red-500 text-xs mt-1">{errors.name.message}</span>)}

                    <div className="flex items-center border-b border-orange-700 py-1">
                        <Envelope className="text-gray-400 mr-3" size={20} />
                        <input
                            type="email"
                            placeholder="Ct-mail"
                            className="text-white p-2"
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (<span className="text-red-500 text-xs mt-1">{errors.email.message}</span>)}

                    <div className='flex items-center border-b border-orange-700 py-1'>
                        <Key className="text-gray-400 mr-3" size={20} />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="text-white p-2"
                            {...register("password")}
                        />
                    </div>
                    {errors.password && (<span className="text-red-500 text-xs mt-1">{errors.password.message}</span>)}

                    <div className='flex items-center border-b border-orange-700 py-1'>
                        <CheckCircle className="text-gray-400 mr-3" size={20} />
                        <input
                            type="confirm_senha"
                            placeholder="Confirmar senha"
                            className="text-white p-2"
                            {...register("confirm_password")}
                        />
                    </div>
                    {errors.confirm_password && (<span className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</span>)}

                    <button
                        type="submit"
                        className=" p-8 mt-4 bg-orange-600 py-3 rounded-lg font-bold text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black disabled:bg-gray-500"
                    >Cadastrar</button>

                    <div className="mt-2 text-center">
                        <Link href="/" className="hover:underline">
                            Voltar ao login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}