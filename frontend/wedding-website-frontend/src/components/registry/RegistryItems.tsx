import { useDisclosure } from '@mantine/hooks';
import './RegistryItems.css';
import { mockData } from './gifts'; // TODO: Remove this and use real DB
import { useState } from 'react';

import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Modal,
  NumberInput,
  Paper,
  Progress,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, isNotEmpty, matches, isEmail } from '@mantine/form';
import { Link } from 'react-router-dom';

type RegistryItem = {
  label: string;
  description: string;
  price: number;
  image?: string;
  alt?: string;
  requested_quantity: number;
  received_quantity: number;
  purchase_link: string;
};

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

const PurchaseForm = (remaining_quantity: number) => {
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

        <NumberInput
          pt="lg"
          label="How many did you purchase?"
          min={1}
          max={remaining_quantity}
          allowDecimal={false}
          stepHoldDelay={500}
          stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
          defaultValue={1}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
          {/*// TODO: Call backend API and return success/error based on if registry database is updated*/}
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

const ItemCard = (item: RegistryItem) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Card key={item.label} shadow="sm" padding="md" radius="md" withBorder>
      {/* Label and price */}
      <Card.Section inheritPadding>
        <Grid justify="space-between" pt="lg" pl="md">
          <Text fw={700}>{item.label}</Text>
          <Badge color="var(--secondary-green)">${item.price}</Badge>
        </Grid>
      </Card.Section>

      {/* Description */}
      <Card.Section inheritPadding>
        <Space h="sm" />
        <Center>
          <Text>{item.description}</Text>
        </Center>
        <Space h="xl" />
        <Space h="md" />
      </Card.Section>

      {/* Received progress bar */}
      <Card.Section inheritPadding>
        <Card.Section pl="xl" pr="xl">
          <Grid justify="space-between">
            <Text size="sm">
              Received {item.received_quantity} of {item.requested_quantity}
            </Text>
          </Grid>
          <Space h="sm" />
        </Card.Section>
        <Progress
          value={(item.received_quantity / item.requested_quantity) * 100}
        />
      </Card.Section>

      {/* Purchase link */}
      <Card.Section inheritPadding>
        <Button
          color="var(--primary-green)"
          fullWidth
          mt="md"
          radius="md"
          component={Link}
          to={item.purchase_link}
        >
          Link to Purchase
        </Button>
      </Card.Section>

      {/* Modal for logging purchase */}
      <Modal
        opened={opened}
        onClose={close}
        title="Purchase Details"
        overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
        centered
        classNames={{ title: 'modal-title-centered' }}
      >
        <>{PurchaseForm(item.requested_quantity - item.received_quantity)}</>
      </Modal>
      <Card.Section inheritPadding pb="md">
        <Button
          disabled={item.received_quantity >= item.requested_quantity}
          color="var(--primary-green)"
          fullWidth
          mt="md"
          radius="md"
          onClick={open}
        >
          I have purchased this
        </Button>
      </Card.Section>
    </Card>
  );

  /*
  Card should be:
    - image
    - label
    - price
    - progress bar of requested/received
    - Link to purchase
    - Button for "I have purchased" -> Opens modal
      - Modal:
        - Ask name (for thank you cards!)
        - Quantity (to update progress)
  */
};

const fetchFromRegistryDatabase = async () => {
  // TODO: Connect to database for registry registry items
  return mockData;
};

const RegistryItems = async () => {
  return (
    <Box p="md">
      {(await fetchFromRegistryDatabase()).map((item) => (
        <Paper key={item.label} p="lg">
          <ItemCard {...item} />
        </Paper>
      ))}
    </Box>
  );
};

export default RegistryItems;
