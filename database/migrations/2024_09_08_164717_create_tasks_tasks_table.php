<?php

use App\Models\TasksTask;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks_tasks', function (Blueprint $table) {
            $table->id('task_id')->primary();
            $table->foreignId('user_id')->constrained('users', 'user_id');
            $table->string('task_name');
            $table->boolean('isimportant');
            $table->boolean('isdone');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks_tasks');
    }
};
