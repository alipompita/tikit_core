import { Head, Link } from '@inertiajs/react';
import { CalendarDays, MapPin, Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Event } from '@/types/event';

interface Props {
    events: {
        data: Event[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/events',
    },
];

function formatEventDate(date: string): string {
    return new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));
}

function statusVariant(status: Event['status']) {
    switch (status) {
        case 'published':
            return 'default';

        case 'cancelled':
            return 'destructive';

        case 'completed':
            return 'secondary';

        default:
            return 'outline';
    }
}

export default function Index({ events }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Events
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Create and manage your events.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/events/create">
                            <Plus />
                            Create Event
                        </Link>
                    </Button>
                </div>

                {/* Events */}
                {events.data.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {events.data.map((event) => (
                            <Card
                                key={event.id}
                                className="transition-shadow hover:shadow-md"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <CardTitle className="truncate text-lg">
                                                {event.name}
                                            </CardTitle>

                                            <CardDescription className="mt-1">
                                                {event.is_public
                                                    ? 'Public event'
                                                    : 'Private event'}
                                            </CardDescription>
                                        </div>

                                        <Badge
                                            variant={statusVariant(event.status)}
                                        >
                                            {event.status}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    {event.description && (
                                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                                            {event.description}
                                        </p>
                                    )}

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="size-4 text-muted-foreground" />

                                            <span>
                                                {formatEventDate(
                                                    event.starts_at,
                                                )}
                                            </span>
                                        </div>

                                        {event.venue && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="size-4 text-muted-foreground" />

                                                <span className="truncate">
                                                    {event.venue}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-5 flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">
                                            {event.is_paid ? 'Paid' : 'Free'}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={`/events/${event.slug}`}
                                            >
                                                View Event
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <CalendarDays className="mb-4 size-10 text-muted-foreground" />

                            <h2 className="text-lg font-semibold">
                                No events yet
                            </h2>

                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Create your first event to start managing
                                tickets and invitations.
                            </p>

                            <Button asChild className="mt-6">
                                <Link href="/events/create">
                                    <Plus />
                                    Create Event
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}