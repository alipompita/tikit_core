import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    MapPin,
    Pencil,
    Ticket,
    Trash2,
    Users,
} from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Event } from '@/types/event';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface Props {
    event: Event;
}

export default function Show({ event }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Events',
            href: route('events.index'),
        },
        {
            title: event.name,
            href: route('events.show', event.slug),
        },
    ];

    const startDate = new Date(event.starts_at);
    const endDate = new Date(event.ends_at);

    const formatDate = (date: Date) =>
        date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const formatTime = (date: Date) =>
        date.toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
        });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.name} />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="mt-1"
                        >
                            <Link href={route('events.index')}>
                                <ArrowLeft />
                                <span className="sr-only">
                                    Back to Events
                                </span>
                            </Link>
                        </Button>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                <Badge
                                    variant={
                                        event.status === 'published'
                                            ? 'default'
                                            : event.status === 'cancelled'
                                                ? 'destructive'
                                                : 'secondary'
                                    }
                                >
                                    {event.status}
                                </Badge>

                                <Badge variant="outline">
                                    {event.is_public ? 'Public' : 'Private'}
                                </Badge>

                                <Badge variant="outline">
                                    {event.is_paid ? 'Paid' : 'Free'}
                                </Badge>
                            </div>

                            <h1 className="text-2xl font-semibold tracking-tight">
                                {event.name}
                            </h1>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Event details and management
                            </p>
                        </div>
                    </div>

                    <Button asChild>
                        <Link href={route('events.edit', event.slug)}>
                            <Pencil />
                            Edit Event
                        </Link>
                    </Button>
                </div>

                {/* Event details */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                            <CardDescription>
                                Basic information about this event.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {event.description && (
                                <div>
                                    <h3 className="mb-2 text-sm font-medium">
                                        Description
                                    </h3>

                                    <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                        {event.description}
                                    </p>
                                </div>
                            )}

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex gap-3">
                                    <CalendarDays className="mt-0.5 size-5 text-muted-foreground" />

                                    <div>
                                        <p className="text-sm font-medium">
                                            Start
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(startDate)}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatTime(startDate)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Clock className="mt-0.5 size-5 text-muted-foreground" />

                                    <div>
                                        <p className="text-sm font-medium">
                                            End
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(endDate)}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatTime(endDate)}
                                        </p>
                                    </div>
                                </div>

                                {(event.venue || event.address) && (
                                    <div className="flex gap-3 sm:col-span-2">
                                        <MapPin className="mt-0.5 size-5 text-muted-foreground" />

                                        <div>
                                            <p className="text-sm font-medium">
                                                Location
                                            </p>

                                            {event.venue && (
                                                <p className="text-sm text-muted-foreground">
                                                    {event.venue}
                                                </p>
                                            )}

                                            {event.address && (
                                                <p className="text-sm text-muted-foreground">
                                                    {event.address}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Event management */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Event</CardTitle>
                            <CardDescription>
                                Event management options.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                asChild
                            >
                                <Link
                                    href={route(
                                        'events.edit',
                                        event.slug,
                                    )}
                                >
                                    <Pencil />
                                    Edit Event
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                disabled
                            >
                                <Users />
                                Manage Members
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                disabled
                            >
                                <Ticket />
                                Manage Tickets
                            </Button>

                            <Button
                                variant="destructive"
                                className="w-full justify-start"
                                asChild
                            >
                                <Link
                                    href={route(
                                        'events.destroy',
                                        event.slug,
                                    )}
                                    method="delete"
                                    as="button"
                                >
                                    <Trash2 />
                                    Delete Event
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}