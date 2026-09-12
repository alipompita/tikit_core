import { Head } from '@inertiajs/react';

import EventForm from '@/components/events/event-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/events',
    },
    {
        title: 'Create Event',
        href: '/events/create',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Event" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create Event
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Set up the basic details for your event.
                    </p>
                </div>

                <div className="w-full max-w-3xl">
                    <EventForm />
                </div>
            </div>
        </AppLayout>
    );
}