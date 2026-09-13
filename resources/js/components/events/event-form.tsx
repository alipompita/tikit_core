import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js'
import { CalendarDays, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

interface EventFormProps {
    submitLabel?: string;
}

export default function EventForm({
    submitLabel = 'Create Event',
}: EventFormProps) {
    const form = useForm<EventFormData>({
        name: '',
        description: '',
        venue: '',
        address: '',
        starts_at: '',
        ends_at: '',
        is_public: true,
        is_paid: false,
    });

    function submit(event: FormEvent) {
        event.preventDefault();

        form.post(route('events.store'));
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Event name</Label>

                        <Input
                            id="name"
                            value={form.data.name}
                            onChange={(event) =>
                                form.setData('name', event.target.value)
                            }
                            placeholder="e.g. Malawi Technology Conference"
                            autoFocus
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
                            onChange={(event) =>
                                form.setData(
                                    'description',
                                    event.target.value,
                                )
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
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="venue">Venue</Label>

                            <Input
                                id="venue"
                                value={form.data.venue}
                                onChange={(event) =>
                                    form.setData('venue', event.target.value)
                                }
                                placeholder="e.g. BICC"
                            />

                            {form.errors.venue && (
                                <p className="text-sm text-destructive">
                                    {form.errors.venue}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>

                            <Input
                                id="address"
                                value={form.data.address}
                                onChange={(event) =>
                                    form.setData('address', event.target.value)
                                }
                                placeholder="Event address"
                            />

                            {form.errors.address && (
                                <p className="text-sm text-destructive">
                                    {form.errors.address}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <CalendarDays className="size-4 text-muted-foreground" />

                            <h3 className="text-sm font-medium">
                                Event schedule
                            </h3>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="starts_at">
                                    Starts at
                                </Label>

                                <Input
                                    id="starts_at"
                                    type="datetime-local"
                                    value={form.data.starts_at}
                                    onChange={(event) =>
                                        form.setData(
                                            'starts_at',
                                            event.target.value,
                                        )
                                    }
                                />

                                {form.errors.starts_at && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.starts_at}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ends_at">Ends at</Label>

                                <Input
                                    id="ends_at"
                                    type="datetime-local"
                                    value={form.data.ends_at}
                                    onChange={(event) =>
                                        form.setData(
                                            'ends_at',
                                            event.target.value,
                                        )
                                    }
                                />

                                {form.errors.ends_at && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.ends_at}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Visibility */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium">Visibility</h3>

                            <p className="text-sm text-muted-foreground">
                                Choose who can access this event.
                            </p>
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4">
                            <input
                                type="checkbox"
                                checked={form.data.is_public}
                                onChange={(event) =>
                                    form.setData(
                                        'is_public',
                                        event.target.checked,
                                    )
                                }
                                className="mt-1"
                            />

                            <div>
                                <div className="font-medium">Public event</div>

                                <p className="text-sm text-muted-foreground">
                                    Anyone can discover this event.
                                </p>
                            </div>
                        </label>

                        {form.errors.is_public && (
                            <p className="text-sm text-destructive">
                                {form.errors.is_public}
                            </p>
                        )}
                    </div>

                    {/* Ticketing */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium">Ticketing</h3>

                            <p className="text-sm text-muted-foreground">
                                Specify whether attendees need to pay to
                                attend.
                            </p>
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4">
                            <input
                                type="checkbox"
                                checked={form.data.is_paid}
                                onChange={(event) =>
                                    form.setData(
                                        'is_paid',
                                        event.target.checked,
                                    )
                                }
                                className="mt-1"
                            />

                            <div>
                                <div className="font-medium">Paid event</div>

                                <p className="text-sm text-muted-foreground">
                                    Attendees will need to purchase a ticket.
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
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    disabled={form.processing}
                >
                    Cancel
                </Button>

                <Button type="submit" disabled={form.processing}>
                    {form.processing && (
                        <LoaderCircle className="animate-spin" />
                    )}

                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}