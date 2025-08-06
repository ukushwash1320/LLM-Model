// Webhook Service for sending notifications
export interface WebhookPayload {
  event: 'analysis_complete' | 'api_submission_complete' | 'error';
  timestamp: string;
  data: {
    query?: string;
    documents?: string[];
    result?: Record<string, unknown>;
    error?: string;
  };
}

export async function sendWebhook(webhookUrl: string, payload: WebhookPayload): Promise<void> {
  if (!webhookUrl || !webhookUrl.trim()) {
    throw new Error('Webhook URL is required');
  }

  // Validate URL format
  try {
    new URL(webhookUrl);
  } catch {
    throw new Error('Invalid webhook URL format');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Policy-QA-Engine-Webhook/1.0',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
  }
}

export function createWebhookPayload(
  event: WebhookPayload['event'],
  data: WebhookPayload['data']
): WebhookPayload {
  return {
    event,
    timestamp: new Date().toISOString(),
    data,
  };
}
