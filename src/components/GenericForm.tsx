import React from 'react';
import { useForm, FormProvider, SubmitHandler, UseFormProps, FieldValues } from 'react-hook-form';

interface GenericFormInterface<TFormData extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFormData>;
  formOptions?: UseFormProps<TFormData>;
}

const GenericForm = <TFormData extends FieldValues>({
  children,
  onSubmit,
  formOptions,
}: GenericFormInterface<TFormData>) => {
  const methods = useForm<TFormData>(formOptions);

  return (
    // form provider를 통해 useForm에서 가져온 methods를 children (하위 컴포넌트)에 전달
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericForm;
