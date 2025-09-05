import { EmailView } from "@/components/email-view"; // 1. Componente de visualização importado
import { Email } from "@/types/email";
import Link from "next/link";
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
// Função que busca os dados (a sua já está correta)
async function getEmailById(id: string): Promise<Email | undefined> {
  const email = emailsExemplo.find(e => e.id === id);
  return email;
}

// A página que recebe os parâmetros da URL
export default async function Page({ params }: { params: { emailId: string } }) {
  const { emailId } = params;
  //const email = await getEmailById(emailId);
  const email = emailsExemplo[0]; // Apenas para teste

  if (!email) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">E-mail não encontrado</h1>
        <Link href="/inbox" className="text-blue-500 hover:underline mt-4">
          Voltar para a Caixa de Entrada
        </Link>
      </div>
    );
  }

  // 3. A página agora simplesmente passa os dados para o componente de visualização
  return <EmailView email={email} />;
}