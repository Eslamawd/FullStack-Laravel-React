<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(rules: [
            'event_id' => 'required|exists:events,id',
        ]);

        $user = $request->user();

        $booking = Booking::firstOrCreate(attributes: [
            'user_id' => $user->id,
            'event_id' => $request->event_id,
        ]);

        return response()->json(data: ['message' => 'Booking successful', 'booking' => $booking]);
    }

 public function index(Request $request)
{
    $bokings = Booking::where( 'user_id',  $request->user()->id)->with( 'event')->get();
    return response()->json( $bokings);
}
}