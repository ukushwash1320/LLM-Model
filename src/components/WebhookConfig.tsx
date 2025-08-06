import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Webhook, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebhookConfigProps {
  webhookUrl: string;
  onWebhookUrlChange: (url: string) => void;
  webhookEnabled: boolean;
  onWebhookEnabledChange: (enabled: boolean) => void;
}

export const WebhookConfig = ({ 
  webhookUrl, 
  onWebhookUrlChange, 
  webhookEnabled, 
  onWebhookEnabledChange 
}: WebhookConfigProps) => {
  const { toast } = useToast();
  const [testingWebhook, setTestingWebhook] = useState(false);

  const testWebhook = async () => {
    if (!webhookUrl || !webhookUrl.trim()) {
      toast({
        title: "No webhook URL",
        description: "Please enter a webhook URL to test",
        variant: "destructive",
      });
      return;
    }

    setTestingWebhook(true);
    
    try {
      const testPayload = {
        event: 'test',
        timestamp: new Date().toISOString(),
        data: {
          message: 'This is a test webhook from Policy-QA Engine',
          test: true
        }
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Policy-QA-Engine-Webhook/1.0',
        },
        body: JSON.stringify(testPayload),
      });

      if (response.ok) {
        toast({
          title: "Webhook test successful",
          description: `Test payload sent to ${webhookUrl}`,
        });
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      toast({
        title: "Webhook test failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    } finally {
      setTestingWebhook(false);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="h-6 w-6 text-primary" />
          Webhook Configuration
        </CardTitle>
        <CardDescription>
          Configure webhook notifications for analysis events
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="webhook-enabled"
            checked={webhookEnabled}
            onCheckedChange={onWebhookEnabledChange}
          />
          <Label htmlFor="webhook-enabled">Enable webhook notifications</Label>
          {webhookEnabled && (
            <Badge variant="outline" className="ml-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
          {!webhookEnabled && (
            <Badge variant="secondary" className="ml-2">
              <X className="h-3 w-3 mr-1" />
              Inactive
            </Badge>
          )}
        </div>

        {webhookEnabled && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="webhook-url"
                  placeholder="https://your-webhook-url.com/webhook"
                  value={webhookUrl}
                  onChange={(e) => onWebhookUrlChange(e.target.value)}
                  className={webhookUrl && !isValidUrl(webhookUrl) ? 'border-destructive' : ''}
                />
                <Button
                  onClick={testWebhook}
                  disabled={testingWebhook || !webhookUrl || !isValidUrl(webhookUrl)}
                  variant="outline"
                >
                  {testingWebhook ? 'Testing...' : 'Test'}
                </Button>
              </div>
              {webhookUrl && !isValidUrl(webhookUrl) && (
                <p className="text-sm text-destructive mt-1">Please enter a valid URL</p>
              )}
            </div>

            <div className="bg-accent/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Webhook Events:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code>analysis_complete</code> - When document analysis finishes</li>
                <li>• <code>api_submission_complete</code> - When HackRX API submission completes</li>
                <li>• <code>error</code> - When an error occurs during processing</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
