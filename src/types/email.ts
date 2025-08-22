{/* Dados do email  */}
export type Email = {
    id: string;
    titulo: string;
    conteudo: string;
    idDeQuemEnviou: string;
    idDeQuemRecebeu: string;
    jaVisto: boolean;
    createdAt: Date;
};