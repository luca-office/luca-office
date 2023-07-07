import React from "react"
import {Controller, useForm} from "react-hook-form"
import {Button, CustomSelect, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {Salutation} from "shared/graphql/generated/globalTypes"
import {ParticipantData} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {styles} from "../styles"

interface Props {
  readonly login: (data: ParticipantData) => void
}

export const AnonymousLogin: React.FC<Props> = ({login}) => {
  const {t} = useLucaTranslation()
  const {register, handleSubmit, errors, control} = useForm<ParticipantData>()

  const salutationOpts = [
    {label: `${t("mrs")}`, value: Salutation.Mrs, selected: true},
    {label: `${t("mr")}`, value: Salutation.Mr, selected: false},
    {label: `${t("non_binary")}`, value: Salutation.NonBinary, selected: false}
  ]

  const onSubmit = handleSubmit((data: ParticipantData) => {
    login({...data, firstName: data.firstName.trim(), lastName: data.lastName.trim()})
  })

  return (
    <div css={styles.formWrapper}>
      <form onSubmit={onSubmit}>
        <Controller
          render={({onChange, value}) => (
            <CustomSelect
              onChange={onChange}
              value={value}
              name="salutation"
              optionList={salutationOpts}
              labelKey="auth__salutation_label"
              customStyles={styles.input}
            />
          )}
          control={control}
          name="salutation"
          rules={{required: true}}
          defaultValue={Salutation.Mrs}
        />

        <TextInput
          ref={register({required: true, minLength: 1})}
          type={InputType.text}
          name="firstName"
          labelKey="first_name"
          placeholderKey="first_name"
          hasValidationError={errors.firstName !== undefined}
          errorKey="auth__as_anon_user_text_error"
          customStyles={styles.input}
        />

        <TextInput
          ref={register({required: true, minLength: 1})}
          type={InputType.text}
          name="lastName"
          labelKey="last_name"
          placeholderKey="last_name"
          hasValidationError={errors.lastName !== undefined}
          errorKey="auth__as_anon_user_text_error"
          customStyles={styles.input}
        />

        <Button customStyles={styles.button} isLoading={false} disabled={false}>
          {t("auth__as_anon_user_participate")}
        </Button>
      </form>
    </div>
  )
}
