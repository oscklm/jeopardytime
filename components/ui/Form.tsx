import React from "react";
import { View, Text, TextInput } from "react-native";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type Noop,
  useFormContext,
} from "react-hook-form";
import { StyleSheet } from "react-native-unistyles";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const Form = FormProvider;

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <View ref={ref} style={[{ marginVertical: 8 }, style]} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<Text, React.ComponentProps<typeof Text>>(
  ({ style, children, ...props }, ref) => {
    const { error, name } = useFormField();
    styles.useVariants({
      error: !!error,
    });

    return children ? (
      <Text ref={ref} style={styles.label} {...props}>
        {children}
      </Text>
    ) : (
      <Text ref={ref} style={styles.label} {...props}>
        {name}
      </Text>
    );
  }
);
FormLabel.displayName = "FormLabel";

interface FormInputProps
  extends Omit<React.ComponentProps<typeof TextInput>, "onChange" | "value"> {
  onChange: (...event: unknown[]) => void;
  onBlur: Noop;
  value: string;
}

const FormInput = React.forwardRef<TextInput, FormInputProps>(
  ({ onChange, value = "", onBlur, style, ...props }, ref) => {
    const { error } = useFormField();

    styles.useVariants({
      error: !!error,
    });

    return (
      <TextInput
        ref={ref}
        onBlur={onBlur}
        onChange={onChange}
        onChangeText={onChange}
        value={value}
        style={[styles.textInput, style]}
        {...props}
      />
    );
  }
);
FormInput.displayName = "FormInput";

const FormButtonGroup = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.buttonContainer}>{children}</View>;
};
FormButtonGroup.displayName = "FormButtonGroup";

const FormDescription = React.forwardRef<
  Text,
  React.ComponentProps<typeof Text>
>(({ style, ...props }, ref) => {
  return <Text ref={ref} style={styles.description} {...props} />;
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<Text, React.ComponentProps<typeof Text>>(
  ({ style, children, ...props }, ref) => {
    const { error } = useFormField();

    styles.useVariants({
      error: !!error,
    });

    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <Text ref={ref} style={styles.message} {...props}>
        {body}
      </Text>
    );
  }
);
FormMessage.displayName = "FormMessage";

const styles = StyleSheet.create((th) => ({
  textInput: {
    fontFamily: th.fontFamily.BodyRegular,
    fontSize: th.fontSize(1),
    backgroundColor: th.colors.background.light,
    borderWidth: 2,
    borderColor: th.colors.background.dark,
    borderRadius: th.borderRadius(3),
    padding: th.gap(3),
    variants: {
      error: {
        true: {
          borderColor: th.colors.error.base,
        },
      },
    },
  },
  label: {
    fontFamily: th.fontFamily.BodyBold,
    fontSize: th.fontSize(1),
    lineHeight: th.fontSize(1) * 1.2,
    marginBottom: th.gap(1),
    textTransform: "capitalize",
    color: th.colors.foreground.base,
    variants: {
      error: {
        true: {
          color: th.colors.error.base,
        },
      },
    },
  },
  description: {
    marginBottom: th.gap(2),
    fontFamily: th.fontFamily.BodyRegular,
    fontSize: th.fontSize(14),
    lineHeight: th.fontSize(14) * 1.3,
    color: th.colors.primary.light,
    letterSpacing: 0.3,
  },
  message: {
    fontFamily: th.fontFamily.BodyRegular,
    fontSize: th.fontSize(1),
    lineHeight: th.fontSize(1) * 1.3,
    letterSpacing: 0.3,
    variants: {
      error: {
        true: {
          color: th.colors.error.base,
        },
      },
    },
  },
  buttonContainer: {
    marginTop: th.gap(4),
    gap: th.gap(3),
    variants: {
      error: {
        true: {
          color: th.colors.error.base,
        },
      },
    },
  },
}));

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormInput,
  FormDescription,
  FormMessage,
  FormField,
  FormButtonGroup,
};
