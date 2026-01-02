import './RsvpBox.css';

import { Modal, Button, TextInput, Radio, Group, Stack, Text, Box, CloseButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty, matches, isEmail } from '@mantine/form';
import { useState } from 'react';
import { IconHeartFilled, IconCheck, IconX } from '@tabler/icons-react';

// Form values type for RSVP
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

interface RsvpFormProps {
  onClose: () => void;
}

const RsvpForm = ({ onClose }: RsvpFormProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const apiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8080';

  const form = useForm<RsvpFormValues>({
    mode: 'uncontrolled',
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
      willAttend: isNotEmpty('Please let us know if you can attend'),
    },
  });

  const handleSubmit = async (values: RsvpFormValues) => {
    setLoading(true);
    setMessage(null);

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

      const data = (await response.json()) as ApiResponse;

      if (data.success) {
        form.reset();
        setMessage({ type: 'success', text: data.message ?? 'Thank you! Your RSVP has been received.' });
      } else {
        setMessage({ type: 'error', text: data.message ?? 'There was an error submitting your RSVP. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (message) {
    return (
      <Box className="rsvp-message-container">
        <Box className={`rsvp-message-icon ${message.type}`}>
          {message.type === 'success' ? (
            <IconCheck size={48} stroke={2} />
          ) : (
            <IconX size={48} stroke={2} />
          )}
        </Box>
        <Text className="rsvp-message-title">
          {message.type === 'success' ? 'You\'re All Set!' : 'Oops!'}
        </Text>
        <Text className="rsvp-message-text">
          {message.text}
        </Text>
        <Button 
          onClick={onClose} 
          className="rsvp-close-button"
          variant="outline"
          size="md"
        >
          Close
        </Button>
      </Box>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Group grow>
          <TextInput
            label="First Name"
            placeholder="Your first name"
            withAsterisk
            autoComplete="given-name"
            key={form.key('firstName')}
            classNames={{
              input: 'rsvp-input',
              label: 'rsvp-label',
            }}
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last Name"
            placeholder="Your last name"
            withAsterisk
            autoComplete="family-name"
            key={form.key('lastName')}
            classNames={{
              input: 'rsvp-input',
              label: 'rsvp-label',
            }}
            {...form.getInputProps('lastName')}
          />
        </Group>
        
        <TextInput
          label="Email"
          placeholder="your.email@example.com"
          autoComplete="email"
          key={form.key('email')}
          classNames={{
            input: 'rsvp-input',
            label: 'rsvp-label',
          }}
          {...form.getInputProps('email')}
        />
        
        <TextInput
          label="Phone Number"
          placeholder="(555) 123-4567"
          autoComplete="tel"
          key={form.key('phoneNumber')}
          classNames={{
            input: 'rsvp-input',
            label: 'rsvp-label',
          }}
          {...form.getInputProps('phoneNumber')}
        />

        <Box className="rsvp-attendance-section">
          <Radio.Group
            name="willAttend"
            withAsterisk
            label="Will you be joining us?"
            key={form.key('willAttend')}
            classNames={{
              label: 'rsvp-attendance-label',
              error: 'rsvp-attendance-error',
            }}
            {...form.getInputProps('willAttend')}
          >
            <Group mt="sm" gap="md">
              <Radio 
                value="true" 
                label="Yes" 
                classNames={{
                  radio: 'rsvp-radio',
                  label: 'rsvp-radio-label',
                }}
              />
              <Radio 
                value="false" 
                label="No" 
                classNames={{
                  radio: 'rsvp-radio',
                  label: 'rsvp-radio-label',
                }}
              />
            </Group>
          </Radio.Group>
        </Box>

        <Button 
          type="submit" 
          loading={loading} 
          className="rsvp-submit-button"
          size="lg"
          fullWidth
          leftSection={<IconHeartFilled size={18} />}
        >
          Send RSVP
        </Button>
      </Stack>
    </form>
  );
};

const RsvpBox = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="rsvp-box-container">
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.4 }}
        centered
        padding={0}
        radius="lg"
        size="md"
        transitionProps={{ duration: 150 }}
        classNames={{
          content: 'rsvp-modal-content',
          body: 'rsvp-modal-body',
        }}
      >
        <Box className="rsvp-modal-header">
          <CloseButton 
            onClick={close} 
            className="rsvp-modal-close-button"
            size="md"
            aria-label="Close modal"
          />
          <Text className="rsvp-modal-title">RSVP</Text>
        </Box>
        <Box className="rsvp-modal-form-container">
          <RsvpForm onClose={close} />
        </Box>
      </Modal>

      <Button
        variant="light"
        color="var(--primary-brown)"
        size="xl"
        radius="md"
        onClick={open}
        className="rsvp-button"
        style={{
          minWidth: '450px',
          height: '100px',
          fontSize: '2.25rem',
        }}
      >
        RSVP
      </Button>
    </div>
  );
};

export default RsvpBox;
