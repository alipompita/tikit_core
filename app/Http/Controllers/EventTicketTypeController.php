<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventTicketTypeRequest;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class EventTicketTypeController extends Controller
{
    public function index(Event $event): Response
    {
        return Inertia::render('Events/TicketTypes/Index', [
            'event' => $event,
            'ticketTypes' => $event->ticketTypes()->get(),
        ]);
    }

    public function create(Event $event): Response
    {
        return Inertia::render('Events/TicketTypes/Create', [
            'event' => $event,
        ]);
    }

    public function store(
        StoreEventTicketTypeRequest $request,
        Event $event
    ): RedirectResponse {
        $validated = $request->validated();

        DB::transaction(function () use ($event, $validated) {
            foreach ($validated['formats'] as $format => $capacity) {
                $event->ticketTypes()->create([
                    'name' => $validated['name'],
                    'price' => $validated['price'],
                    'capacity' => $capacity,
                    'admits' => $validated['admits'],
                    'format' => $format,
                    'is_active' => $validated['is_active'] ?? true,
                    'sales_start_at' => $validated['sales_start_at'] ?? null,
                    'sales_end_at' => $validated['sales_end_at'] ?? null,
                ]);
            }
        });

        return redirect()
            ->route('events.ticket-types.index', $event)
            ->with('success', 'Ticket type created successfully.');
    }
}
