import { cn } from "@/lib/utils"

interface FormProgressProps {
  currentStep: number
  steps: { id: number; title: string }[]
  onSelectedStep: (step: number) => void;
}

export default function FormProgress({ currentStep, steps, onSelectedStep }: FormProgressProps) {
  return (
    <div className="relative mt-6">
      {/* Line connecting the steps */}
      <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-muted"></div>

      {/* Steps */}
      <ol className="relative z-10 flex justify-between">
        {steps.map((step, index) => (
          <li key={step.id} onClick={() => onSelectedStep(step.id)} className="flex flex-col items-center">
            {/* Step circle */}
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </div>

            {/* Step title - hidden on mobile, visible on larger screens */}
            <span
              className={cn(
                "absolute mt-10 text-xs font-medium text-center w-full max-w-[100px] hidden sm:block",
                index <= currentStep ? "text-primary" : "text-muted-foreground",
              )}
            >
              {step.title}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
