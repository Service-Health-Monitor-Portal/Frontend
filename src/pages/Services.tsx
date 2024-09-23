import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addService } from '../services/api';

export default function Services() {
    const [serviceName, setServiceName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { name: serviceName };

        try {
            const service = await addService(data);
            toast.success('Service added successfully');
            navigate(`/dashboard/${service.id}`);
        } catch (error: any) {
            toast.error(error.name || 'An error occurred');
        }
    };

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center w-full">
            <div className="flex w-full md:w-9/12 gap-2 items-center">
                <div className="relative ml-auto flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[500px]"
                    />
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="h-7 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">
                                Add Service
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Service</DialogTitle>
                            <DialogDescription>
                                Add new Service to track it.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid items-center gap-4">
                                    <Label htmlFor="name" className="">
                                        Service Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="service"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </main>
    );
}
