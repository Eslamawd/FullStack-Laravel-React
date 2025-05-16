<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Storage;

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'category' => 'nullable|string',
            'date' => 'required|date',
            'venue' => 'required|string',
            'price' => 'required|numeric',
            'image_path' => 'nullable|image',
        ]);

        if ($request->hasFile( 'image_path')) {
            $path = $request->file( 'image_path')->store( 'images',  'public');
            $validated['image_path'] = $path;
        }
        $validated['created_by'] = Auth::id();

        return Event::create( $validated);
    }

    public function show( $id)
    {
        $event = Event::findOrFail($id);
        return $event;
    }
      
    

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'category' => 'nullable|string',
            'date' => 'sometimes|date',
            'venue' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'image_path' => 'nullable|image',
        ]);

        if ($request->hasFile( 'image_path')) {
            $path = $request->file('image_path')->store( 'images',  'public');
            $validated['image_path'] = $path;
        }

        $event->update($validated);

        return $event;
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


