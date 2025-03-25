import { ContractFormData } from "@/schemas/contractSchemas";
import { Controller } from "react-hook-form";

const FormInput = ({ 
    name, 
    label, 
    type = 'text', 
    control, 
    errors,
    defaultValue = '',
    disabled = false
  }: {
    name: keyof ContractFormData;
    label: string;
    type?: string;
    control: any;
    errors: any;
    defaultValue?: string | Date; 
    disabled?: boolean;
  }) => {
    const formatDate = (date: Date | string | undefined) => {
      if (!date) return '';
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    };
  
    return (
      <div className="mb-4">
        <label 
          className={`block text-sm font-bold mb-2 ${
            disabled ? 'text-gray-400' : 'text-gray-700'
          }`} 
          htmlFor={name}
        >
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type={type}
              id={name}
              disabled={disabled}
              value={type === 'date' ? formatDate(field.value) : field.value}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 ${
                disabled 
                  ? 'bg-gray-100 cursor-not-allowed text-gray-500 border-gray-300'
                  : 'text-gray-700 ' + (
                    errors[name] 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'focus:ring-blue-500'
                  )
              }`}
            />
          )}
        />
        {errors[name] && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    );
  };

export default FormInput;