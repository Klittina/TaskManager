<?php

namespace Database\Seeders;

use App\Models\TasksTask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TasksTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TasksTask::create(['user_id' => 1, 'task_name' => 'Fontos dolog', 'isimportant' => true, 'isdone' => false]);
        TasksTask::create(['user_id' => 1, 'task_name' => 'Annyira nem fontos dolog', 'isimportant' => false, 'isdone' => false]);
    }
}
