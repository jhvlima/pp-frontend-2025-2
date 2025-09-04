// Em um novo arquivo, por exemplo: components/email-view.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react"; // Ícone para o botão "voltar"
import Link from "next/link";
import { Email } from "@/types/email"; // Supondo que você tenha o tipo Email

// O componente recebe os dados de um email específico
export function EmailView({ email }: { email: Email }) {
  // Dados de exemplo para os outros participantes
  const participants = [
    { name: 'John "Soap" MacTavish', fallback: 'JM', src: '/avatars/soap.png' },
    { name: 'Simon "Ghost" Riley', fallback: 'SR', src: '/avatars/ghost.png' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          {/* Seção de Informações do Email */}
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground">
                Email de: <span className="font-medium text-[var(--color-orange)]">{email.idDeQuemEnviou}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Título: <span className="font-medium text-[var(--color-orange)]">{email.titulo}</span>
              </p>
            </div>
          </div>

          {/* Seção de Ações e Outros Participantes */}
          <div className="flex items-center gap-4">
            <Link href="/inbox" passHref>
              <Button variant="link" className="text-muted-foreground">
                voltar <ArrowLeft className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <div className="flex -space-x-2">
              <TooltipProvider>
                {participants.map((p) => (
                  <Tooltip key={p.name}>
                    <TooltipTrigger asChild>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{p.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <Separator className="my-4" />

      <CardContent>
        {/* Usar a classe 'prose' do plugin de tipografia do Tailwind é ótimo para formatar texto longo */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>{email.conteudo}</p>
          <p>
            Integer semper in nibh quis mattis. Ut vel libero posuere,
            interdum elit sed, dignissim purus. Fusce iaculis, odio quis
            gravida euismod, neque ligula suscipit ante, ut dignissim to...
          </p>
        </div>
      </CardContent>
    </Card>
  );
}