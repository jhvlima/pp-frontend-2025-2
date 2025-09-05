'use client'
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { Email } from "@/types/email";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
// Um array com três exemplos de emails
export const emailsExemplo: Email[] = [
  {
    // --- Email 1: Profissional, não lido ---
    id: 'uuid-002-def',
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
 const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  // 1. A LÓGICA DE BUSCA DE E-MAILS AGORA ESTÁ DENTRO DO USEEFFECT
  useEffect(() => {
    // Função que busca os dados da API (ou dos seus dados mockados)
    async function fetchEmails() {
      try {
        console.log("Buscando novos e-mails..."); // Log para ver a função em ação
        
        // No futuro, você usará a API de verdade aqui
        // const response = await api.get("/emails"); 
        // setEmails(response.data);

        // Por enquanto, usamos os dados mockados
        const response = emailsExemplo;
        // Ordena os e-mails pelos mais recentes primeiro
        const sortedEmails = response.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setEmails(sortedEmails);

      } catch (err) {
        toast.error("Erro ao buscar e-mails.");
      }
    }

    // 2. BUSCA INICIAL: Chamamos a função uma vez assim que a página carrega.
    fetchEmails();

    // 3. POLLING: Configuramos um intervalo para buscar e-mails a cada 15 segundos.
    const intervalId = setInterval(fetchEmails, 30000); // 15000 ms = 15 segundos

    // 4. FUNÇÃO DE LIMPEZA: Isso é executado quando o componente é "desmontado" (quando o usuário sai da página).
    return () => {
      console.log("Limpando o intervalo de busca.");
      clearInterval(intervalId); // Paramos o polling para não gastar recursos.
    };
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez (na montagem do componente)


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