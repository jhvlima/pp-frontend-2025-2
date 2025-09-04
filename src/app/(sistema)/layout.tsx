import { Sidebar } from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-sistema">
      <div className="flex min-h-screen">
        {/* 1. Sidebar para Desktop */}
        <Sidebar />

        {/* 2. Layout do Conteúdo Principal com o Botão para Mobile */}
        <main className="flex-1 p-8">

          {/* Este div contém o botão que só aparece em telas pequenas (md:hidden) */}
          <div className="md:hidden mb-6">
            <Sheet>
              {/* O SheetTrigger é o elemento que o usuário clica */}
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>

              {/* O SheetContent é o painel que desliza */}
              <SheetContent side="left" className="w-64 p-4">
                {/* O conteúdo da sua sidebar, adaptado para o menu mobile */}
                <h2 className="text-xl font-bold mb-6">Menu</h2>
                <nav className="flex flex-col space-y-2">
                  <Link href="/inbox" className="p-2 rounded-md hover:bg-muted">Inbox</Link>
                  <Link href="/settings" className="p-2 rounded-md hover:bg-muted">Configurações</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* 3. Onde o conteúdo da página é injetado */}
          {children}

        </main>
      </div>
    </div>
  );
}