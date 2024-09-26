import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiSelector from "@/components/ui/multiselector";
import useCustomQuery from "@/hooks/useCustomQuery";
import { IBadges, IService } from "@/interfaces";
import { AxiosError } from "axios";
import { Loader2, PlusCircle, Search } from "lucide-react";
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { addService } from '../services/api';

export default function Services() {
    const token = localStorage.getItem("token");

    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [selectedBadges, setSelectedBadges] = useState<IBadges[]>([]);
    const [addServiceLoading, setAddServiceLoading] = useState(0)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [searchInput, setSearchInput] = useState<string>("")

    const [version, setVersion] = useState(0);

    const { data: servicesData, isLoading, error } = useCustomQuery({
        queryKey: ['services', String(version)],
        url: `services`,
        config: {
            headers: {
                'ngrok-skip-browser-warning': '1',
                'Authorization': `Bearer ${token}`
            },
        },
    });

    const { data: badgesData, isLoading: isLoadingBadges, error: badgesError } = useCustomQuery({
        queryKey: ['badges'],
        url: `badges`,
        config: {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        },
    });

    const handleAddService = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            name: serviceName,
            description: serviceDescription,
            badgeIds: selectedBadges.map((badge) => badge.id)
        };
        setAddServiceLoading(1)
        try {
            await addService(data);
            toast.success('Service added successfully');
            setIsAddDialogOpen(false);
            setVersion((prev) => prev + 1);
        } catch (err: unknown) {
            console.log(err)
            if (err instanceof AxiosError) {
                toast(err?.response?.data);
            } else {
                toast('An error occurred while adding the service');
            }
        }
        finally {
            setAddServiceLoading(0);
        }
    };

    const filteredServices = servicesData?.filter((service: IService) =>
        service.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        service?.description?.toLowerCase().includes(searchInput.toLowerCase())
    );

    console.log(filteredServices)

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
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                            <form onSubmit={handleAddService}>
                                <div className="grid gap-4 py-4">
                                    <div className="flex flex-col gap-4">
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
                                        <Label htmlFor="description" className="">
                                            Service Description
                                        </Label>
                                        <Input
                                            id="description"
                                            placeholder="description"
                                            value={serviceDescription}
                                            onChange={(e) => setServiceDescription(e.target.value)}
                                            className="col-span-3"
                                        />
                                        <Label htmlFor="badges" className="">
                                            Service Badges
                                        </Label>

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
                                    <Button type="submit">
                                        {addServiceLoading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            "Update"
                                        )}</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {isLoading && <div>Loading services...</div>}
                {error && <div>Error loading services</div>}

                {filteredServices?.map((service: IService) => (
                    <ServiceCard
                        key={service.id}
                        id={service.id}
                        title={service.name}
                        description={service.description}
                        badges={service.badges}
                        setVersion={setVersion}
                    />
                ))}
            </div>
        </main>
    );
}
