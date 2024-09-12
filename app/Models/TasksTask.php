<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TasksTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_name',
        'isdone',
        'isimportant',
    ];

    public function steps()
{
    return $this->hasMany(StepsTask::class, 'task_id'); // Ensure 'task_id' matches your actual column
}

    protected $primaryKey = 'task_id';
}
