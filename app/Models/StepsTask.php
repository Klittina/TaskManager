<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StepsTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
    ];

    public function task()
    {
        return $this->belongsTo(TasksTask::class, 'task_id');
    }


    protected $primaryKey = 'task_id';
}
