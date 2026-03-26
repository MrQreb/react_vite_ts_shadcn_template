import { z } from "zod";

export const loginSchema = z.object({
  NombreUsuario: z.string()
    .nonempty("El nombre de usuario es requerido"),
  Contrasena: z.string()
    .min(3, "La contraseña es requerida")
});

export type loginSchema = z.infer<typeof loginSchema>;