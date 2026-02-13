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
import RegisterTagForm from "../forms/register-tag-form";
import { Plus } from "@phosphor-icons/react";

const RegisterTagModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="default">
                    <Plus />
                    <span className="hidden sm:inline">
                        Add Tag
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Register Tag</DialogTitle>
                    <DialogDescription>
                        Create a new tag to help organize and filter directory listings.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4">
                    <RegisterTagForm />
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default RegisterTagModal;