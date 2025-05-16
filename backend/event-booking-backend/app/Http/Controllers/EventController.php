<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Storage;

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }

   public function store(StoreEventRequest $request)
{
    $validated = $request->validated();

    if ($request->hasFile('image_path')) {
        $validated['image_path'] = $request->file('image_path')->store('images', 'public');
    }

    $validated['created_by'] = auth()->id();

    $event = Event::create($validated);

    return new EventResource($event); // return the created event as a resource
}
    public function show( $id)
    {
        $event = Event::findOrFail($id);
        return $event;
    }
      
    

   public function update(UpdateEventRequest $request, $id)
{
    $event = Event::findOrFail($id);
    $validated = $request->validated();

    if ($request->hasFile('image_path')) {
        $path = $request->file('image_path')->store('images', 'public');
        $validated['image_path'] = $path;
    }

    $event->update($validated);

    return new EventResource($event);
}

    public function destroy( $id)
    {
        $event = Event::findOrFail($id);
        if ($event->image_path) {
                         Storage::disk('public')->delete($event->image_path);
                    }
        $event->delete();
        return response()->noContent();
    }
}


