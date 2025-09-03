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
import { Card, CardContent } from "@/components/ui/card"; // 1. Importa o Card
import { Separator } from "@/components/ui/separator";   // 2. Importa o Separator

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
  };return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Caixa de Entrada</h1>

      {/* Cabeçalho da Tabela (continua sendo um div simples) */}
      <div className="hidden md:flex px-4 text-sm font-medium text-muted-foreground">
        <div className="flex-1">Remetente</div>
        <div className="flex-1">Título</div>
        <div className="w-[150px] text-right">Data</div>
        <div className="w-[80px] text-center">Status</div>
      </div>

      {/* Corpo da Tabela */}
      <div className="space-y-3">
        {emails.map((email) => (
          // 3. CADA LINHA AGORA É UM COMPONENTE <Card>
          <Card
            key={email.id}
            onClick={() => handleEmailClick(email)}
            className={`cursor-pointer hover:border-primary transition-colors ${
              !email.jaVisto ? 'font-bold' : ''
            }`}
          >
            <CardContent className="flex items-center p-4">
              
              {/* Célula 1: Remetente */}
              <div className="flex-1 pr-4">
                {email.idDeQuemEnviou}
              </div>

              {/* 4. A DIVISÓRIA VERTICAL AGORA É UM <Separator> */}
              <Separator orientation="vertical" className="h-6" />

              {/* Célula 2: Título */}
              <div className="flex-1 px-4">
                {email.titulo}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Célula 3: Data */}
              <div className="w-[150px] text-right px-4 text-muted-foreground">
                {email.createdAt.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                })}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Célula 4: Status */}
              <div className="w-[80px] flex justify-center items-center pl-4">
                {!email.jaVisto && (
                  <div className="w-2 h-2 rounded-full bg-blue-500" title="Não lido"></div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}