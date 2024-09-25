import { Ellipsis } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { deleteService } from "@/services/api";

interface IProps {
    id: number;
    title: string;
    description?: string;
    badges?: string[];
}

export default function ServiceCard({ id, title, description, badges }: IProps) {

    const handleDelete = async () => {
        try{
            await deleteService(id);
        }
        catch(error){
            console.log(error)
        }
    }

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
                        <DropdownMenuItem onClick={handleDelete}>Delete Service</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {badges?.map((badge, index) => (
                    <Badge variant="secondary" key={index}>{badge}</Badge>
                ))}
            </CardContent>
        </Card>
    );
}
