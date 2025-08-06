import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Brain, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QueryInterfaceProps {
  onQuerySubmit: (query: string) => void;
  loading: boolean;
}

const SAMPLE_QUERIES = [
  "Does this policy cover knee surgery, and what are the conditions?",
  "46-year-old male, knee replacement surgery in Pune, policy started 3 months ago",
  "What is the grace period for premium payment?",
  "Are maternity expenses covered and what's the waiting period?",
  "What is the No Claim Discount offered in this policy?"
];

export const QueryInterface = ({ onQuerySubmit, loading }: QueryInterfaceProps) => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onQuerySubmit(query.trim());
      toast({
        title: "Query submitted",
        description: "Processing your request using RAG analysis",
      });
    }
  };

  const useSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          Intelligent Query Interface
        </CardTitle>
        <CardDescription>
          Ask natural language questions about your policy documents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="query">Your Question</Label>
            <Textarea
              id="query"
              placeholder="Enter your policy-related question here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[120px] mt-2 resize-none"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!query.trim() || loading}
            variant="hero"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing Query...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Analyze Documents
              </>
            )}
          </Button>
        </form>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Sample Queries</span>
          </div>
          <div className="grid gap-2">
            {SAMPLE_QUERIES.map((sampleQuery, index) => (
              <Badge
                key={index}
                variant="outline"
                className="p-3 text-left cursor-pointer hover:bg-accent transition-colors justify-start h-auto whitespace-normal"
                onClick={() => useSampleQuery(sampleQuery)}
              >
                {sampleQuery}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="bg-accent/50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-sm">Query Features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Semantic document search with FAISS embeddings</li>
            <li>• Clause-level retrieval and matching</li>
            <li>• LLM-powered reasoning and decision logic</li>
            <li>• Structured JSON responses with justifications</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};