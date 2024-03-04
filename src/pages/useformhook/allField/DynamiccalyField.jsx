import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

// type formvalues = {
//   cart: {
//     amount: number,
//     name: string,
//   }[],
// };
export default function DynamiccalyField() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cart: [{ name: "", amount: 0 }],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "cart",
    control,
  });
  return (
    <div>
      <form
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        {fields.map((field, index) => {
          return (
            <section key={field.id}>
              <label>name</label>
              <input {...register(`cart.${index}.name`)} />
              <label>amount</label>
              <input
                type="number"
                {...register(`cart.${index}.amount`, { valueAsNumber: true })}
              />
            </section>
          );
        })}
        <button type="button" onClick={() => append()}>
          Append
        </button>
        <button type="button" onClick={() => prepend()}>
          prepend
        </button>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
