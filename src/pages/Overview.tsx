import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, ArrowUpRight, CreditCard, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import useCustomQuery from "@/hooks/useCustomQuery";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function Overview() {
    const token = localStorage.getItem("token")
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

    const services: any = data?.slice(0, 10);

    const chartData = [
        { month: "January", availability: 99 },
        { month: "February", availability: 51 },
        { month: "March", availability: 70 },
        { month: "April", availability: 50 },
        { month: "May", availability: 88 },
        { month: "June", availability: 64 },
    ]
    const chartConfig = {
        availability: {
            label: "availability",
            color: "hsl(var(--chart-3))",
        },
        desk: {
            label: "Desktop",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error loading services</div>
                        ) : (
                            <div className="text-2xl font-bold">{data.length}</div>
                        )}
                    </CardContent>
                </Card>

                <Card x-chunk="dashboard-01-chunk-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card x-chunk="dashboard-01-chunk-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>

                <Card x-chunk="dashboard-01-chunk-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
                <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                        <CardTitle>Services Availability</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error loading services</div>
                        ) : (
                            <ChartContainer config={chartConfig}>
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <YAxis tickCount={6} domain={[0, 100]} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="availability" fill="var(--color-availability)" radius={8} />
                                </BarChart>
                            </ChartContainer>
                        )}
                    </CardContent>
                    {!isLoading && !error && (
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Showing total visitors for the last 6 months
                            </div>
                        </CardFooter>
                    )}
                </Card>

                <Card x-chunk="dashboard-01-chunk-4">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Services</CardTitle>
                            <CardDescription>
                                Recent Services from your Account.
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link to="/services">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error loading services</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Service</TableHead>
                                        <TableHead className="text-right">Availability</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {services?.map((service: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className="font-medium">{service.name}</div>
                                            </TableCell>
                                            <TableCell className="text-right">80</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
