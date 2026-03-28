import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { UserAuthForm } from "../components/UserAuthForm";


export default function LoginPage() {



  return (
    <section className="w-screen dark">
      <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-zinc-950">

        {/* Panel izquierdo */}
        <div className="relative hidden h-full lg:grid grid-rows-10 p-10 border-r border-zinc-800">
          <div className="absolute inset-0 bg-zinc-900" />

          {/* Sistema seleccionado */}
          <section className="relative z-20 row-span-2 flex items-start gap-2 flex-col">
            <Label className="text-lg text-white">Sistema</Label>


          </section>

          {/* Carrusel */}


          {/* Texto */}
          <div className="relative z-20 row-span-3 flex flex-col justify-end space-y-4">
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              Compañia
            </h2>
            <Separator className="bg-zinc-700" />
            <p className="text-sm text-zinc-400">
              Plataforma de administración centralizada.
            </p>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="lg:p-8 bg-zinc-950">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-1 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Iniciar sesión
              </h1>
              <p className="text-sm text-zinc-400">
                Bienvenido, ingresa tus credenciales
              </p>
            </div>

            <UserAuthForm />

            <p className="px-8 text-center text-xs text-zinc-500">
              Al continuar aceptas nuestros{" "}
              <a
                href="/terms"
                className="text-zinc-400 underline underline-offset-4 hover:text-white transition-colors"
              >
                Términos de uso
              </a>{" "}
              y{" "}
              <a
                href="/privacy"
                className="text-zinc-400 underline underline-offset-4 hover:text-white transition-colors"
              >
                Política de privacidad
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}