// src/data/careerGuides.ts
// Comprehensive industry-standard career guides with salary ladders, core skills, day-in-the-life, and interview questions

export interface SalaryLevel {
  level: "Entry Level (0–2 yrs)" | "Mid Level (3–5 yrs)" | "Senior Level (6–8 yrs)" | "Lead / Principal (9+ yrs)";
  range: string;
  equityOrBonus?: string;
  focus: string;
}

export interface CareerGuide {
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  overview: string;
  dayInTheLife: string[];
  coreSkills: Array<{ name: string; importance: "Critical" | "High" | "Valuable"; description: string }>;
  softSkills: string[];
  salaryLadder: SalaryLevel[];
  topCertifications: string[];
  interviewQuestions: Array<{ question: string; hint: string }>;
  learningRoadmapSteps: Array<{ title: string; timeline: string; milestone: string }>;
  benchmarkRoleSlug?: string;
}

export const CAREER_GUIDES_DATA: CareerGuide[] = [
  {
    slug: "data-scientist",
    title: "Data Scientist",
    icon: "📊",
    shortDesc: "Turn messy enterprise data into predictive models, business strategy, and automated machine learning solutions.",
    overview: "A Data Scientist analyzes complex, large-scale data to discover patterns, build machine learning models, and solve strategic business challenges. In India's booming tech and startup ecosystem, Data Scientists collaborate with product managers, data engineers, and executive leaders to inform multi-crore business decisions.",
    dayInTheLife: [
      "9:30 AM: Daily standup with data engineering and product team to align on pipeline deliverables.",
      "10:30 AM: Deep-dive exploratory data analysis (EDA) on customer retention datasets using Pandas and SQL.",
      "1:30 PM: Training and fine-tuning an XGBoost model; tracking validation loss and feature importance.",
      "3:30 PM: Code review of data transformation scripts and testing automated unit tests.",
      "4:30 PM: Presenting A/B test findings and model uplift to product stakeholders in interactive dashboards.",
    ],
    coreSkills: [
      { name: "Python / R Programming", importance: "Critical", description: "Writing modular, vectorized scripts for data manipulation, mathematical operations, and statistical pipelines." },
      { name: "Advanced SQL", importance: "Critical", description: "Writing high-performance queries, recursive CTEs, window functions, and handling billions of records." },
      { name: "Machine Learning (Supervised & Unsupervised)", importance: "Critical", description: "Hands-on expertise in regression, classification, clustering, dimensionality reduction, and ensemble models." },
      { name: "Statistics & Probability", importance: "High", description: "Hypothesis testing, p-values, Bayes' theorem, distribution analysis, and experimental design (A/B testing)." },
      { name: "Data Visualization & Storytelling", importance: "High", description: "Transforming technical findings into executive-ready narratives using Tableau, Power BI, or Seaborn." },
      { name: "MLOps & Cloud Platforms (AWS/GCP/Azure)", importance: "Valuable", description: "Deploying models via REST endpoints, containerizing with Docker, and monitoring feature drift." },
    ],
    softSkills: ["Curiosity & Business Acumen", "Executive Communication", "Critical Thinking", "Cross-Functional Collaboration"],
    salaryLadder: [
      { level: "Entry Level (0–2 yrs)", range: "₹6–12 LPA", focus: "Data wrangling, SQL queries, baseline regression & classification models." },
      { level: "Mid Level (3–5 yrs)", range: "₹14–24 LPA", focus: "End-to-end ML model development, production pipelines, business metric optimization." },
      { level: "Senior Level (6–8 yrs)", range: "₹25–40 LPA", focus: "Architecting complex predictive systems, mentoring juniors, defining data strategy." },
      { level: "Lead / Principal (9+ yrs)", range: "₹45–75+ LPA", equityOrBonus: "+ Performance Stock Units (RSUs)", focus: "Organizational data vision, cross-enterprise AI governance, board-level reporting." },
    ],
    topCertifications: [
      "NASSCOM FutureSkills Prime Certified Data Science Professional",
      "Google Professional Data Engineer",
      "AWS Certified Machine Learning – Specialty",
      "Microsoft Certified: Azure Data Scientist Associate",
    ],
    interviewQuestions: [
      { question: "How do you handle severe class imbalance in a classification problem?", hint: "Discuss SMOTE oversampling, under-sampling, focal loss, and focusing on Precision-Recall AUC rather than standard accuracy." },
      { question: "Explain the difference between L1 (Lasso) and L2 (Ridge) regularization.", hint: "L1 adds absolute value penalty leading to sparse coefficients (feature selection); L2 adds squared penalty shrinking weights smoothly." },
      { question: "How would you design an A/B test to measure recommendation engine uplift?", hint: "Define null hypothesis, compute sample size & statistical power, randomize user buckets, run minimum detectable effect (MDE) checks." },
    ],
    learningRoadmapSteps: [
      { title: "Stage 1: Python, Math & Advanced SQL", timeline: "Month 1–2", milestone: "Query real transactional databases and clean dirty tabular data effortlessly." },
      { title: "Stage 2: Statistical Modeling & Classical ML", timeline: "Month 3–4", milestone: "Build regression, random forest, and gradient boosted models with SHAP interpretability." },
      { title: "Stage 3: Deep Learning, NLP & Portfolio Projects", timeline: "Month 5", milestone: "Publish 3 end-to-end GitHub repositories with clean documentation and live Streamlit demos." },
      { title: "Stage 4: MLOps, System Design & Interview Mastery", timeline: "Month 6", milestone: "Deploy an API endpoint on cloud infrastructure and master live case interviews." },
    ],
    benchmarkRoleSlug: "data-analyst",
  },
  {
    slug: "artificial-intelligence-engineer",
    title: "AI & Machine Learning Engineer",
    icon: "🧠",
    shortDesc: "Design, build, and deploy production-scale neural networks, generative AI models, and intelligent automated agents.",
    overview: "An AI Engineer builds deep learning architectures, operationalizes foundation models, designs RAG systems, and turns experimental research into low-latency production APIs that power modern software applications.",
    dayInTheLife: [
      "9:30 AM: GPU cluster health check and loss monitoring on overnight fine-tuning jobs.",
      "11:00 AM: Optimizing vector search latency and chunking strategies in an enterprise RAG knowledge base.",
      "1:30 PM: Collaborating with backend team on integrating model inference endpoints with FastAPI.",
      "3:30 PM: Auditing model outputs against evaluation datasets for hallucination and toxicity metrics.",
      "5:00 PM: Experimenting with quantization (GGUF, AWQ) to deploy models on edge hardware.",
    ],
    coreSkills: [
      { name: "Deep Learning (PyTorch / TensorFlow)", importance: "Critical", description: "Building and debugging neural networks, custom loss functions, and optimization routines." },
      { name: "Large Language Models & Transformers", importance: "Critical", description: "Attention mechanisms, prompting techniques, tokenization, fine-tuning (LoRA), and RAG." },
      { name: "Vector Databases & Search", importance: "Critical", description: "Similarity search with Pinecone, Milvus, Qdrant, ChromaDB, and hybrid keyword-vector indexing." },
      { name: "Production MLOps", importance: "High", description: "Model serving with Triton, vLLM, Docker containerization, CI/CD, and latency profiling." },
      { name: "Python Systems Programming", importance: "High", description: "Async I/O, multiprocessing, CUDA basics, and high-throughput REST/gRPC microservices." },
    ],
    softSkills: ["Rapid Technical Agility", "Ethical AI Mindset", "System Architecture Thinking", "Problem Decomposition"],
    salaryLadder: [
      { level: "Entry Level (0–2 yrs)", range: "₹8–15 LPA", focus: "Model evaluation, data curation, building LangChain pipelines and API connectors." },
      { level: "Mid Level (3–5 yrs)", range: "₹18–32 LPA", focus: "Custom model fine-tuning, vector database optimization, high-throughput inference serving." },
      { level: "Senior Level (6–8 yrs)", range: "₹35–55 LPA", focus: "Multimodal systems design, agentic architecture, latency & GPU cost optimization." },
      { level: "Lead / Principal (9+ yrs)", range: "₹60–100+ LPA", equityOrBonus: "+ Generous Equity Grants", focus: "Enterprise AI roadmaps, research-to-production translation, high-stake AI safety governance." },
    ],
    topCertifications: [
      "TensorFlow Developer Certificate",
      "AWS Certified Machine Learning – Specialty",
      "NVIDIA Certified Associate: Generative AI and LLMs",
      "DeepLearning.AI Production Machine Learning Specialization",
    ],
    interviewQuestions: [
      { question: "How does the Scaled Dot-Product Attention mechanism work in Transformers?", hint: "Explain Q, K, V matrices, softmax scaling by sqrt(d_k), and why multi-head attention learns diverse contextual relationships." },
      { question: "What are the tradeoffs between RAG and fine-tuning an LLM?", hint: "RAG brings fresh proprietary data without retraining; fine-tuning changes tone, style, and domain vocabulary but doesn't solve real-time freshness." },
      { question: "How do you evaluate hallucination rates in generative question-answering systems?", hint: "Discuss RAGAS framework (faithfulness, answer relevance, context recall) and automated LLM-as-a-judge benchmarking." },
    ],
    learningRoadmapSteps: [
      { title: "Stage 1: Python Mastery & Linear Algebra", timeline: "Month 1", milestone: "Implement backpropagation and gradient descent from scratch." },
      { title: "Stage 2: PyTorch & Deep Neural Networks", timeline: "Month 2–3", milestone: "Build CNNs and Transformer encoder-decoders from scratch." },
      { title: "Stage 3: LLMs, LangChain, & Vector Databases", timeline: "Month 4–5", milestone: "Deliver a production-ready RAG application with hybrid search and streaming responses." },
      { title: "Stage 4: Quantization, MLOps & Deployment", timeline: "Month 6", milestone: "Deploy fine-tuned models using vLLM and Docker on cloud infrastructure." },
    ],
    benchmarkRoleSlug: "ml-engineer",
  },
  {
    slug: "full-stack-developer",
    title: "Full-Stack Software Engineer",
    icon: "💻",
    shortDesc: "Architect seamless user interfaces, develop robust server-side logic, and manage scalable cloud databases.",
    overview: "Full-Stack Engineers bridge user-centric frontend experiences and resilient backend infrastructures. From startups building MVPs to enterprises scaling global web applications, Full-Stack Developers are among the most recruited professionals in the Indian market.",
    dayInTheLife: [
      "9:15 AM: Sprint daily check-in with product designer and engineering manager.",
      "10:00 AM: Implementing an interactive dashboard feature in React/Next.js with strict TypeScript types.",
      "1:00 PM: Writing database migrations and optimizing SQL queries for sub-50ms query latency.",
      "3:00 PM: Authoring unit tests with Vitest and end-to-end user journey tests with Playwright.",
      "4:45 PM: Deploying feature branch to staging environment via automated GitHub Actions CI/CD pipeline.",
    ],
    coreSkills: [
      { name: "Modern React & Next.js", importance: "Critical", description: "Server components, client hooks, state management, streaming SSR, and web performance optimization." },
      { name: "TypeScript", importance: "Critical", description: "Strict type modeling, generics, utility types, and runtime data validation (Zod)." },
      { name: "Node.js & Express / NestJS", importance: "Critical", description: "RESTful API design, authentication middlewares, error handling, and event-driven architecture." },
      { name: "PostgreSQL & Database Design", importance: "High", description: "Normalized schemas, indexing, ACID transactions, and ORM abstractions (Prisma/Drizzle)." },
      { name: "Docker & Cloud Deployments", importance: "High", description: "Containerizing services, environment isolation, and deploying on Vercel, AWS, or GCP." },
    ],
    softSkills: ["Product Sense", "Debugging Persistence", "Clear Documentation", "Ownership & Accountability"],
    salaryLadder: [
      { level: "Entry Level (0–2 yrs)", range: "₹5–10 LPA", focus: "Building responsive UI components, CRUD APIs, bug resolution." },
      { level: "Mid Level (3–5 yrs)", range: "₹12–22 LPA", focus: "Complex full-stack feature architecture, third-party integrations, database performance." },
      { level: "Senior Level (6–8 yrs)", range: "₹24–38 LPA", focus: "System design, microservices, scaling systems to millions of users, code quality mentorship." },
      { level: "Lead / Principal (9+ yrs)", range: "₹40–65+ LPA", focus: "Architecture leadership, technical strategy, cloud infrastructure cost management." },
    ],
    topCertifications: [
      "Meta Front-End & Back-End Developer Professional Certificates",
      "AWS Certified Developer – Associate",
      "MongoDB Certified Developer Associate",
    ],
    interviewQuestions: [
      { question: "Explain the Next.js App Router and how React Server Components (RSC) improve performance.", hint: "RSCs execute solely on the server, sending zero JavaScript bundle to the client, reducing bundle size while streaming UI." },
      { question: "How would you design an idempotent payment processing API endpoint?", hint: "Use idempotency keys stored in Redis/DB with unique request hashes and transactional locks to prevent duplicate debits." },
      { question: "What causes N+1 query problems in ORMs and how do you resolve it?", hint: "Eager loading with joins (`include`), batching with DataLoader, or direct parameterized SQL joins." },
    ],
    learningRoadmapSteps: [
      { title: "Stage 1: HTML/CSS, Modern JavaScript & TypeScript", timeline: "Month 1–2", milestone: "Build 5 responsive, accessible UI applications without external libraries." },
      { title: "Stage 2: React, Next.js & Client Architecture", timeline: "Month 3", milestone: "Master state machines, server components, and responsive design systems." },
      { title: "Stage 3: Node.js, Express, PostgreSQL & Auth", timeline: "Month 4–5", milestone: "Create secure APIs with JWT/OAuth, database transactions, and automated test coverage." },
      { title: "Stage 4: Docker, CI/CD, Deployment & System Design", timeline: "Month 6", milestone: "Ship a full-stack SaaS platform with payment webhooks and automated testing." },
    ],
    benchmarkRoleSlug: "fullstack-developer",
  },
  {
    slug: "cloud-devops-engineer",
    title: "Cloud & DevOps Architect",
    icon: "☁️",
    shortDesc: "Automate scalable cloud environments, streamline delivery pipelines, and ensure 99.99% system reliability.",
    overview: "DevOps Engineers and Cloud Architects build the highways on which modern software travels. They ensure rapid, safe code releases through automated CI/CD pipelines, container orchestration, and Infrastructure as Code.",
    dayInTheLife: [
      "9:30 AM: Reviewing alert telemetry in Grafana and resolving transient queue bottlenecks.",
      "11:00 AM: Writing Terraform modules for a newly provisioned multi-AZ Kubernetes cluster on AWS.",
      "2:00 PM: Hardening CI/CD pipeline security with automated container vulnerability scanning in Trivy.",
      "3:45 PM: Simulating a node outage during a scheduled chaos engineering drill.",
      "5:15 PM: Assisting application developers with pod resource requests, limits, and HPA configurations.",
    ],
    coreSkills: [
      { name: "Kubernetes & Container Orchestration", importance: "Critical", description: "Deployments, Services, Ingress controllers, Helm charts, and GitOps with ArgoCD." },
      { name: "Terraform (Infrastructure as Code)", importance: "Critical", description: "Writing modular, repeatable cloud environments with state locking and policy-as-code." },
      { name: "Cloud Platforms (AWS / Azure / GCP)", importance: "Critical", description: "VPC networking, compute clusters, IAM security boundaries, and storage lifecycle." },
      { name: "CI/CD Pipeline Engineering", importance: "High", description: "Building resilient workflows on GitHub Actions, GitLab CI, or Jenkins with automated testing gates." },
      { name: "Observability (Prometheus, Grafana, OpenTelemetry)", importance: "High", description: "Metrics collection, dashboard design, distributed tracing, and automated alert routing." },
    ],
    softSkills: ["Calm Under Pressure", "Systems Thinking", "Security-First Mentality", "Collaborative Facilitation"],
    salaryLadder: [
      { level: "Entry Level (0–2 yrs)", range: "₹6–12 LPA", focus: "Basic cloud provisioning, Dockerizing applications, simple CI/CD maintenance." },
      { level: "Mid Level (3–5 yrs)", range: "₹14–25 LPA", focus: "Kubernetes administration, Terraform automation, monitoring & alerting setup." },
      { level: "Senior Level (6–8 yrs)", range: "₹26–42 LPA", focus: "Multi-cloud architecture, zero-downtime migration, disaster recovery, cost governance." },
      { level: "Lead / Principal (9+ yrs)", range: "₹45–75+ LPA", focus: "Enterprise infrastructure strategy, site reliability standards, security compliance." },
    ],
    topCertifications: [
      "Certified Kubernetes Administrator (CKA)",
      "AWS Certified Solutions Architect – Associate / Professional",
      "HashiCorp Certified: Terraform Associate",
    ],
    interviewQuestions: [
      { question: "How does Kubernetes handle self-healing when a worker node crashes?", hint: "Control plane detects node failure via node-controller heartbeat timeout, marks pods as Terminating, and schedules replacements on healthy nodes." },
      { question: "How do you securely manage sensitive credentials across CI/CD pipelines and production pods?", hint: "Use secrets managers (AWS Secrets Manager, HashiCorp Vault) coupled with External Secrets Operator rather than static env files." },
      { question: "Explain the difference between Blue/Green and Canary deployment strategies.", hint: "Blue/Green switches all traffic instantaneously to new version; Canary routes a small percentage (e.g. 5%) first to validate metrics before gradual rollout." },
    ],
    learningRoadmapSteps: [
      { title: "Stage 1: Linux Deep Dive & Shell Scripting", timeline: "Month 1", milestone: "Master system administration, networking commands, and Bash automation." },
      { title: "Stage 2: Docker & AWS Fundamentals", timeline: "Month 2–3", milestone: "Containerize multi-tier apps and provision VPCs, EC2, and RDS on AWS." },
      { title: "Stage 3: Infrastructure as Code (Terraform) & CI/CD", timeline: "Month 4", milestone: "Deploy end-to-end cloud infrastructure via automated GitHub Actions." },
      { title: "Stage 4: Kubernetes & Enterprise Observability", timeline: "Month 5–6", milestone: "Build an auto-scaling Kubernetes cluster with Prometheus/Grafana monitoring." },
    ],
    benchmarkRoleSlug: "devops-engineer",
  },
];
