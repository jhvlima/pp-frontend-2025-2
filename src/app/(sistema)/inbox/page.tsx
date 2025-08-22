'use client'
import { api } from "@/lib/api";
import { Email } from "@/types/email";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Um array com três exemplos de emails
export const emailsExemplo: Email[] = [
  {
    // --- Email 1: Profissional, não lido ---
    id: 'uuid-001-abc',
    titulo: 'Reunião de Alinhamento - Projeto Alfa',
    conteudo: 'Olá equipe, gostaria de marcar nossa reunião de alinhamento para amanhã, às 10h. Por favor, confirmem a presença. Abraços, Joana.',
    idDeQuemEnviou: 'joana.silva@empresa.com',
    idDeQuemRecebeu: 'seu.email@dominio.com',
    jaVisto: false,
    createdAt: new Date('2025-08-22T14:30:00'), // Hoje, um pouco mais cedo
  },
  {
    // --- Email 2: Notificação, já lido ---
    id: 'uuid-002-def',
    titulo: 'Seu pedido #5823 foi enviado!',
    conteudo: 'Boas notícias! Seu pedido contendo "Livro de TypeScript Avançado" foi postado e deve chegar em 3 dias úteis. O código de rastreio é BR123456789.',
    idDeQuemEnviou: 'contato@livrariaonline.com.br',
    idDeQuemRecebeu: 'seu.email@dominio.com',
    jaVisto: true,
    createdAt: new Date('2025-08-21T18:15:00'), // Ontem
  },
  {
    // --- Email 3: Pessoal, não lido ---
    id: 'uuid-003-ghi',
    titulo: 'Fotos do nosso final de semana',
    conteudo: 'Oi! Tudo bem? Seguem as fotos que tiramos no final de semana na praia. Ficaram ótimas! Me avisa o que achou. Beijos, Carlos.',
    idDeQuemEnviou: 'carlos.amigo@emailpessoal.com',
    idDeQuemRecebeu: 'seu.email@dominio.com',
    jaVisto: false,
    createdAt: new Date('2025-08-20T11:45:00'), // Anteontem
  },
];

export default function InboxPage() {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    async function fetchEmails() {
      try {
        //const response = await api.get("/emails");
        const response = emailsExemplo;
        setEmails(response);
      } catch (err) {
        toast.message("Erro ao carregar os emails", err);
      }
    }
    fetchEmails();
  }, []);

  return (
    <div className="hidden md:flex flex-col bg-white text-black p-4 rounded-2xl">
      <h1 className="text-3xl font-bold mb-4">Caixa de Entrada</h1>
      <div className="flex justify-between">
        <p>Enviado por:</p>
        <p>Nome:</p>
        <p>Título:</p>
        <p>Visto:</p>
      </div>
      {emails.map((email) => (
        <div key={email.id} className="flex border justify-between">
          <p>{email.idDeQuemRecebeu}</p>
          <p>{email.idDeQuemEnviou}</p>
          <p>{email.titulo}</p>
          <p>{email.jaVisto}</p>
        </div>
      ))}
      {/* O Next.js vai pegar este `div` e colocá-lo no lugar do `{children}` 
        dentro do seu `RootLayout`.
      */}
    </div>
  );
}