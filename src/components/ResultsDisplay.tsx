import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Brain, 
  DollarSign,
  Clock,
  Shield,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PolicyResult {
  decision: 'approved' | 'rejected' | 'conditional' | 'pending';
  amount?: number;
  rule?: string;
  confidence?: number;
  justification: string[];
  llm_answer?: string;
  processing_time?: number;
  token_usage?: number;
}

interface ResultsDisplayProps {
  result: PolicyResult | null;
  query: string;
}

const DecisionIcon = ({ decision }: { decision: string }) => {
  switch (decision) {
    case 'approved':
      return <CheckCircle className="h-5 w-5 text-success" />;
    case 'rejected':
      return <XCircle className="h-5 w-5 text-destructive" />;
    case 'conditional':
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    default:
      return <Clock className="h-5 w-5 text-info" />;
  }
};

const DecisionBadge = ({ decision }: { decision: string }) => {
  const variants = {
    approved: 'success',
    rejected: 'destructive',
    conditional: 'warning',
    pending: 'info'
  } as const;
  
  return (
    <Badge variant={variants[decision as keyof typeof variants] || 'outline'} className="capitalize">
      {decision}
    </Badge>
  );
};

export const ResultsDisplay = ({ result, query }: ResultsDisplayProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('summary');

  if (!result) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <Brain className="h-6 w-6" />
            Analysis Results
          </CardTitle>
          <CardDescription>
            Submit a query to see intelligent policy analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No analysis available yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Result copied successfully",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          Analysis Results
        </CardTitle>
        <CardDescription>
          AI-powered policy decision with detailed justification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="justification">Justification</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="raw">Raw JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-6">
            <div className="space-y-4">
              <Alert>
                <DecisionIcon decision={result.decision} />
                <AlertDescription className="ml-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Decision: </strong>
                      <DecisionBadge decision={result.decision} />
                    </div>
                    {result.confidence && (
                      <Badge variant="outline">
                        {(result.confidence * 100).toFixed(1)}% confidence
                      </Badge>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
              
              {result.amount !== undefined && (
                <Card className="bg-accent/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-success" />
                      <span className="font-medium">Coverage Amount: </span>
                      <span className="text-2xl font-bold text-success">
                        ₹{result.amount.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {result.rule && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-2">Applied Rule</h4>
                        <p className="text-sm text-muted-foreground">{result.rule}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {result.llm_answer && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-2">AI Analysis</h4>
                        <p className="text-sm leading-relaxed">{result.llm_answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="justification" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Referenced Clauses ({result.justification.length})
              </h4>
              {result.justification.map((clause, index) => (
                <Card key={index} className="bg-accent/30">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">
                          Clause #{index + 1}
                        </Badge>
                        <p className="text-sm font-mono bg-muted p-2 rounded">
                          {clause}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(clause)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {result.processing_time && (
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Processing Time</p>
                        <p className="text-2xl font-bold">{result.processing_time}ms</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {result.token_usage && (
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Token Usage</p>
                        <p className="text-2xl font-bold">{result.token_usage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card className="col-span-2">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Query Analysis</h4>
                  <p className="text-sm bg-muted p-3 rounded font-mono">{query}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="raw" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">JSON Response</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy JSON
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96 font-mono">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};