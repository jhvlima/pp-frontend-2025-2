import z from "zod";

export const loginFormSchema = z.object({
    email: z.email()
        .nonempty({ message: 'O email é obrigatório.' }),

    senha: z.string()
        .nonempty({ message: 'A senha é obrigatória.' })
        .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })

})

export type LoginFormData = z.infer<typeof loginFormSchema>;
