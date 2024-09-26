import { Ellipsis, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { deleteService } from "@/services/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import toast from "react-hot-toast";

interface IProps {
    id: number;
    title: string;
    description?: string;
    badges?: string[];
    setVersion: React.Dispatch<React.SetStateAction<number>> 
}

export default function ServiceCard({ id, title, description, badges, setVersion }: IProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await deleteService(id);
            setIsDialogOpen(false);
            setVersion((prev) => prev + 1);
            toast("Service Deleted")
        } catch (error) {
            toast("Error deleting service")
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="relative w-full">
            <CardHeader className="relative">
                <div className="space-y-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="absolute top-3 right-5">
                        <Ellipsis className="h-5 w-5 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute right-0 z-10">
                        <DropdownMenuItem>Update Service</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Delete Service</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {badges?.map((badge, index) => (
                    <Badge variant="secondary" key={index}>{badge}</Badge>
                ))}
            </CardContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. You will not be able to see this service again.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}