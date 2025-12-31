import './RsvpBox.css';

import { Modal, Button, TextInput, Radio, Group, Alert, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty, matches, isEmail } from '@mantine/form';
import { useState } from 'react';

// Form values type for Rsvp
interface RsvpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  willAttend: string | null;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface TextualInputOptions {
  withAsterisk?: boolean;
  autoComplete?: string;
}

const TextualInput = (
  form: ReturnType<typeof useForm<RsvpFormValues>>,
  label: string,
  key: keyof RsvpFormValues,
  options: TextualInputOptions = {}
) => {
  const [focused, setFocused] = useState(false);
  const inputProps = form.getInputProps(key);
  const value = form.values[key];
  const floating = (focused || (value && value.length > 0)) ?? undefined;
  const { withAsterisk, autoComplete } = options;

  return (
    <TextInput
      withAsterisk={withAsterisk}
      label={label}
      autoComplete={autoComplete}
      placeholder=""
      labelProps={{ 'data-floating': floating ?? undefined }}
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

interface RsvpFormProps {
  onClose: () => void;
}

const RsvpForm = ({ onClose }: RsvpFormProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const apiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8080';
  const form = useForm<RsvpFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      willAttend: null as string | null,
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

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setMessage(null);
    console.log('Submitting RSVP:', values);
    try {
      const response = await fetch(`${apiUrl}/v1/api/rsvp`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          phone: values.phoneNumber,
          attending: values.willAttend === 'true',
        }),
      });
      console.log('Response status:', response.status);
      const data = await response.json() as ApiResponse;
      console.log('Response data:', data);
      if (data.success) {
        console.log('RSVP submitted successfully');
        form.reset();
        setMessage({ type: 'success', text: data.message ?? 'Thank you! Your RSVP has been received.' });
      } else {
        console.error('RSVP failed:', data.message);
        setMessage({ type: 'error', text: data.message ?? 'There was an error submitting your RSVP. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {message && (
        <Alert
          title={message.type === 'success' ? 'Success' : 'Error'}
          color={message.type === 'success' ? 'green' : 'red'}
          mb="md"
        >
          {message.text}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <div style={{ display: message ? 'none' : 'block' }}>
            {TextualInput(form, 'First Name', 'firstName', {
              withAsterisk: true,
              autoComplete: 'given-name',
            })}
            {TextualInput(form, 'Last Name', 'lastName', {
              withAsterisk: true,
              autoComplete: 'family-name',
            })}
            {TextualInput(form, 'Email', 'email', {
              withAsterisk: false,
              autoComplete: 'email',
            })}
            {TextualInput(form, 'Phone Number', 'phoneNumber', {
              withAsterisk: false,
              autoComplete: 'tel',
            })}
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
              <Button type="submit" loading={loading}>Submit</Button>
            </Group>
          </div>
          {message && (
            <Group justify="flex-end" mt="md">
              <Button onClick={onClose} variant="default">
                Close
              </Button>
            </Group>
          )}
        </Stack>
      </form>
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
          title="Rsvp"
          overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
          centered
          classNames={{ title: 'modal-title-centered' }}
        >
          <RsvpForm onClose={close} />
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
          Rsvp
        </Button>
      </div>
    </>
  );
};

export default RsvpBox;
