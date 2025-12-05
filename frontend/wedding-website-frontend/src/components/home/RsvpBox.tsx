import './RsvpBox.css';

import { Modal, Button, TextInput, Radio, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty, matches, isEmail } from '@mantine/form';
import { useState } from 'react';

type TextualInputOptions = {
  withAsterisk?: boolean;
  autoComplete?: string;
};

const TextualInput = (
  form: any,
  label: string,
  key: string,
  options: TextualInputOptions = {}
) => {
  const [focused, setFocused] = useState(false);
  const inputProps = form.getInputProps(key);
  const floating = focused || (inputProps.value && inputProps.value.length > 0);
  const { withAsterisk, autoComplete } = options;

  return (
    <TextInput
      withAsterisk={withAsterisk}
      label={label}
      autoComplete={autoComplete}
      placeholder=""
      labelProps={{ 'data-floating': floating || undefined }}
      classNames={{
        root: 'floating-input-root',
        input: 'floating-input-input',
        label: 'floating-input-label',
      }}
      {...inputProps}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const RsvpForm = () => {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      willAttend: null,
    },

    validate: {
      firstName: matches(/^[a-z ,.'-]+$/i, 'Invalid First Name'),
      lastName: matches(/^[a-z ,.'-]+$/i, 'Invalid Last Name'),
      email: (email) => (email ? isEmail('Invalid Email')(email) : null),
      phoneNumber: (phoneNumber) =>
        phoneNumber
          ? matches(
              /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
              'Invalid Phone Number'
            )(phoneNumber)
          : null,
      willAttend: isNotEmpty('You must select if you are attending or not'),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('MAKING API CALL!');
    console.log(values);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <>
          {TextualInput(form, 'First Name', 'firstName', {
            withAsterisk: true,
            autoComplete: 'given-name',
          })}
        </>
        <>
          {TextualInput(form, 'Last Name', 'lastName', {
            withAsterisk: true,
            autoComplete: 'family-name',
          })}
        </>
        <>
          {TextualInput(form, 'Email', 'email', {
            withAsterisk: false,
            autoComplete: 'email',
          })}
        </>
        <>
          {TextualInput(form, 'Phone Number', 'phoneNumber', {
            withAsterisk: false,
            autoComplete: 'tel',
          })}
        </>

        <Radio.Group
          name="willAttend"
          withAsterisk
          {...form.getInputProps('willAttend')}
        >
          <Group mt="sm">
            <Radio value="true" label="I will be attending" />
            <Radio value="false" label="I won't be attending" />
          </Group>
        </Radio.Group>

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
          {/*// TODO: Call backend API and return success/error based on if RSVP is updated */}
        </Group>
      </form>
      <form
        onSubmit={form.onSubmit(
          (values, event) => {
            console.log(values, event);
          },
          (validationErrors, values, event) => {
            console.log(validationErrors, values, event);
          }
        )}
      />
    </>
  );
};

const RsvpBox = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="rsvp-box-container">
        <Modal
          opened={opened}
          onClose={close}
          title="RSVP"
          overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
          centered
          classNames={{ title: 'modal-title-centered' }}
        >
          <RsvpForm />
        </Modal>

        <Button
          variant="light"
          color="var(--primary-green)"
          size="xl"
          radius="md"
          onClick={open}
          className="rsvp-button"
          style={{
            minWidth: '350px',
            height: '80px',
            fontSize: '1.75rem',
          }}
        >
          RSVP
        </Button>
      </div>
    </>
  );
};

export default RsvpBox;
