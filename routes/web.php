<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

// routes/api.php
Route::middleware(['auth:api'])->group(function () {
    Route::post('/taskstore', [TaskController::class, 'store']);
});

Route::get('/api/steps', [StepController::class,'index']);
Route::get('/api/steps/{id}',[StepController::class,'show']);
Route::post('/api/stepsstore',[StepController::class,'store']);
Route::put('/steps/{id}', [StepController::class, 'update']);
Route::delete('/api/steps/{id}', [StepController::class, 'destroy']);
Route::get('/mainsteps/{taskId}', [StepController::class, 'mainsteps']);

Route::get('/api/tasks', [TaskController::class,'index']);
Route::get('/api/tasks/{id}',[TaskController::class,'show']);
Route::post('/api/taskstore',[TaskController::class,'store']);
Route::put('/tasks/{id}', [TaskController::class, 'update']);
Route::delete('/api/tasks/{id}', [TaskController::class, 'destroy'])->name('tasks.destroy');
Route::get('/maintasks', [TaskController::class, 'maintasks'])->name('maintasks');

Route::get('/api/users', [UserController::class,'index']);
Route::get('/api/users/{id}',[UserController::class,'show']);
Route::post('/api/users',[UserController::class,'store']);
Route::put('/api/users/{id}',[UserController::class,'update']);
Route::delete('/api/users/{id}',[UserController::class,'destroy']);

Route::get('login', [AuthController::class, 'index'])->name('login');
Route::post('post-login', [AuthController::class, 'postLogin'])->name('login.post'); 
Route::get('registration', [AuthController::class, 'registration'])->name('register');
Route::post('post-registration', [AuthController::class, 'postRegistration'])->name('register.post'); 
Route::get('dashboard', [AuthController::class, 'dashboard']); 
Route::post('logout', [AuthController::class, 'logout'])->name('logout');