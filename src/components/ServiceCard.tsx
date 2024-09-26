import { Ellipsis, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { deleteService, updateService } from "@/services/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import MultiSelector from "./ui/multiselector";
import useCustomQuery from "@/hooks/useCustomQuery";
import { IBadges } from "@/interfaces";

interface IProps {
    id: number;
    title: string;
    description?: string;
    badges?: IBadges[];
    setVersion: React.Dispatch<React.SetStateAction<number>>
}

export default function ServiceCard({ id, title, description, badges, setVersion }: IProps) {
    const token = localStorage.getItem("token");

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [serviceName, setServiceName] = useState(title);
    const [serviceDescription, setServiceDescription] = useState(description || "");
    const [selectedBadges, setSelectedBadges] = useState<IBadges[]>(badges || []);

    const { data: badgesData, isLoading: isLoadingBadges, error: badgesError } = useCustomQuery({
        queryKey: ['badges'],
        url: `badges`,
        config: {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        },
    });

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await deleteService(id);
            setIsDialogOpen(false);
            setVersion((prev) => prev + 1);
            toast("Service Deleted");
        } catch (error) {
            toast("Error deleting service");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateService = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            name: serviceName,
            description: serviceDescription,
            badgeIds: selectedBadges.map((badge) => badge.id)
        };
        try {
            await updateService(id, data);
            setIsUpdateDialogOpen(false);
            setVersion((prev) => prev + 1);
            toast("Service Updated");
        } catch (error) {
            toast("Error updating service");
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
                        <DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>Update Service</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Delete Service</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {badges?.map((badge, index) => (
                    <Badge variant="secondary" key={index}>{badge.name}</Badge>
                ))}
            </CardContent>

            {/* Delete Confirmation Dialog */}
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

            {/* Update Service Dialog */}
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Service</DialogTitle>
                        <DialogDescription>
                            Update the details of your service.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateService}>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="name">Service Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Service name"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                    className="col-span-3"
                                />
                                <Label htmlFor="description">Service Description</Label>
                                <Input
                                    id="description"
                                    placeholder="Service description"
                                    value={serviceDescription}
                                    onChange={(e) => setServiceDescription(e.target.value)}
                                    className="col-span-3"
                                />
                                <Label htmlFor="badges">Service Badges</Label>
                                {/* Badge Selector */}
                                {isLoadingBadges ? (
                                    <div>Loading badges...</div>
                                ) : badgesError ? (
                                    <div>Error loading badges</div>
                                ) : (
                                    <MultiSelector options={badgesData} setSelectedBadges={setSelectedBadges} selectedBadges={selectedBadges} />
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Update"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
