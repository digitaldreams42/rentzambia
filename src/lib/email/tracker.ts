// Email tracking service

interface EmailTrackingData {
  id: string;
  recipient: string;
  subject: string;
  sentAt: Date;
  status: "sent" | "delivered" | "opened" | "bounced";
  openedAt?: Date;
  bouncedAt?: Date;
  bounceReason?: string;
}

export class EmailTracker {
  private static trackingData: EmailTrackingData[] = [];

  static trackEmailSent(
    id: string,
    recipient: string,
    subject: string
  ): void {
    this.trackingData.push({
      id,
      recipient,
      subject,
      sentAt: new Date(),
      status: "sent"
    });
  }

  static trackEmailDelivered(id: string): void {
    const email = this.trackingData.find(e => e.id === id);
    if (email) {
      email.status = "delivered";
    }
  }

  static trackEmailOpened(id: string): void {
    const email = this.trackingData.find(e => e.id === id);
    if (email) {
      email.status = "opened";
      email.openedAt = new Date();
    }
  }

  static trackEmailBounced(id: string, reason: string): void {
    const email = this.trackingData.find(e => e.id === id);
    if (email) {
      email.status = "bounced";
      email.bouncedAt = new Date();
      email.bounceReason = reason;
    }
  }

  static getEmailStatus(id: string): EmailTrackingData | undefined {
    return this.trackingData.find(e => e.id === id);
  }

  static getAllTrackingData(): EmailTrackingData[] {
    return [...this.trackingData];
  }

  static getTrackingStats(): {
    sent: number;
    delivered: number;
    opened: number;
    bounced: number;
  } {
    const stats = {
      sent: 0,
      delivered: 0,
      opened: 0,
      bounced: 0
    };

    this.trackingData.forEach(email => {
      stats.sent++;
      if (email.status === "delivered") stats.delivered++;
      if (email.status === "opened") stats.opened++;
      if (email.status === "bounced") stats.bounced++;
    });

    return stats;
  }
}