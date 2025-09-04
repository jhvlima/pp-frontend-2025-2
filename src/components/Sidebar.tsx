"use client"
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { PaperPlaneTilt, EnvelopeSimple, User, ArrowElbowDownLeft } from 'phosphor-react'; {/*MailBox*/}

export function Sidebar() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('jwt');
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50">
        <div className="flex justify-center items-center py-3">
          <img src="logo5.svg" alt="Logo" className="h-8" />
        </div>
      </div>

      {/* Desktop Sidebar */}

      <div className="hidden md:flex flex-col bg-white text-black p-4 w-60 rounded-2xl">
        <div className="flex justify-center mb-8">
          <img src="logo5.svg" alt="Logo" className="h-12" />
        </div>

        <ul className="space-y-4 flex-1">
          <li>
            <Link href="/inbox" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <EnvelopeSimple size={24} />
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link href="/Enviados" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <PaperPlaneTilt size={24} />
              <span>Enviados</span>
            </Link>
          </li>
          <li>
            <Link href="/Enviar e-mail" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <EnvelopeSimple size={24} />
              <span>Enviar e-mail</span>
            </Link>
          </li>
          <li>
            <Link href="/Editar perfil" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <User size={24} />
              <span>Editar perfil</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left hover:bg-gray-100"
            >
              <ArrowElbowDownLeft size={24} />
              <span>Sair</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 z-50">
        <div className="flex justify-around items-center py-2">
          <Link href="/inbox" className="flex flex-col items-center gap-1 p-2">
            <User size={20} />
            <span className="text-xs">Inbox</span>
          </Link>
          <Link href="/Enviados" className="flex flex-col items-center gap-1 p-2">
            <PaperPlaneTilt size={20} />
            <span className="text-xs">Enviados</span>
          </Link>
          <Link href="/Enviar e-mail" className="flex flex-col items-center gap-1 p-2">
            <PaperPlaneTilt size={20} />
            <span className="text-xs">Enviar e-mail</span>
          </Link>
          <Link href="/Editar perfil" className="flex flex-col items-center gap-1 p-2">
            <User size={20} />
            <span className="text-xs">Editar perfil</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 p-2"
          >
            <ArrowElbowDownLeft size={20} />
            <span className="text-xs">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}
