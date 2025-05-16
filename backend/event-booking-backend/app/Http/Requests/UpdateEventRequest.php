<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
             'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'category' => 'nullable|string',
            'date' => 'sometimes|date',
            'venue' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'image_path' => 'nullable|image',
        ];
    }
}
