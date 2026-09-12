<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use App\Enums\EventStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{

    protected $model = Event::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->sentence(fake()->numberBetween(2, 5));

        $startsAt = fake()->dateTimeBetween('now', '+2 months');
        return [
            'created_by' => User::factory(),
            'name' => $name,
            'slug' => Str::slug($name) . '-' . fake()->unique()->numberBetween(1000, 9999),
            'description' => fake()->paragraph(),
            'venue' => fake()->word(),
            'address' => fake()->address(),
            'starts_at' => $startsAt,
            'ends_at' => (clone $startsAt)->modify('+' . fake()->numberBetween(2, 8) . ' hours'),
            'is_public' => fake()->boolean(80),
            'is_paid' => fake()->boolean(40),
            'status' => fake()->randomElement([
                EventStatus::Draft,
                EventStatus::Published,
                EventStatus::Published,
                EventStatus::Published,
                EventStatus::Cancelled,
                EventStatus::Completed,
            ]),
        ];
    }
}
