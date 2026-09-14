<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('event'));
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'string'],

            'venue' => ['nullable', 'string', 'max:255'],

            'address' => ['nullable', 'string', 'max:255'],

            'starts_at' => ['required', 'date'],

            'ends_at' => [
                'required',
                'date',
                'after:starts_at',
            ],

            'is_public' => ['required', 'boolean'],

            'is_paid' => ['required', 'boolean'],
        ];
    }
}
