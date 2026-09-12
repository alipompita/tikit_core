<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;


class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->info('No users found, skipping event seeding.');
            return;
        }

        foreach ($users as $user) {
            Event::factory()
                ->count(fake()->numberBetween(3, 6))
                ->for($user, 'creator')
                ->create();
        }
    }
}
