import { Ellipsis } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface IProps {
    title: string;
    description?: string;
    badges?: string[]
}

export default function ServiceCard({ title, description, badges }: IProps) {
    return (
        <Card className="w-full">
            <CardHeader className="relative">
                <div className="space-y-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                
                <Ellipsis className="absolute top-3 right-5 h-5 w-5 cursor-pointer" />
            </CardHeader>
            
            <CardContent className="flex flex-wrap gap-2">
                {badges?.map((badge, index) => (
                    <Badge key={index}>{badge}</Badge>
                ))}
            </CardContent>
        </Card>
    );
}
