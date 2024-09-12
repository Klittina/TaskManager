<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StepsTask;

class StepController extends Controller
{
    public function index()
    {
        $step = StepsTask::all();
        return $step;
    }

    public function show($step_id)
    {
        $step = StepsTask::find($step_id);
        return $step;
    }

    public function destroy($id)
    {
        $step = StepsTask::find($id);
    
        if ($step) {
            $step->delete();
            return response()->json(['message' => 'Step deleted successfully.'], 200);
        } else {
            return response()->json(['message' => 'Step not found.'], 404);
        }
    }
    public function store(Request $request)
    {
        $step = new StepsTask();
        $step->text = $request->text;
        $step->task_id = $request->task_id;
        $step->save();
    
        return response()->json([
            'message' => 'Step successfully added!',
            'step' => $step
        ], 201);
    }
    


    public function update(Request $request, $id)
    {
        $step = StepsTask::find($id);

        if ($step) {
            $step->text = $request->input('text');
            $step->save();
            return response()->json(['message' => 'Step updated successfully.'], 200);
        } else {
            return response()->json(['message' => 'Step not found.'], 404);
        }
    }

    public function mainsteps($taskId)
    {
        $steps = StepsTask::where('task_id', $taskId)->get();
        return response()->json($steps);
    }
}
