import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addService } from '../services/api';
import ServiceCard from "@/components/ServiceCard";
import useCustomQuery from "@/hooks/useCustomQuery";  // Import useCustomQuery

export default function Services() {
    const [serviceName, setServiceName] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const { data, isLoading, error } = useCustomQuery({
        queryKey: ['services'],
        url: `services`,
        pollInterval: 6000,
        config: {
            headers: {
                'ngrok-skip-browser-warning': '1',
                'Authorization': `Bearer ${token}`
            },
        },
    });

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
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:py-8 md:px-20 lg:px-36">
            <div className="w-full flex items-center">
                <div className="flex w-full gap-2 items-center">
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
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {isLoading && <div>Loading services...</div>}
                {error && <div>Error loading services</div>}

                {data?.map((service: any) => (
                    <ServiceCard
                        key={service.id}
                        title={service.name}
                        description={`Service for ${service.name}`}
                        badges={["AWS", "Cloud", "Backend"]}
                    />
                ))}
            </div>
        </main>
    );
}
