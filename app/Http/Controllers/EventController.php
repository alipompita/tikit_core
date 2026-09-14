<?php

namespace App\Http\Controllers;

use App\Enums\EventStatus;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $events = $request->user()
            ->events()
            ->latest()
            ->paginate(10);

        return Inertia::render('events/index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('events/create');
    }

    public function store(StoreEventRequest $request): RedirectResponse
    {
        $event = Event::create([
            ...$request->validated(),
            'created_by' => $request->user()->id,
            'slug' => $this->generateUniqueSlug($request->validated('name')),
            'status' => EventStatus::Draft,
        ]);

        return redirect()
            ->route('events.show', $event)
            ->with('success', 'Event created successfully.');
    }

    public function show(Event $event): Response
    {
        Gate::authorize('view', $event);

        return Inertia::render('events/show', [
            'event' => $event,
        ]);
    }

    public function edit(Event $event): Response
    {
        Gate::authorize('update', $event);

        return Inertia::render('events/edit', [
            'event' => $event,
        ]);
    }

    public function update(
        UpdateEventRequest $request,
        Event $event
    ): RedirectResponse {
        $event->update($request->validated());

        return redirect()
            ->route('events.show', $event)
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        Gate::authorize('delete', $event);

        $event->delete();

        return redirect()
            ->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }

    private function generateUniqueSlug(string $name): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (Event::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
