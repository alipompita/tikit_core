import { useForm } from '@inertiajs/react';
import { CalendarDays, LoaderCircle } from 'lucide-react';
import { route } from 'ziggy-js';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Event } from '@/types/event';

interface EventFormData {
    [key: string]: string | boolean;
    name: string;
    description: string;
    venue: string;
    address: string;
    starts_at: string;
    ends_at: string;
    is_public: boolean;
    is_paid: boolean;
}

interface Props {
    event?: Event;
}

export default function EventForm({ event }: Props) {
    const isEditing = Boolean(event);

    const formatDateTimeLocal = (value: string): string => {
        if (!value) {
            return '';
        }

        const date = new Date(value);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const form = useForm<EventFormData>({
        name: event?.name ?? '',
        description: event?.description ?? '',
        venue: event?.venue ?? '',
        address: event?.address ?? '',
        starts_at: event ? formatDateTimeLocal(event.starts_at) : '',
        ends_at: event ? formatDateTimeLocal(event.ends_at) : '',
        is_public: event?.is_public ?? true,
        is_paid: event?.is_paid ?? false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && event) {
            form.put(route('events.update', event.slug));
            return;
        }

        form.post(route('events.store'));
    };

    return (
        <form onSubmit={submit}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {isEditing ? 'Edit Event' : 'Event Details'}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Event Name</Label>

                        <Input
                            id="name"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            placeholder="e.g. Annual Technology Conference"
                            required
                        />

                        {form.errors.name && (
                            <p className="text-sm text-destructive">
                                {form.errors.name}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>

                        <Textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            placeholder="Tell people about your event..."
                            rows={5}
                        />

                        {form.errors.description && (
                            <p className="text-sm text-destructive">
                                {form.errors.description}
                            </p>
                        )}
                    </div>

                    {/* Venue */}
                    <div className="space-y-2">
                        <Label htmlFor="venue">Venue</Label>

                        <Input
                            id="venue"
                            value={form.data.venue}
                            onChange={(e) =>
                                form.setData('venue', e.target.value)
                            }
                            placeholder="e.g. Bingu International Convention Centre"
                        />

                        {form.errors.venue && (
                            <p className="text-sm text-destructive">
                                {form.errors.venue}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>

                        <Input
                            id="address"
                            value={form.data.address}
                            onChange={(e) =>
                                form.setData('address', e.target.value)
                            }
                            placeholder="Event location address"
                        />

                        {form.errors.address && (
                            <p className="text-sm text-destructive">
                                {form.errors.address}
                            </p>
                        )}
                    </div>

                    {/* Dates */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="starts_at">Starts</Label>

                            <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    id="starts_at"
                                    type="datetime-local"
                                    value={form.data.starts_at}
                                    onChange={(e) =>
                                        form.setData(
                                            'starts_at',
                                            e.target.value,
                                        )
                                    }
                                    className="pl-10"
                                    required
                                />
                            </div>

                            {form.errors.starts_at && (
                                <p className="text-sm text-destructive">
                                    {form.errors.starts_at}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ends_at">Ends</Label>

                            <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    id="ends_at"
                                    type="datetime-local"
                                    value={form.data.ends_at}
                                    onChange={(e) =>
                                        form.setData(
                                            'ends_at',
                                            e.target.value,
                                        )
                                    }
                                    className="pl-10"
                                    required
                                />
                            </div>

                            {form.errors.ends_at && (
                                <p className="text-sm text-destructive">
                                    {form.errors.ends_at}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Visibility */}
                    <div className="space-y-3">
                        <div>
                            <Label>Visibility</Label>

                            <p className="text-sm text-muted-foreground">
                                Public events can be discovered by anyone.
                                Private events are only accessible to invited
                                people.
                            </p>
                        </div>

                        <label className="flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={form.data.is_public}
                                onChange={(e) =>
                                    form.setData(
                                        'is_public',
                                        e.target.checked,
                                    )
                                }
                                className="mt-1 size-4"
                            />

                            <div>
                                <p className="text-sm font-medium">
                                    Public event
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Allow this event to be publicly
                                    discoverable.
                                </p>
                            </div>
                        </label>

                        {form.errors.is_public && (
                            <p className="text-sm text-destructive">
                                {form.errors.is_public}
                            </p>
                        )}
                    </div>

                    {/* Payment */}
                    <div className="space-y-3">
                        <div>
                            <Label>Payment</Label>

                            <p className="text-sm text-muted-foreground">
                                Choose whether attendees need to pay for
                                tickets.
                            </p>
                        </div>

                        <label className="flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={form.data.is_paid}
                                onChange={(e) =>
                                    form.setData(
                                        'is_paid',
                                        e.target.checked,
                                    )
                                }
                                className="mt-1 size-4"
                            />

                            <div>
                                <p className="text-sm font-medium">
                                    Paid event
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Attendees will need to pay for admission.
                                </p>
                            </div>
                        </label>

                        {form.errors.is_paid && (
                            <p className="text-sm text-destructive">
                                {form.errors.is_paid}
                            </p>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        asChild
                    >
                        <a
                            href={
                                event
                                    ? route('events.show', event.slug)
                                    : route('events.index')
                            }
                        >
                            Cancel
                        </a>
                    </Button>

                    <Button type="submit" disabled={form.processing}>
                        {form.processing && (
                            <LoaderCircle className="animate-spin" />
                        )}

                        {isEditing ? 'Save Changes' : 'Create Event'}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}