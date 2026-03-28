import { useMutation } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { loginSchema } from "../../schemas/loginSchema"

type LoginFormValues = {
	NombreUsuario: string
	Contrasena: string
}

async function apiService(data: LoginFormValues) {
	return data
}

export function useLogin() {
	const mutation = useMutation({
		mutationFn: apiService,
		onSuccess: () => toast.success("Inicio de sesión exitoso"),
		onError: () => toast.error("No se pudo iniciar sesión"),
	})

	const form = useForm({
		defaultValues: {
			NombreUsuario: "",
			Contrasena: "",
		} satisfies LoginFormValues,
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync(value)
		},
		validators: {
			onSubmit: ({ value }) => {
				const parsed = loginSchema.safeParse(value)
				if (!parsed.success) {
					const fieldErrors = parsed.error.flatten().fieldErrors
					return {
						fields: fieldErrors,
					}
				}
			},
		},
	})

	return { form, isLoading: mutation.isPending || form.state.isSubmitting }
}