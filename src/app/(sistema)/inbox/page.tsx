'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    createdAt: new Date('2025-08-22T14:30:00'),
  },
  {
    // --- Email 2: Notificação, já lido ---
    id: 'uuid-002-def',
    titulo: 'Seu pedido #5823 foi enviado!',
    conteudo: 'Boas notícias! Seu pedido contendo "Livro de TypeScript Avançado" foi postado e deve chegar em 3 dias úteis. O código de rastreio é BR123456789.',
    idDeQuemEnviou: 'contato@livrariaonline.com.br',
    idDeQuemRecebeu: 'seu.email@dominio.com',
    jaVisto: true,
    createdAt: new Date('2025-08-21T18:15:00'),
  },
  {
    // --- Email 3: Pessoal, não lido ---
    id: 'uuid-003-ghi',
    titulo: 'Fotos do nosso final de semana',
    conteudo: 'Oi! Tudo bem? Seguem as fotos que tiramos no final de semana na praia. Ficaram ótimas! Me avisa o que achou. Beijos, Carlos.',
    idDeQuemEnviou: 'carlos.amigo@emailpessoal.com',
    idDeQuemRecebeu: 'seu.email@dominio.com',
    jaVisto: false,
    createdAt: new Date('2025-08-20T11:45:00'),
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
        toast.error("Erro ao carregar os emails", {
          description: "Ocorreu um erro ao buscar os dados. Tente novamente.",
        });
      }
    }
    fetchEmails();
  }, []);

  const handleEmailClick = (email: Email) => {
    console.log("Email selecionado:", email.id);
  };

  return (
<div className="border rounded-lg bg-card text-card-foreground overflow-hidden">
  <Table>
    <TableHeader>
      <TableRow className="border-t-0 hover:bg-transparent">
        <TableHead className="w-[80px] border-r">Enviado por:</TableHead>
        <TableHead className="border-r">Nome:</TableHead>
        <TableHead className="border-r">Título:</TableHead>
        <TableHead className="text-right w-[150px]">Visto:</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {emails.map((email) => (
        <TableRow
          key={email.id}
          onClick={() => handleEmailClick(email)}
          className="border-t"
        >
          <TableCell className="border-r">{email.idDeQuemEnviou}</TableCell>
          <TableCell className="border-r">{email.idDeQuemEnviou}</TableCell>
          <TableCell className="text-right text-muted-foreground border-r">{email.titulo}</TableCell>
          <TableCell className="flex justify-center items-center">
            {!email.jaVisto && (
              <div className="w-2 h-2 rounded-full bg-blue-500" title="Não lido"></div>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
  );
}