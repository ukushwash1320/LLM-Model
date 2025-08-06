// RAG Service - Policy Analysis Engine
// Based on the blueprint architecture with semantic search and LLM reasoning

interface ParsedQuery {
  raw: string;
  age?: number;
  procedure?: string;
  location?: string;
  policy_duration_months?: number;
  extracted_entities: string[];
}

interface PolicyClause {
  clause_id: string;
  content: string;
  section: string;
  relevance_score: number;
  metadata: {
    document: string;
    page?: number;
    section_type: string;
  };
}

interface RAGResult {
  decision: 'approved' | 'rejected' | 'conditional' | 'pending';
  amount?: number;
  rule?: string;
  confidence: number;
  justification: string[];
  llm_answer: string;
  processing_time: number;
  token_usage: number;
  retrieved_clauses: PolicyClause[];
}

class RAGService {
  private static instance: RAGService;
  private documentEmbeddings: Map<string, any> = new Map();
  private isInitialized = false;

  static getInstance(): RAGService {
    if (!RAGService.instance) {
      RAGService.instance = new RAGService();
    }
    return RAGService.instance;
  }

  // Parse natural language query to extract structured information
  parseQuery(query: string): ParsedQuery {
    const parsed: ParsedQuery = {
      raw: query,
      extracted_entities: []
    };

    // Age extraction
    const ageMatch = query.match(/(\d{1,3})\s*[- ]?year/i);
    if (ageMatch) {
      parsed.age = parseInt(ageMatch[1]);
      parsed.extracted_entities.push(`age: ${parsed.age}`);
    }

    // Procedure/surgery extraction
    const procedureMatch = query.match(/(surgery|procedure|treatment|operation)\s+(on|for|of)?\s*([\w\s]+)/i);
    if (procedureMatch) {
      parsed.procedure = procedureMatch[3].trim();
      parsed.extracted_entities.push(`procedure: ${parsed.procedure}`);
    }

    // Location extraction
    const locationMatch = query.match(/in\s+([A-Z][a-zA-Z\s]+)/);
    if (locationMatch) {
      parsed.location = locationMatch[1].trim();
      parsed.extracted_entities.push(`location: ${parsed.location}`);
    }

    // Policy duration extraction
    const durationMatch = query.match(/(\d+)[\s-]?(month|year)s?\s+(old|ago)/i);
    if (durationMatch) {
      const value = parseInt(durationMatch[1]);
      const unit = durationMatch[2].toLowerCase();
      parsed.policy_duration_months = unit.startsWith('year') ? value * 12 : value;
      parsed.extracted_entities.push(`policy_duration: ${parsed.policy_duration_months} months`);
    }

    return parsed;
  }

  // Simulate document embedding and indexing
  async initializeDocuments(documents: string[]): Promise<void> {
    console.log('Initializing RAG system with documents:', documents);
    
    // Simulate FAISS embedding creation
    for (const doc of documents) {
      const mockClauses = this.generateMockClauses(doc);
      this.documentEmbeddings.set(doc, mockClauses);
    }
    
    this.isInitialized = true;
    console.log('RAG system initialized with', documents.length, 'documents');
  }

  // Generate mock policy clauses for demonstration
  private generateMockClauses(document: string): PolicyClause[] {
    const mockClauses = [
      {
        clause_id: `${document.split('/').pop()}::1`,
        content: "Joint replacement surgery is covered under this policy after a waiting period of 24 months from the date of policy commencement.",
        section: "Coverage Benefits",
        relevance_score: 0.95,
        metadata: {
          document,
          page: 12,
          section_type: "benefits"
        }
      },
      {
        clause_id: `${document.split('/').pop()}::2`,
        content: "Pre-existing diseases are covered after a continuous coverage period of 36 months. This includes diabetes, hypertension, and joint disorders.",
        section: "Pre-existing Conditions",
        relevance_score: 0.88,
        metadata: {
          document,
          page: 15,
          section_type: "exclusions"
        }
      },
      {
        clause_id: `${document.split('/').pop()}::3`,
        content: "Grace period for premium payment is thirty (30) days from the due date. Policy remains active during this period.",
        section: "Premium Payment",
        relevance_score: 0.72,
        metadata: {
          document,
          page: 8,
          section_type: "terms"
        }
      },
      {
        clause_id: `${document.split('/').pop()}::4`,
        content: "Maternity expenses are covered after 24 months of continuous coverage. Maximum benefit of ₹50,000 per delivery, limited to two deliveries per policy term.",
        section: "Maternity Benefits",
        relevance_score: 0.85,
        metadata: {
          document,
          page: 18,
          section_type: "benefits"
        }
      },
      {
        clause_id: `${document.split('/').pop()}::5`,
        content: "No Claim Discount of 5% is applicable on renewal for claim-free years. Maximum cumulative discount is 25% of the base premium.",
        section: "No Claim Discount",
        relevance_score: 0.78,
        metadata: {
          document,
          page: 22,
          section_type: "benefits"
        }
      }
    ];

    return mockClauses;
  }

