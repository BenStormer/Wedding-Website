import './RegistryItems.css';
import { initialRegistryData } from './Gifts';
import type { RegistryItem } from './Gifts';

import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CloseButton,
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
  IconHeartFilled,
  IconX,
} from '@tabler/icons-react';

// Form values type
interface PurchaseFormValues {
  firstName: string;
  lastName: string;
  email: string;
  quantity: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const apiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8080';

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

  const handleSubmit = async (values: PurchaseFormValues) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${apiUrl}/v1/api/registry/gift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          quantity: values.quantity,
          itemLabel: itemLabel,
          isSpecialFund: isSpecialFund,
        }),
      });

      const data = (await response.json()) as ApiResponse;

      if (data.success) {
        form.reset();
        onSubmit(values.quantity);
        setMessage({ type: 'success', text: data.message ?? 'Thank you so much for your generous gift!' });
      } else {
        setMessage({ type: 'error', text: data.message ?? 'There was an error recording your gift. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting gift:', error);
      setMessage({ type: 'error', text: 'Unable to connect to the server. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  if (message) {
    return (
      <Box className="registry-message-container">
        <Box className={`registry-message-icon ${message.type}`}>
          {message.type === 'success' ? (
            <IconCheck size={48} stroke={2} />
          ) : (
            <IconX size={48} stroke={2} />
          )}
        </Box>
        <Text className="registry-message-title">
          {message.type === 'success' ? "You're All Set!" : 'Oops!'}
        </Text>
        <Text className="registry-message-text">
          {message.text}
        </Text>
        <Button 
          onClick={onClose} 
          className="registry-close-button"
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
        <Text size="sm" c="var(--bold-green)" ta="center" className="registry-form-description">
          {isSpecialFund ? (
            <>
              Thank you for contributing to our <strong>{itemLabel}</strong>!
              Please let us know who to thank!
            </>
          ) : (
            <>
              Thank you for gifting us{' '}
              {/^[aeiou]/i.test(itemLabel) ? 'an' : 'a'}{' '}
              <strong>{itemLabel}</strong>! Please let us know who to thank!
            </>
          )}
        </Text>

        <Group grow>
          <TextInput
            label="First Name"
            placeholder="Your first name"
            withAsterisk
            autoComplete="given-name"
            classNames={{
              input: 'registry-input',
              label: 'registry-label',
            }}
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last Name"
            placeholder="Your last name"
            withAsterisk
            autoComplete="family-name"
            classNames={{
              input: 'registry-input',
              label: 'registry-label',
            }}
            {...form.getInputProps('lastName')}
          />
        </Group>

        <TextInput
          label="Email (optional)"
          placeholder="your.email@example.com"
          autoComplete="email"
          classNames={{
            input: 'registry-input',
            label: 'registry-label',
          }}
          {...form.getInputProps('email')}
        />

        {!isSpecialFund && (
          <NumberInput
            label="Quantity purchased"
            min={1}
            max={remainingQuantity ?? undefined}
            allowDecimal={false}
            defaultValue={1}
            classNames={{
              input: 'registry-input',
              label: 'registry-label',
            }}
            {...form.getInputProps('quantity')}
          />
        )}

        <Button 
          type="submit" 
          loading={loading}
          className="registry-submit-button"
          size="lg"
          fullWidth
          leftSection={<IconHeartFilled size={18} />}
        >
          Submit
        </Button>
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
        <Text size="sm" c="var(--bold-green)">
          {isComplete ? (
            <Group gap={4}>
              <IconCheck size={14} />
              <span>Fully gifted!</span>
            </Group>
          ) : (
            `${received} of ${requested} gifted`
          )}
        </Text>
        <Text size="sm" c="var(--bold-green)" fw={500}>
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

          <Text size="sm" c="var(--bold-green)" className="registry-item-description">
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
              variant="light"
              color="var(--primary-green)"
              leftSection={<IconGift size={14} />}
              className="registry-button registry-button-purchased"
            >
              {item.isSpecialFund ? 'I Contributed' : 'I Purchased'}
            </Button>
          </Group>
        </Stack>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        overlayProps={{ backgroundOpacity: 0.4 }}
        padding={0}
        radius="lg"
        size="md"
        transitionProps={{ duration: 150 }}
        classNames={{
          content: 'registry-modal-content',
          body: 'registry-modal-body',
        }}
      >
        <Box className="registry-modal-header">
          <CloseButton 
            onClick={close} 
            className="registry-modal-close-button"
            size="md"
            aria-label="Close modal"
          />
          <Text className="registry-modal-title">
            {item.isSpecialFund ? 'I Contributed to This!' : 'I Purchased This!'}
          </Text>
        </Box>
        <Box className="registry-modal-form-container">
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
        </Box>
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
