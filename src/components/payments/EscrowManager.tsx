'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

interface EscrowManagerProps {
  amount: number;
  onReleaseFunds: () => void;
  onDispute: () => void;
  status: 'pending' | 'funds_received' | 'released' | 'disputed';
  loading?: boolean;
}

export function EscrowManager({
  amount,
  onReleaseFunds,
  onDispute,
  status,
  loading,
}: EscrowManagerProps) {
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDispute();
    setShowDisputeForm(false);
    setDisputeReason('');
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'pending':
        return 'Waiting for payment to be processed';
      case 'funds_received':
        return 'Funds secured in escrow';
      case 'released':
        return 'Funds released to landlord';
      case 'disputed':
        return 'Payment disputed';
      default:
        return 'Unknown status';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Icons.clock className="w-5 h-5 text-warning" />;
      case 'funds_received':
        return <Icons.shieldCheck className="w-5 h-5 text-success" />;
      case 'released':
        return <Icons.checkCircle className="w-5 h-5 text-success" />;
      case 'disputed':
        return <Icons.alertTriangle className="w-5 h-5 text-destructive" />;
      default:
        return <Icons.helpCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Payment Protection
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center">
            {getStatusIcon()}
            <div className="ml-3">
              <p className="font-medium">Escrow Status</p>
              <p className="text-sm text-muted-foreground">
                {getStatusMessage()}
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold">K{amount.toLocaleString()}</p>
        </div>

        {status === 'funds_received' && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your payment is securely held in escrow until both parties confirm
              the transaction.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={onReleaseFunds}
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                    Releasing...
                  </span>
                ) : (
                  'Release Funds to Landlord'
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowDisputeForm(true)}
                disabled={loading}
                className="flex-1"
              >
                Dispute Payment
              </Button>
            </div>
          </div>
        )}

        {status === 'released' && (
          <div className="p-4 bg-success/10 rounded-lg">
            <p className="text-success flex items-center">
              <Icons.checkCircle className="w-5 h-5 mr-2" />
              Funds have been successfully released to the landlord.
            </p>
          </div>
        )}

        {status === 'disputed' && (
          <div className="p-4 bg-destructive/10 rounded-lg">
            <p className="text-destructive flex items-center">
              <Icons.alertTriangle className="w-5 h-5 mr-2" />
              This payment is currently under dispute review.
            </p>
          </div>
        )}

        {showDisputeForm && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Dispute Payment</h3>
            <form onSubmit={handleDisputeSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="disputeReason"
                  className="block text-sm font-medium mb-1"
                >
                  Reason for dispute
                </label>
                <textarea
                  id="disputeReason"
                  value={disputeReason}
                  onChange={e => setDisputeReason(e.target.value)}
                  className="w-full border rounded-md p-2"
                  rows={3}
                  placeholder="Please explain why you are disputing this payment..."
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDisputeForm(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={loading || !disputeReason.trim()}
                >
                  {loading ? 'Submitting...' : 'Submit Dispute'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