  // Semantic retrieval using mock embeddings
  private retrieveRelevantClauses(query: string, k: number = 5): PolicyClause[] {
    const allClauses: PolicyClause[] = [];
    
    for (const clauses of this.documentEmbeddings.values()) {
      allClauses.push(...clauses);
    }

    // Mock semantic similarity scoring
    const queryLower = query.toLowerCase();
    const scoredClauses = allClauses.map(clause => {
      let score = 0;
      
      // Simple keyword matching for demo
      const keywords = ['surgery', 'knee', 'joint', 'maternity', 'grace', 'premium', 'waiting', 'period', 'coverage'];
      keywords.forEach(keyword => {
        if (queryLower.includes(keyword) && clause.content.toLowerCase().includes(keyword)) {
          score += 0.2;
        }
      });
      
      // Boost score if section matches query intent
      if (queryLower.includes('surgery') && clause.section.includes('Coverage')) score += 0.3;
      if (queryLower.includes('maternity') && clause.section.includes('Maternity')) score += 0.3;
      if (queryLower.includes('grace') && clause.section.includes('Premium')) score += 0.3;
      
      return { ...clause, relevance_score: Math.min(score, 1.0) };
    });

    return scoredClauses
      .sort((a, b) => b.relevance_score - a.relevance_score)
      .slice(0, k);
  }

  // Rule engine for deterministic checks
  private applyRuleEngine(parsed: ParsedQuery, clauses: PolicyClause[]): {
    decision: string;
    rule?: string;
    amount?: number;
  } {
    // Check waiting period rules
    if (parsed.procedure?.toLowerCase().includes('knee') || 
        parsed.procedure?.toLowerCase().includes('joint')) {
      
      if (parsed.policy_duration_months && parsed.policy_duration_months < 24) {
        return {
          decision: 'rejected',
          rule: 'Joint replacement surgery requires 24 months waiting period',
          amount: 0
        };
      }
      
      return {
        decision: 'approved',
        rule: 'Joint replacement surgery covered after waiting period',
        amount: 150000
      };
    }

    // Check maternity benefits
    if (parsed.raw.toLowerCase().includes('maternity')) {
      if (parsed.policy_duration_months && parsed.policy_duration_months < 24) {
        return {
          decision: 'rejected',
          rule: 'Maternity benefits require 24 months waiting period',
          amount: 0
        };
      }
      
      return {
        decision: 'approved',
        rule: 'Maternity benefits covered after waiting period',
        amount: 50000
      };
    }

    // Default to LLM analysis
    return { decision: 'conditional' };
  }

  // Mock LLM analysis
  private async performLLMAnalysis(query: string, parsed: ParsedQuery, clauses: PolicyClause[]): Promise<string> {
    // Simulate LLM processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const context = clauses.map(c => c.content).join('\n\n');
    
    // Mock LLM response based on query type
    if (query.toLowerCase().includes('grace period')) {
      return "Based on the policy terms, a grace period of thirty (30) days is provided for premium payment after the due date. During this period, the policy remains active and all benefits continue to apply. [Clause: Premium Payment Terms]";
    }
    
    if (query.toLowerCase().includes('no claim discount')) {
      return "The policy offers a No Claim Discount (NCD) of 5% on the base premium for each claim-free year. This discount is applicable on renewal and can accumulate up to a maximum of 25% of the total base premium. [Clause: No Claim Discount Terms]";
    }
    
    return `Based on the analysis of the policy clauses and the query "${query}", the system has evaluated the relevant terms and conditions. The decision considers factors such as waiting periods, coverage limits, and eligibility criteria as specified in the policy documents.`;
  }

  // Main RAG analysis function
  async analyzeQuery(query: string, documents: string[]): Promise<RAGResult> {
    const startTime = Date.now();
    
    if (!this.isInitialized) {
      await this.initializeDocuments(documents);
    }

    console.log('Starting RAG analysis for query:', query);
    
    // Step 1: Parse query
    const parsed = this.parseQuery(query);
    console.log('Parsed query:', parsed);
    
    // Step 2: Retrieve relevant clauses
    const retrievedClauses = this.retrieveRelevantClauses(query);
    console.log('Retrieved clauses:', retrievedClauses.length);
    
    // Step 3: Apply rule engine
    const ruleResult = this.applyRuleEngine(parsed, retrievedClauses);
    console.log('Rule engine result:', ruleResult);
    
    // Step 4: LLM analysis
    const llmAnswer = await this.performLLMAnalysis(query, parsed, retrievedClauses);
    
    const processingTime = Date.now() - startTime;
    
    // Step 5: Build final result
    const result: RAGResult = {
      decision: (ruleResult.decision || 'conditional') as any,
      amount: ruleResult.amount,
      rule: ruleResult.rule,
      confidence: 0.85 + Math.random() * 0.1, // Mock confidence
      justification: retrievedClauses.slice(0, 3).map(c => c.clause_id),
      llm_answer: llmAnswer,
      processing_time: processingTime,
      token_usage: Math.floor(Math.random() * 2000) + 1000, // Mock token usage
      retrieved_clauses: retrievedClauses
    };

    console.log('RAG analysis complete:', result);
    return result;
  }
}

export const ragService = RAGService.getInstance();