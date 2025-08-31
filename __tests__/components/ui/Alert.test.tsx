// __tests__/components/ui/Alert.test.tsx
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

describe('Alert', () => {
  it('renders alert with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your action was completed successfully.
        </AlertDescription>
      </Alert>
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(
      screen.getByText('Your action was completed successfully.')
    ).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error processing your request.
        </AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('border-destructive/50');
  });

  it('renders default variant when no variant is specified', () => {
    render(
      <Alert>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational message.</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-background');
  });

  it('passes additional className props', () => {
    render(
      <Alert className="custom-class">
        <AlertTitle>Custom</AlertTitle>
        <AlertDescription>This alert has a custom class.</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });
});
