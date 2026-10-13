// src/data/courses.ts
// Comprehensive industry-ready course catalog aligned with India's skilling benchmarks

export interface CourseModule {
  title: string;
  duration: string;
  topics: string[];
}

export interface Course {
  slug: string;
  title: string;
  category: "AI & ML" | "Software Development" | "Cloud & DevOps" | "Data & Analytics" | "Cybersecurity" | "Design & Product";
  icon: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Beginner to Intermediate" | "Beginner to Advanced";
  salaryBand: string; // Indian LPA band
  shortDesc: string;
  fullDesc: string;
  prerequisites: string[];
  skillsTaught: string[];
  certifications: string[];
  projects: string[];
  syllabus: CourseModule[];
  careerOutcomes: string[];
  benchmarkRoleSlug?: string;
}

export const COURSES_DATA: Course[] = [
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence & Generative AI",
    category: "AI & ML",
    icon: "🧠",
    duration: "6 Months · 12 hrs/week",
    level: "Intermediate",
    salaryBand: "₹8–35 LPA",
    shortDesc: "Master foundational machine learning, deep learning, LLMs, prompt engineering, and production agent deployment.",
    fullDesc: "An industry-grade curriculum designed to take you from foundational mathematics and Python to building and deploying multimodal LLM agents, fine-tuning open-source models, and operationalizing ML pipelines on cloud platforms.",
    prerequisites: ["Proficiency in Python", "Basics of Linear Algebra & Probability", "Familiarity with Git and Command Line"],
    skillsTaught: ["Python", "PyTorch", "Hugging Face", "LangChain", "LLMs", "Vector Databases", "Prompt Engineering", "MLOps", "Model Fine-tuning"],
    certifications: ["NASSCOM FutureSkills Prime AI Certified", "TensorFlow Developer Certificate", "AWS Certified Machine Learning Specialist"],
    projects: [
      "Enterprise Multi-Agent Customer Support System with RAG",
      "Multimodal Document Analyzer with Vision LLMs",
      "End-to-End Predictive Financial Forecasting Engine",
      "Fine-tuned Open-Source Llama 3 for Legal Contract Summarization",
    ],
    syllabus: [
      {
        title: "Module 1: Mathematics & Advanced Python for AI",
        duration: "4 Weeks",
        topics: ["Vector calculus, linear algebra, gradients", "NumPy, Pandas, vectorized data manipulation", "Object-oriented Python and async programming", "Data preprocessing pipelines"],
      },
      {
        title: "Module 2: Classical Machine Learning & Statistical Models",
        duration: "5 Weeks",
        topics: ["Supervised learning: Regression, Random Forests, XGBoost", "Unsupervised clustering and dimensionality reduction", "Feature engineering & cross-validation", "Evaluation metrics: Precision, Recall, F1, ROC-AUC"],
      },
      {
        title: "Module 3: Deep Learning & Neural Architectures",
        duration: "6 Weeks",
        topics: ["PyTorch core: Tensors, autograd, custom layers", "Convolutional Neural Networks (CNNs) for Computer Vision", "Recurrent architectures and Transformer foundations", "Self-attention mechanism and encoder-decoder paradigms"],
      },
      {
        title: "Module 4: Generative AI, LLMs & Retrieval Augmented Generation (RAG)",
        duration: "5 Weeks",
        topics: ["Pre-trained models & Hugging Face ecosystem", "Vector embeddings & vector databases (Pinecone, ChromaDB)", "Building production RAG systems with LangChain & LlamaIndex", "Evaluation of LLM outputs & hallucination mitigation"],
      },
      {
        title: "Module 5: Fine-Tuning & Production MLOps",
        duration: "4 Weeks",
        topics: ["LoRA and QLoRA parameter-efficient fine-tuning", "Deploying models with FastAPI and Docker", "Monitoring data drift and latency metrics", "Ethics, bias auditing, and responsible AI governance"],
      },
    ],
    careerOutcomes: ["AI Engineer", "Generative AI Specialist", "Machine Learning Engineer", "NLP Researcher"],
    benchmarkRoleSlug: "ml-engineer",
  },
  {
    slug: "data-science",
    title: "Data Science & Machine Learning",
    category: "Data & Analytics",
    icon: "📊",
    duration: "6 Months · 10 hrs/week",
    level: "Beginner to Intermediate",
    salaryBand: "₹6–28 LPA",
    shortDesc: "Transform raw data into strategic insights and predictive models using Python, SQL, and enterprise BI tools.",
    fullDesc: "Learn practical statistical modeling, data wrangling, advanced SQL, machine learning algorithms, and interactive business intelligence storytelling trusted by Tier-1 product organizations and analytics firms.",
    prerequisites: ["Basic understanding of high school mathematics", "Curiosity about data-driven decision making", "No prior coding required"],
    skillsTaught: ["Python", "SQL", "Pandas", "Scikit-Learn", "Tableau", "Power BI", "Statistics", "A/B Testing", "Big Data (PySpark)"],
    certifications: ["Skill India Certified Data Scientist", "Google Professional Data Engineer", "Microsoft Certified: Azure Data Scientist"],
    projects: [
      "E-Commerce Customer Lifetime Value & Churn Prediction",
      "Healthcare Readmission Risk Classification Engine",
      "Interactive Executive KPI Dashboard in Tableau",
      "Supply Chain Demand Forecasting with Time Series Analysis",
    ],
    syllabus: [
      {
        title: "Module 1: Data Analysis Foundations & Advanced SQL",
        duration: "4 Weeks",
        topics: ["Complex SQL joins, window functions, CTEs", "Data cleansing with Pandas and Polars", "Exploratory Data Analysis (EDA) and visualization", "Statistical significance and hypothesis testing"],
      },
      {
        title: "Module 2: Applied Machine Learning",
        duration: "6 Weeks",
        topics: ["Classification algorithms and decision boundaries", "Regression modeling and residual diagnostics", "Hyperparameter tuning and model explainability (SHAP)", "Ensemble methods and gradient boosting"],
      },
      {
        title: "Module 3: Business Intelligence & Executive Storytelling",
        duration: "4 Weeks",
        topics: ["Tableau and Power BI dashboard architectures", "DAX expressions and calculated data models", "Executive presentation and communication", "Translating analytics into business ROI"],
      },
      {
        title: "Module 4: Big Data & Cloud Analytics",
        duration: "5 Weeks",
        topics: ["Distributed computing with PySpark", "Data warehouse architectures (Snowflake, BigQuery)", "Automating data pipelines with Airflow", "Final capstone portfolio defense"],
      },
    ],
    careerOutcomes: ["Data Scientist", "Analytics Consultant", "Business Intelligence Lead", "Data Analyst"],
    benchmarkRoleSlug: "data-analyst",
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Web Development",
    category: "Software Development",
    icon: "💻",
    duration: "6 Months · 15 hrs/week",
    level: "Beginner to Advanced",
    salaryBand: "₹5–25 LPA",
    shortDesc: "Master modern frontend and scalable backend architectures with React, Next.js, Node.js, and cloud deployments.",
    fullDesc: "A hands-on, project-heavy curriculum covering HTML/CSS/TypeScript, modern React ecosystems, relational & NoSQL databases, microservices, containerization with Docker, and cloud deployments on AWS.",
    prerequisites: ["Basic computer literacy", "Commitment to coding 12–15 hours weekly"],
    skillsTaught: ["TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "REST & GraphQL", "Git"],
    certifications: ["Skill India Certified Software Developer", "AWS Certified Cloud Practitioner", "Meta Front-End Developer Professional"],
    projects: [
      "Collaborative Real-Time Workspace with WebSockets",
      "Fintech Payment Gateway Integration with Double-Entry Ledger",
      "Full-Stack E-Commerce Platform with Microservices",
      "AI-Powered Content Management System with Next.js 15",
    ],
    syllabus: [
      {
        title: "Module 1: Modern Frontend & TypeScript",
        duration: "6 Weeks",
        topics: ["Modern semantic HTML5 and accessible CSS", "TypeScript deep dive and strict type systems", "React component patterns, state machines, hooks", "Next.js App Router and Server Components"],
      },
      {
        title: "Module 2: Backend Architecture & APIs",
        duration: "6 Weeks",
        topics: ["Node.js runtime, event loop, and asynchronous programming", "RESTful API design and OpenAPI specifications", "Authentication (JWT, OAuth 2.0, NextAuth)", "Caching strategies with Redis"],
      },
      {
        title: "Module 3: Databases & Data Modeling",
        duration: "4 Weeks",
        topics: ["Relational schema design with PostgreSQL", "ORMs: Prisma, Drizzle, and raw SQL queries", "Document data modeling with MongoDB", "Transaction isolation and indexing strategies"],
      },
      {
        title: "Module 4: DevOps, Testing & Cloud Deployment",
        duration: "4 Weeks",
        topics: ["Docker containerization and compose", "CI/CD pipelines with GitHub Actions", "Cloud hosting on AWS/Vercel", "Unit, integration, and E2E testing with Playwright"],
      },
    ],
    careerOutcomes: ["Full-Stack Engineer", "Frontend Developer", "Backend Developer", "Software Development Engineer (SDE)"],
    benchmarkRoleSlug: "fullstack-developer",
  },
  {
    slug: "cloud-devops",
    title: "Cloud Architecture & DevOps Engineering",
    category: "Cloud & DevOps",
    icon: "☁️",
    duration: "5 Months · 12 hrs/week",
    level: "Intermediate",
    salaryBand: "₹7–30 LPA",
    shortDesc: "Design resilient cloud infrastructure, automate CI/CD pipelines, and orchestrate Kubernetes clusters at scale.",
    fullDesc: "Become a high-earning DevOps and Cloud Engineer. Master Infrastructure as Code with Terraform, AWS and Azure architectures, container orchestration with Kubernetes, and enterprise observability.",
    prerequisites: ["Familiarity with Linux command line", "Basic networking concepts (TCP/IP, DNS, HTTP)", "Foundational scripting knowledge"],
    skillsTaught: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD", "Linux", "Prometheus & Grafana", "Ansible", "GitOps"],
    certifications: ["AWS Certified Solutions Architect – Associate", "Certified Kubernetes Administrator (CKA)", "HashiCorp Certified: Terraform Associate"],
    projects: [
      "Multi-Region High Availability Infrastructure with Terraform",
      "Production-Grade Kubernetes Cluster with Autoscaling & Ingress",
      "Zero-Downtime Blue/Green CI/CD Pipeline on GitHub Actions",
      "Enterprise Observability Stack with Prometheus and Grafana",
    ],
    syllabus: [
      {
        title: "Module 1: Linux Administration & Cloud Fundamentals",
        duration: "4 Weeks",
        topics: ["Linux kernel, permissions, process management", "Networking: VPC, Subnets, Routing, CIDR", "AWS core services (EC2, S3, RDS, IAM)", "Security groups and least-privilege IAM policies"],
      },
      {
        title: "Module 2: Infrastructure as Code (IaC) with Terraform",
        duration: "4 Weeks",
        topics: ["Terraform HCL syntax, state management", "Modular infrastructure components", "Remote backend with state locking", "Drift detection and automated policy enforcement"],
      },
      {
        title: "Module 3: Containers & Kubernetes Orchestration",
        duration: "6 Weeks",
        topics: ["Docker multi-stage builds and vulnerability scanning", "Kubernetes Pods, Deployments, Services, ConfigMaps", "StatefulSets and Persistent Volumes", "Helm package management and ArgoCD GitOps"],
      },
      {
        title: "Module 4: Observability, Security & Site Reliability",
        duration: "4 Weeks",
        topics: ["Prometheus metrics collection and PromQL", "Grafana dashboarding and alert routing", "Log aggregation with ELK / OpenSearch", "Chaos engineering and disaster recovery drills"],
      },
    ],
    careerOutcomes: ["DevOps Engineer", "Cloud Solutions Architect", "Site Reliability Engineer (SRE)", "Platform Engineer"],
    benchmarkRoleSlug: "devops-engineer",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity & Ethical Hacking",
    category: "Cybersecurity",
    icon: "🛡️",
    duration: "5 Months · 10 hrs/week",
    level: "Beginner to Intermediate",
    salaryBand: "₹6–26 LPA",
    shortDesc: "Defend modern networks, conduct penetration tests, analyze digital vulnerabilities, and master compliance standards.",
    fullDesc: "Gain hands-on skills in network security, web application vulnerability assessment (OWASP Top 10), penetration testing, security operations (SOC), and cloud security governance.",
    prerequisites: ["Basic understanding of computer networks", "Familiarity with operating systems"],
    skillsTaught: ["Network Security", "Penetration Testing", "OWASP Top 10", "Wireshark", "Burp Suite", "SOC Analysis", "SIEM (Splunk)", "Linux"],
    certifications: ["CompTIA Security+", "Certified Ethical Hacker (CEH)", "Cisco Certified CyberOps Associate"],
    projects: [
      "Comprehensive Web Application Penetration Test & Report",
      "Home Lab Security Operations Center (SOC) with Splunk",
      "Network Vulnerability Assessment & Hardening Audit",
      "Incident Response Simulation & Forensics Analysis",
    ],
    syllabus: [
      {
        title: "Module 1: Network Security & Packet Analysis",
        duration: "4 Weeks",
        topics: ["Protocols, packet sniffing with Wireshark", "Firewalls, IDS/IPS, and VPN architectures", "Network scanning with Nmap", "Cryptographic standards and PKI"],
      },
      {
        title: "Module 2: Web Application Security & OWASP Top 10",
        duration: "5 Weeks",
        topics: ["SQL Injection, XSS, CSRF, SSRF mechanics", "Authentication and session hijacking exploits", "Burp Suite proxy and vulnerability auditing", "Secure coding guidelines and patch management"],
      },
      {
        title: "Module 3: SOC Operations & Incident Response",
        duration: "5 Weeks",
        topics: ["SIEM setup and log telemetry analysis", "Threat intelligence feeds and MITRE ATT&CK framework", "Digital forensics and memory capture", "Incident response playbooks"],
      },
      {
        title: "Module 4: Cloud Security & Governance",
        duration: "4 Weeks",
        topics: ["AWS/Azure cloud security posture management", "Identity governance and zero trust architectures", "Regulatory compliance: ISO 27001, Indian DPDP Act 2023", "Red team vs blue team war games"],
      },
    ],
    careerOutcomes: ["Cybersecurity Analyst", "Penetration Tester", "SOC Engineer", "Information Security Officer"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX & Product Design",
    category: "Design & Product",
    icon: "🎨",
    duration: "4 Months · 10 hrs/week",
    level: "Beginner to Intermediate",
    salaryBand: "₹5–20 LPA",
    shortDesc: "Craft intuitive, accessible digital experiences through user research, wireframing, design systems, and Figma prototypes.",
    fullDesc: "Learn how to conduct user research, structure complex user flows, build scalable design systems in Figma, and design accessible, conversion-focused mobile and web interfaces.",
    prerequisites: ["Eye for visual aesthetics", "Empathy for user problems", "No coding needed"],
    skillsTaught: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping", "Usability Testing", "WCAG Accessibility", "Information Architecture"],
    certifications: ["Google UX Design Professional Certificate", "Interaction Design Foundation (IxDF) Certified"],
    projects: [
      "B2B SaaS Financial Workflow Redesign with Design System",
      "Healthcare Mobile App for Elderly Indian Users (Accessible UI)",
      "E-Commerce Checkout Optimization Study & Prototype",
      "Comprehensive Usability Testing Benchmark Report",
    ],
    syllabus: [
      {
        title: "Module 1: User Research & Problem Definition",
        duration: "3 Weeks",
        topics: ["User interviews, persona development, empathy maps", "Competitive benchmarking and heuristic evaluations", "Information architecture and user journey mapping", "Job-to-be-Done (JTBD) framework"],
      },
      {
        title: "Module 2: Wireframing & Low-Fidelity Prototyping",
        duration: "3 Weeks",
        topics: ["Low-fidelity sketching and paper prototypes", "Wireframing user flows in Figma", "Clickable interaction prototypes", "Early validation and user feedback loops"],
      },
      {
        title: "Module 3: Visual Design & Scalable Design Systems",
        duration: "5 Weeks",
        topics: ["Color theory, modern typography hierarchies", "Grid systems, responsive layouts, spacing scales", "Building atomic design systems with Figma auto-layout and variants", "Micro-interactions and animation principles"],
      },
      {
        title: "Module 4: Usability Testing & Developer Handoff",
        duration: "3 Weeks",
        topics: ["Moderated and unmoderated usability testing", "WCAG 2.1 accessibility compliance (AA standard)", "Developer design specs and token handoff", "Creating an impressive case study portfolio"],
      },
    ],
    careerOutcomes: ["Product Designer", "UI/UX Designer", "Design System Specialist", "Interaction Designer"],
  },
];
