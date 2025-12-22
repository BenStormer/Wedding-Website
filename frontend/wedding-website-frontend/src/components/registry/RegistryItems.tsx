import './RegistryItems.css';
import { initialRegistryData } from './Gifts';
import type { RegistryItem } from './Gifts';

import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Modal,
  NumberInput,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, matches, isEmail } from '@mantine/form';
import {
  IconExternalLink,
  IconCheck,
  IconGift,
  IconHeart,
} from '@tabler/icons-react';

// Form values type
interface PurchaseFormValues {
  firstName: string;
  lastName: string;
  email: string;
  quantity: number;
}

// Floating label text input
interface FloatingInputProps {
  form: ReturnType<typeof useForm<PurchaseFormValues>>;
  label: string;
  fieldKey: keyof PurchaseFormValues;
  withAsterisk?: boolean;
  autoComplete?: string;
}

const FloatingInput = ({
  form,
  label,
  fieldKey,
  withAsterisk,
  autoComplete,
}: FloatingInputProps) => {
  const [focused, setFocused] = useState(false);
  const inputProps = form.getInputProps(fieldKey);
  const value = inputProps.value as string;
  const floating = focused || (value && value.length > 0);

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

// Purchase confirmation modal form
interface PurchaseFormProps {
  remainingQuantity: number | null;
  itemLabel: string;
  isSpecialFund?: boolean;
  onSubmit: (quantity: number) => void;
  onClose: () => void;
}

const PurchaseForm = ({
  remainingQuantity,
  itemLabel,
  isSpecialFund,
  onSubmit,
  onClose,
}: PurchaseFormProps) => {
  const form = useForm<PurchaseFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      quantity: 1,
    },
    validate: {
      firstName: matches(/^[a-z ,.'-]+$/i, 'Please enter a valid name'),
      lastName: matches(/^[a-z ,.'-]+$/i, 'Please enter a valid name'),
      email: (email) =>
        email ? isEmail('Please enter a valid email')(email) : null,
    },
  });

  const handleSubmit = (values: PurchaseFormValues) => {
    console.log('Submitting purchase:', values);
    // TODO: Call backend API to update registry
    onSubmit(values.quantity);
    onClose();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Text size="sm" c="dark.5" ta="center">
          {isSpecialFund ? (
            <>
              Thank you for contributing to our <strong>{itemLabel}</strong>!
              Please let us know who you are so we can send a thank you note.
            </>
          ) : (
            <>
              Thank you for gifting us{' '}
              {/^[aeiou]/i.test(itemLabel) ? 'an' : 'a'}{' '}
              <strong>{itemLabel}</strong>! Please let us know who you are so we
              can send a thank you note.
            </>
          )}
        </Text>

        <Group grow>
          <FloatingInput
            form={form}
            label="First Name"
            fieldKey="firstName"
            withAsterisk
            autoComplete="given-name"
          />
          <FloatingInput
            form={form}
            label="Last Name"
            fieldKey="lastName"
            withAsterisk
            autoComplete="family-name"
          />
        </Group>

        <FloatingInput
          form={form}
          label="Email (optional)"
          fieldKey="email"
          autoComplete="email"
        />

        {!isSpecialFund && (
          <NumberInput
            label="Quantity purchased"
            min={1}
            max={remainingQuantity ?? undefined}
            allowDecimal={false}
            defaultValue={1}
            {...form.getInputProps('quantity')}
          />
        )}

        <Group justify="flex-end" mt="sm">
          <Button variant="subtle" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="var(--primary-green)">
            Confirm
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

// Price display
const PriceDisplay = ({ price }: { price: number }) => {
  if (price === 0) {
    return (
      <Text className="registry-item-price registry-item-price-any">
        Any Amount
      </Text>
    );
  }
  return (
    <Text className="registry-item-price">
      ${price.toLocaleString()}
      {price >= 100 ? '' : ' each'}
    </Text>
  );
};

// Progress display
interface ProgressDisplayProps {
  received: number;
  requested: number | null;
}

const ProgressDisplay = ({ received, requested }: ProgressDisplayProps) => {
  // Don't show progress for unlimited items
  if (requested === null) {
    return null;
  }

  const percentage = (received / requested) * 100;
  const isComplete = received >= requested;

  return (
    <Box className="registry-progress-container">
      <Group justify="space-between" mb={6}>
        <Text size="sm" c="dark.5">
          {isComplete ? (
            <Group gap={4}>
              <IconCheck size={14} />
              <span>Fully gifted!</span>
            </Group>
          ) : (
            `${received} of ${requested} gifted`
          )}
        </Text>
        <Text size="sm" c="dark.5" fw={500}>
          {Math.round(percentage)}%
        </Text>
      </Group>
      <Progress
        value={percentage}
        color="var(--primary-green)"
        size="sm"
        radius="xl"
        className="registry-progress-bar"
      />
    </Box>
  );
};

// Check if item is fully gifted
const isItemFullyGifted = (item: RegistryItem): boolean => {
  if (item.requested_quantity === null) return false; // Special funds are never "fully gifted"
  return item.received_quantity >= item.requested_quantity;
};

// Individual registry item card
interface RegistryItemCardProps {
  item: RegistryItem;
  onGift: (itemId: string, quantity: number) => void;
}

const RegistryItemCard = ({ item, onGift }: RegistryItemCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isFullyGifted = isItemFullyGifted(item);

  const handleGiftSubmit = (quantity: number) => {
    onGift(item.id, quantity);
  };

  return (
    <>
      <Card className="registry-card" shadow="sm" radius="md" withBorder>
        <Card.Section className="registry-card-image-section">
          <Image
            src={item.image}
            alt={item.alt}
            height={200}
            fallbackSrc="https://picsum.photos/800/600"
          />
          <Box className="registry-price-badge">
            <PriceDisplay price={item.price} />
          </Box>
          {isFullyGifted && (
            <Box className="registry-gifted-overlay">
              <IconHeart size={32} />
              <Text fw={600}>Thank You!</Text>
            </Box>
          )}
        </Card.Section>

        <Stack gap="sm" className="registry-card-content">
          <Text className="registry-item-title">{item.label}</Text>

          <Text size="sm" c="dark.5" className="registry-item-description">
            {item.description}
          </Text>

          <ProgressDisplay
            received={item.received_quantity}
            requested={item.requested_quantity}
          />

          <Group grow gap="sm" className="registry-card-buttons">
            <Button
              component="a"
              href={item.purchase_link}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              color="var(--primary-green)"
              leftSection={<IconExternalLink size={15} />}
              className="registry-button"
            >
              {item.isSpecialFund ? 'Contribute' : 'Purchase'}
            </Button>
            <Button
              onClick={open}
              disabled={isFullyGifted}
              color="var(--primary-green)"
              leftSection={<IconGift size={15} />}
              className="registry-button"
            >
              {item.isSpecialFund ? 'I Contributed' : 'I Purchased'}
            </Button>
          </Group>
        </Stack>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title="Thank You!"
        centered
        overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
        classNames={{ title: 'registry-modal-title' }}
      >
        <PurchaseForm
          remainingQuantity={
            item.requested_quantity !== null
              ? item.requested_quantity - item.received_quantity
              : null
          }
          itemLabel={item.label}
          isSpecialFund={item.isSpecialFund}
          onSubmit={handleGiftSubmit}
          onClose={close}
        />
      </Modal>
    </>
  );
};

// Sort items: special funds first, then incomplete items, then completed items
const sortRegistryItems = (items: RegistryItem[]): RegistryItem[] => {
  return [...items].sort((a, b) => {
    // Special funds always come first
    if (a.isSpecialFund && !b.isSpecialFund) return -1;
    if (!a.isSpecialFund && b.isSpecialFund) return 1;

    // Then sort by completion status (incomplete first)
    const aComplete = isItemFullyGifted(a);
    const bComplete = isItemFullyGifted(b);

    if (!aComplete && bComplete) return -1;
    if (aComplete && !bComplete) return 1;

    return 0;
  });
};

// Main registry grid component
const RegistryItemsGrid = () => {
  const [items, setItems] = useState<RegistryItem[]>(initialRegistryData);

  const handleGift = (itemId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, received_quantity: item.received_quantity + quantity }
          : item
      )
    );
  };

  const sortedItems = sortRegistryItems(items);

  return (
    <Box className="registry-grid-container">
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {sortedItems.map((item) => (
          <RegistryItemCard key={item.id} item={item} onGift={handleGift} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RegistryItemsGrid;
