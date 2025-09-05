/**
 * Como verificar se já existe um usuario cadstrado no sistema?
 */
import z from "zod";

export const cadastroFormSchema = z.object({
    name: z.string()
        .nonempty({ message: 'O nome é obrigatório.' }),

    email: z.string({ message: 'Deve ser um email válido.' })
        .nonempty({ message: 'O email é obrigatório.' }),

    password: z.string()
        .nonempty({ message: 'A senha é obrigatória.' })
        .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),

    confirm_password: z.string()
        .nonempty({ message: 'A senha é obrigatória.' })
})

export type CadastroFormData = z.infer<typeof cadastroFormSchema>;
