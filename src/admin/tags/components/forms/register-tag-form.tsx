import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup
} from "../../../../client/components/ui/field"
import { Button } from "../../../../client/components/ui/button"
import { Input } from "../../../../client/components/ui/input"
import { Textarea } from "../../../../client/components/ui/textarea"
import { RegisterTagInput } from "../../dto/types"
import { registerTagSchema } from "../../dto/schemas"
import { Card, CardContent, CardFooter } from "../../../../client/components/ui/card"
import slugify from "@sindresorhus/slugify"
import { useEffect, useState } from "react"
import { registerTag } from "wasp/client/operations"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const RegisterTagForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<RegisterTagInput>({
        resolver: zodResolver(registerTagSchema),
        defaultValues: {
            name: "",
            description: "",
            slug: ""
        },
    });

    const watchedName = useWatch({
        control: form.control,
        name: "name"
    });

    useEffect(() => {
        if (watchedName) {
            const generatedSlug = slugify(watchedName);
            form.setValue("slug", generatedSlug);
        }
    }, [watchedName, form]);

    const onSubmit = async (formValues: RegisterTagInput) => {

        try {
            setIsSubmitting(true);
            const tag = await registerTag(formValues);
            toast(`${tag.name} tag registered!`)
        } catch (error: any) {
            const errorMessage = error.message ? error.message : "Ups! Something bad happened."
            console.error("Error creating tag:", error);
            toast.error(errorMessage);
        } finally {
            form.reset();
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full border-none">
            <CardContent className="px-0">

                <form id="register-tag-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="JavaScript"
                                        autoComplete="off"
                                    />
                                    <FieldDescription>Tag name for filtering and organizing listings (2-50 characters)</FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="slug"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Slug
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="javascript"
                                        autoComplete="off"
                                        readOnly
                                        disabled
                                    />
                                    <FieldDescription>Auto-generated URL/SEO friendly identifier.</FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Description
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="High-level programming language for web development and applications."
                                        autoComplete="off"
                                    />
                                    <FieldDescription>Help users understand when to use it (optional, max 160 characters).</FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>

                </form>
            </CardContent>
            <CardFooter className="px-0 pb-0">
                <Field orientation="horizontal" className="justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            form.reset();
                        }}
                        disabled={isSubmitting}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        form="register-tag-form"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader2 className="animate-spin" />}
                        {isSubmitting ? "Registering" : "Register"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}

export default RegisterTagForm;