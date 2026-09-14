<?php

namespace App\Http\Requests;

// use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class StoreEventTicketTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'price' => [
                'required',
                'numeric',
                'min:0',
            ],
            'capacity' => [
                'required',
                'integer',
                'min:1',
            ],
            'admits' => [
                'required',
                'integer',
                'min:1',
            ],
            'formats' => [
                'required',
                'array',
                'min:1',
            ],
            'formats.printed' => [
                'nullable',
                'integer',
                'min:1',
            ],
            'formats.digital' => [
                'nullable',
                'integer',
                'min:1',
            ],
            'is_active' => [
                'sometimes',
                'boolean',
            ],
            'sales_start_at' => [
                'nullable',
                'date',
            ],
            'sales_end_at' => [
                'nullable',
                'date',
                'after:sales_start_at',
            ],

        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                $capacity = (int) $this->input('capacity');

                $digital = (int) $this->input('formats.digital', 0);
                $printed = (int) $this->input('formats.printed', 0);

                $allocatedCapacity = $digital + $printed;

                if ($allocatedCapacity !== $capacity) {
                    $validator->errors()->add(
                        'formats',
                        "The format capacities must add up to the total capacity of {$capacity}."
                    );
                }
            },
        ];
    }
}
