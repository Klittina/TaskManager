<?php

namespace App\Http\Controllers;

use App\Models\StepsTask;
use App\Models\TasksTask;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $task = TasksTask::all();
        return $task;
    }

    public function show($task_id)
    {
        $task = TasksTask::find($task_id);
        return $task;
    }

    public function destroy($id)
{
    try {
        $task = TasksTask::find($id);

        if ($task) {
            $steps = $task->steps;
            foreach ($steps as $step) {
                $step->delete();
            }
            $task->delete();
            return response()->json([
                'message' => 'Task and associated steps successfully deleted!',
                'task_id' => $id,
            ], 200);
            
        } else {
            return response()->json([
                'message' => 'Task not found!',
            ], 404);
        }
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'An error occurred',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    

public function store(Request $request)
{
    if (Auth::check()) {
        $task = new TasksTask();
        $task->user_id = Auth::id(); 
        $task->task_name = $request->task_name;
        $task->isdone = false;
        $task->isimportant = false;
        $task->save();

        return response()->json($task, 201);
    }

    return response()->json(['message' => 'Unauthorized'], 401);
}

public function update(Request $request, $task_id)
{
    $request->validate([
        'task_name' => 'required|string|max:255',
    ]);
    $task = TasksTask::find($task_id);

    if ($task) {
        $task->task_name = $request->input('task_name');
        $task->save();

        return response()->json(['message' => 'Task updated successfully.'], 200);
    } else {
        return response()->json(['message' => 'Task not found.'], 404);
    }
}



    public function maintasks()
    {
        $userId = Auth::id();
        $tasks = TasksTask::where('user_id', $userId)->get();
        return response()->json($tasks);
    }
}
