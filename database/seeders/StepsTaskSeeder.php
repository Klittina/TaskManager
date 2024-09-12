<?php

namespace Database\Seeders;

use App\Models\StepsTask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StepsTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StepsTask::create(['task_id' => 1, 'text' => 'Ezt mostmár am nagyon meg kellene csinálni:((']);
        StepsTask::create(['task_id' => 1, 'text' => 'Ezzel még ráérek']);
        StepsTask::create(['task_id' => 2, 'text' => 'Majd eccer']);
        
    }
}
