<?php

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
        Schema::create('steps_tasks', function (Blueprint $table) {
            $table->id('step_id')->primary();
            $table->foreignId('task_id')->constrained('tasks_tasks', 'task_id');
            $table->string('text');
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('steps_tasks');
    }
};
