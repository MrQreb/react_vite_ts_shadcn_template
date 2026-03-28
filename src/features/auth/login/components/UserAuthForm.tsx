import { Eye, EyeOff } from "lucide-react";
import { useState, type HTMLAttributes } from "react";
import { useLogin } from "../hooks/api/useLogin";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Formulario de login con los inputs
 */
export function UserAuthForm({ className, ...props }: HTMLAttributes<HTMLDivElement>) {

  const { form, isLoading } = useLogin();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <section className={cn("w-full", className)} {...props}>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
        className="space-y-8"
      >
        <div className="space-y-6">
          <form.Field
            name="NombreUsuario"
            children={(field) => (
              <div>
                <Label htmlFor="NombreUsuario" className="text-base font-medium text-gray-700 dark:text-gray-200">
                  Usuario
                </Label>
                <Input
                  id="NombreUsuario"
                  placeholder="Usuario"
                  autoCapitalize="none"
                  autoComplete="username"
                  disabled={isLoading}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  className="mt-2 text-white"
                />
                {field.state.meta.errors[0] && (
                  <p className="mt-2 text-sm text-destructive">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          />

          <form.Field
            name="Contrasena"
            children={(field) => (
              <div>
                <Label htmlFor="Contrasena" className="text-base font-medium text-gray-700 dark:text-gray-200">
                  Contraseña
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="Contrasena"
                    placeholder="••••••••••"
                    type={isVisible ? "text" : "password"}
                    autoComplete="current-password"
                    disabled={isLoading}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    className="pr-10 text-white"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-blue-700"
                    tabIndex={-1}
                    aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {field.state.meta.errors[0] && (
                  <p className="mt-2 text-sm text-destructive">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Validando..." : "Iniciar sesión"}
        </Button>

        {/* <div className="mt-4 text-center">
          <Link href="/recuperar-cuenta" className="text-sm text-blue-700 hover:underline dark:text-blue-400">
            ¿Olvidaste tu contraseña?
          </Link>
        </div> */}

      </form>
    </section>


  );
}