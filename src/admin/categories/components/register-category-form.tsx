import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup
} from "../../../client/components/ui/field"
import { Button } from "../../../client/components/ui/button"
import { Input } from "../../../client/components/ui/input"
import { Textarea } from "../../../client/components/ui/textarea"
import { RegisterCategoryInput } from "../dto/types"
import { registerCategorySchema } from "../dto/schemas"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../client/components/ui/card"
import slugify from "@sindresorhus/slugify"
import { useEffect, useState } from "react"
import { registerCategory } from "wasp/client/operations"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const RegisterCategoryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<RegisterCategoryInput>({
        resolver: zodResolver(registerCategorySchema),
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

    const onSubmit = async (formValues: RegisterCategoryInput) => {

        try {
            setIsSubmitting(true);
            const category = await registerCategory(formValues);
            toast(`${category.name} registered!`)
        } catch (error: any) {
            const errorMessage = error.message ? error.message : "Ups! Something bad happened."
            console.error("Error creating category:", error);
            toast.error(errorMessage);
        } finally {
            form.reset();
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Register Category</CardTitle>
                <CardDescription>
                    Create a new category to organize directory listings.
                </CardDescription>
            </CardHeader>
            <CardContent>

                <form id="register-category-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                                        placeholder="Free"
                                        autoComplete="off"
                                    />
                                    <FieldDescription>Category name visible to users (2-50 characters)</FieldDescription>
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
                                        placeholder="free-stuff"
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
                                        placeholder="Add if your product is free, offer free tier or is freemium."
                                        autoComplete="off"
                                    />
                                    <FieldDescription>Help users understand this category (optional, max 160 characters)</FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>

                </form>
            </CardContent>
            <CardFooter>
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
                        form="register-category-form"
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

export default RegisterCategoryForm;