<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;

class BookingController extends Controller
{
    public function store(StoreBookingRequest $request)
    {
        $user = $request->user();

        $booking = Booking::firstOrCreate([
            'user_id' => $user->id,
            'event_id' => $request->event_id,
        ]);

        return response()->json([
            'message' => 'Booking successful',
            'booking' => new BookingResource($booking),
        ]);
    }

    public function index()
    {
        $user = auth()->user();

        $bookings = Booking::where('user_id', $user->id)->with('event')->get();

        return response()->json(BookingResource::collection($bookings)->resolve());

    }
}
