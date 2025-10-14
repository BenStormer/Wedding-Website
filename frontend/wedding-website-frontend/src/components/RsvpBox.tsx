import './RsvpBox.css';

import { Modal, Button, TextInput, Radio, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty, matches } from '@mantine/form';
import { useState } from 'react';

const NameInput = (form: any, label: string, key: string) => {
  const [focused, setFocused] = useState(false);
  const inputProps = form.getInputProps(key);
  const floating = focused || (inputProps.value && inputProps.value.length > 0);

  return (
    <TextInput
      withAsterisk
      label={label}
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
      willAttend: null,
    },

    validate: {
      firstName: matches(/^[a-z ,.'-]+$/i, 'Invalid First Name'),
      lastName: matches(/^[a-z ,.'-]+$/i, 'Invalid Last Name'),
      willAttend: isNotEmpty('You must select if you are attending or not'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <>{NameInput(form, 'First Name', 'firstName')}</>
      <>{NameInput(form, 'Last Name', 'lastName')}</>

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
      </Group>
      {/*// TODO: Call backend API and return success/error based on if RSVP is*/}
      {/*updated*/}
    </form>
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
          <RsvpForm></RsvpForm>
        </Modal>

        <Button
          variant="filled"
          color="var(--primary-green)"
          size="xl"
          radius="lg"
          onClick={open}
        >
          RSVP
        </Button>
      </div>
    </>
  );
};

export default RsvpBox;
