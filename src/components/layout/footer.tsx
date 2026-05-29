import { Building2, Mail, Phone } from "lucide-react";
import { company } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-lima-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="font-bold">Contato</p>
          <ul className="mt-5 space-y-4 text-sm text-slate-300">
            <li className="flex items-center justify-center gap-3">
              <Building2 aria-hidden size={18} className="text-lima-green" />
              <span>{company.corporateName} | CNPJ {company.cnpj}</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <Phone aria-hidden size={18} className="text-lima-green" />
              <span>{company.phone} | WhatsApp {company.whatsapp}</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <Mail aria-hidden size={18} className="text-lima-green" />
              <span>{company.email}</span>
            </li>
          </ul>
          <p className="mx-auto mt-6 max-w-2xl text-xs leading-5 text-slate-400">
            {company.mainActivity}. Operação sujeita às normas dos órgãos
            regulamentadores competentes para transporte de passageiros.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Viação Lima.
        Todos os direitos reservados.
      </div>
    </footer>
  );
}
