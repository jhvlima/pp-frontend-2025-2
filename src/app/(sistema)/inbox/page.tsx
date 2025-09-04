'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";
import { Email } from "@/types/email";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
// Um array com três exemplos de emails
export const emailsExemplo: Email[] = [
  {
    // --- Email 1: Profissional, não lido ---
    id: '',
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


// Função para extrair o primeiro nome do e-mail
const getFirstName = (email: string) => email.split('@')[0];

export default function InboxPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  // Estado para armazenar o ID do email selecionado
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  useEffect(() => {
    setEmails(emailsExemplo);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Caixa de Entrada</h1>

      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="hidden md:flex p-4 text-sm font-medium text-muted-foreground border-b-2">
          <div className="flex-1">Enviado por:</div>
          <div className="w-[150px]">Nome:</div>
          <div className="flex-1">Título:</div>
          <div className="w-[80px] text-center">Visto:</div>
        </div>

        {/* Corpo da Tabela com espaçamento entre as linhas */}
        <div className="space-y-0">
          {emails.map((email) => (
            <Link key={email.id} href={`/inbox/${email.id}`} passHref onClick={() => setSelectedEmailId(email.id)}>
              <Card
                className={`
                  rounded-none border-0 shadow-none hover:bg-muted transition-colors
                  ${selectedEmailId === email.id ? 'bg-orange-500 text-white' : ''}
                  ${selectedEmailId === email.id ? 'hover:bg-orange-500' : 'hover:bg-gray-100'}
                `}
              >
                <CardContent className="flex items-center p-4">
                  {/* Célula 1: Remetente */}
                  <div className="flex-1 pr-4 border-r-2 border-dashed">
                    {email.idDeQuemEnviou}
                  </div>
                  {/* Célula 2: Nome */}
                  <div className="w-[150px] px-2 border-r-2 border-dashed">
                    {getFirstName(email.idDeQuemEnviou)}
                  </div>
                  {/* Célula 3: Título */}
                  <div className="flex-1 px-2 border-r-2 border-dashed">
                    {email.titulo}
                  </div>
                  {/* Célula 4: Status (Agora com texto) */}
                  <div className="w-[80px] flex justify-center items-center pl-2">
                    {email.jaVisto ? 'Sim' : 'Não'}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}