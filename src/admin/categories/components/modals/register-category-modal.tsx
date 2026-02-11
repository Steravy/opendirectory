import { Button } from "../../../../client/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../client/components/ui/dialog"
import { Separator } from "../../../../client/components/ui/separator";
import RegisterCategoryForm from "../forms/register-category-form";
import { Plus } from "@phosphor-icons/react";

const RegisterCategoryModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="default">
                    <Plus />
                    <span className="hidden sm:inline">
                        Add Category
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Register Category</DialogTitle>
                    <DialogDescription>
                        Create a new category to organize directory listings.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4">
                    <RegisterCategoryForm />
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default RegisterCategoryModal;
