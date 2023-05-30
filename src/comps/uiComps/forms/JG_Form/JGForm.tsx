import { useForm, FormProvider, FieldErrorsImpl } from 'react-hook-form'

function JGForm({
  onSubmit,
  children,
  onError,
  className,
}: {
  onSubmit: (value: Record<string, any>) => void
  className?: string
  onError?: (error: FieldErrorsImpl) => void
  children: React.ReactNode
}) {
  const methods = useForm()

  onError && onError(methods.formState.errors)
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default JGForm
