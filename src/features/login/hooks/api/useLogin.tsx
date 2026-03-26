import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { loginSchema } from '../../schemas/loginSchema';

type LoginFormValues = {
	NombreUsuario: string
	Contrasena: string
}

async function fakeLoginRequest(data: LoginFormValues) {
	await new Promise((resolve) => setTimeout(resolve, 600))
	return data
}

export function useLogin() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginFormValues>({
		defaultValues: {
			NombreUsuario: "",
			Contrasena: "",
		},
	})

	const mutation = useMutation({
		mutationFn: fakeLoginRequest,
		onSuccess: () => toast.success("Inicio de sesión exitoso"),
		onError: () => toast.error("No se pudo iniciar sesión"),
	})

	const onSubmit = (data: LoginFormValues) => {
		const parsed = loginSchema.safeParse(data)

		if (!parsed.success) {
			parsed.error.issues.forEach((issue) => {
				const field = issue.path[0]
				if (typeof field === "string") {
					setError(field as keyof LoginFormValues, { message: issue.message })
				}
			})
			return
		}

		mutation.mutate(parsed.data)
	}

	return { register, handleSubmit, errors, onSubmit, isLoading: mutation.isPending }
}