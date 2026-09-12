export type EventStatus =
    | 'draft'
    | 'published'
    | 'cancelled'
    | 'completed';

export interface Event {
    id: number;
    created_by: number;
    name: string;
    slug: string;
    description: string;
    venue: string;
    address: string;
    starts_at: string;
    ends_at: string;
    is_public: boolean;
    is_paid: boolean;
    status: EventStatus;
    created_at: string;
    updated_at: string;
}