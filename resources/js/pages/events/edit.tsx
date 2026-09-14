import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';

import EventForm from '@/components/events/event-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Event } from '@/types/event';

interface Props {
    event: Event;
}

export default function Edit({ event }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Events',
            href: route('events.index'),
        },
        {
            title: event.name,
            href: route('events.show', event.slug),
        },
        {
            title: 'Edit',
            href: route('events.edit', event.slug),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${event.name}`} />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Event
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Update the details for {event.name}.
                    </p>
                </div>

                <div className="w-full max-w-3xl">
                    <EventForm event={event} />
                </div>
            </div>
        </AppLayout>
    );
}