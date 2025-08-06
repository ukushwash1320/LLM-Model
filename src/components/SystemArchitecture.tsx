import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Database, 
  Brain, 
  Search, 
  Zap, 
  ArrowRight,
  Cpu,
  Cloud,
  Shield
} from 'lucide-react';

const architectureSteps = [
  {
    id: 1,
    title: "Document Ingestion",
    description: "PDF, DOCX, Email processing",
    icon: FileText,
    color: "bg-blue-500",
    tech: ["pdfplumber", "python-docx", "unstructured"]
  },
  {
    id: 2,
    title: "Chunking & Embedding",
    description: "Text splitting with overlap",
    icon: Database,
    color: "bg-green-500",
    tech: ["sentence-transformers", "all-MiniLM-L6-v2"]
  },
  {
    id: 3,
    title: "Vector Storage",
    description: "FAISS indexing with metadata",
    icon: Search,
    color: "bg-purple-500",
    tech: ["FAISS", "Pinecone", "Chroma"]
  },
  {
    id: 4,
    title: "Query Processing",
    description: "NLP entity extraction",
    icon: Brain,
    color: "bg-orange-500",
    tech: ["spaCy", "regex", "custom-rules"]
  },
  {
    id: 5,
    title: "Semantic Retrieval",
    description: "Hybrid search & ranking",
    icon: Zap,
    color: "bg-red-500",
    tech: ["cosine-similarity", "BM25", "MMR"]
  },
  {
    id: 6,
    title: "Decision Engine",
    description: "LLM + Rule-based reasoning",
    icon: Cpu,
    color: "bg-indigo-500",
    tech: ["GPT-4", "Llama-3", "deterministic-rules"]
  }
];

export const SystemArchitecture = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          System Architecture
        </CardTitle>
        <CardDescription>
          Production-ready RAG pipeline for intelligent policy analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Architecture Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {architectureSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${step.color}`}>
                        <step.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          {step.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {step.tech.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow connector */}
                {index < architectureSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="bg-accent/30">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Vector Store</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• FAISS for local development</li>
                  <li>• Pinecone for production scale</li>
                  <li>• 750-token chunks with 100 overlap</li>
                  <li>• Metadata filtering by document</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-accent/30">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">LLM Integration</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• GPT-4 for complex reasoning</li>
                  <li>• Llama-3 for cost optimization</li>
                  <li>• Structured prompt templates</li>
                  <li>• Token usage optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-accent/30">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">API Integration</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• FastAPI backend architecture</li>
                  <li>• RESTful endpoints</li>
                  <li>• Bearer token authentication</li>
                  <li>• JSON structured responses</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
            <CardContent className="pt-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Performance Targets
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{'<2s'}</div>
                  <div className="text-xs text-muted-foreground">Query Latency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">$0.02</div>
                  <div className="text-xs text-muted-foreground">Cost/Query</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100K</div>
                  <div className="text-xs text-muted-foreground">Documents</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};