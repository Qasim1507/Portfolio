/**
 * Portfolio Data for Qasim Fakharuddin Nalawala
 * All facts, experience, projects, skills, and links are centralized here for easy editing.
 */

export interface MetricHighlight {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  symbol?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  metrics: MetricHighlight[];
  layerTag: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  publicationBadge?: string;
  date: string;
  category: 'Computer Vision' | 'NLP' | 'Reinforcement Learning' | 'Web';
  tags: string[];
  description: string;
  metrics: MetricHighlight[];
  githubUrl: string;
  demoUrl?: string;
  tensorShape: string;
  documentUrl?: string;
  driveUrl?: string;
  documentType?: 'paper' | 'presentation' | 'code';
}

export interface SkillNode {
  name: string;
  category: 'Languages' | 'ML / DL' | 'Web' | 'Tools & Cloud';
  x: number; // percentage in 2D embedding space (0-100)
  y: number; // percentage in 2D embedding space (0-100)
  level?: string;
}

export const PERSONAL_DATA = {
  name: 'Qasim Fakharuddin Nalawala',
  shortName: 'Qasim Nalawala',
  initials: 'QN',
  title: 'Machine Learning & Software Engineer',
  oneLiner: 'M.Sc. Computer Engineering @ NUS. I build ML pipelines, computer vision models and full-stack apps.',
  location: 'Singapore',
  statusChip: 'Open to new-grad SWE / ML roles',
  email: 'nalawalaq@gmail.com',
  phone: '+65 8060 9123',
  github: 'https://github.com/Qasim1507',
  linkedin: 'https://www.linkedin.com/in/qasimfnalawala',
  resumeUrl: 'https://drive.google.com/file/d/1PKX3shkclTqB7Xxqw_ynthDKUg5REPc-/view?usp=sharing',
  photoUrl: '/profile.jpg', // placeholder avatar / profile image
};

export const MODEL_CARD_DATA = {
  architecture: 'M.Sc. Computer Engineering, NUS (GPA 4.17/5.0)',
  pretraining: 'B.Tech. Computer Science & Engineering, VIT Chennai (2021–2025)',
  fineTunedOn: 'Medical Computer Vision, Edge Reinforcement Learning, Distributed Systems & Full-Stack',
  intendedUse: 'new-grad Software Engineer / ML Engineer roles, Singapore',
  aboutParagraph:
    "Computer Engineering Master's student at the National University of Singapore with proven research in deep learning, surgical computer vision, and edge reinforcement learning. Author of research spanning AI-powered chest X-ray multi-disease diagnosis, edge-based traffic signal control (Frontiers in AI, in review), and laparoscopic smoke detection, complemented by ML engineering at SERIS and full-stack software development.",
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-seris',
    company: 'Solar Energy Research Institute of Singapore (SERIS)',
    role: 'Machine Learning Research Intern',
    location: 'Singapore',
    period: 'Oct 2025 – May 2026',
    layerTag: 'layer_01 · bipv_opt [batch, 512]',
    bullets: [
      'Engineered automated data pipelines for solar cell characterization workflows, improving experimental throughput and data reliability for the BIPV (Building-Integrated Photovoltaics) research project.',
      'Built real-time performance monitoring dashboards in Python and Pandas for multi-dimensional solar module data, accelerating analysis cycles by ~30%.',
      'Designed data ingestion workflows connecting measurement hardware output to centralized cloud-based analysis pipelines, reducing manual processing.',
    ],
    metrics: [
      { label: 'analysis cycles', value: 30, prefix: '~', suffix: '%', symbol: '↑' },
    ],
  },
  {
    id: 'exp-samcom',
    company: 'Samcom Electronics LLC',
    role: 'Full Stack Software Engineering Intern',
    location: 'Dubai, UAE',
    period: 'Aug 2023 – Oct 2023',
    layerTag: 'layer_02 · web_portal [batch, 256]',
    bullets: [
      'Led the redesign and development of the company website using WordPress and custom JavaScript, driving a 30% uplift in user engagement within the first month.',
      'Architected and shipped two internal web portals (Employee Details Portal & Project Details Portal) using REST APIs, improving workflow efficiency by 40%.',
      'Implemented on-page and technical SEO best practices, resulting in a 20% increase in organic traffic.',
    ],
    metrics: [
      { label: 'user engagement', value: 30, suffix: '%', symbol: '↑' },
      { label: 'workflow efficiency', value: 40, suffix: '%', symbol: '↑' },
      { label: 'organic traffic', value: 20, suffix: '%', symbol: '↑' },
    ],
  },
  {
    id: 'exp-mic',
    company: 'Microsoft Innovators Club, VIT',
    role: 'Technical Lead',
    location: 'Chennai, India',
    period: 'Aug 2022 – Dec 2023',
    layerTag: 'layer_03 · team_lead [batch, 128]',
    bullets: [
      'Built and deployed a React-based resume generator tool adopted by 100+ students.',
      'Coordinated technical and management teams, driving a 30% improvement in project delivery efficiency.',
    ],
    metrics: [
      { label: 'students adopted', value: 100, suffix: '+' },
      { label: 'delivery efficiency', value: 30, suffix: '%', symbol: '↑' },
    ],
  },
];

export const PROJECT_CATEGORIES = [
  'All',
  'Computer Vision',
  'NLP',
  'Reinforcement Learning',
  'Web',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-lung-disease',
    title: 'AI-Powered Lung Disease Diagnosis Using Chest X-Rays',
    subtitle: 'Research Paper · DenseNet-121 + CNN Hybrid Architecture',
    publicationBadge: 'IEEE Access Format',
    date: 'Dec 2024 – Apr 2025',
    category: 'Computer Vision',
    tags: ['DenseNet-121', 'Custom CNN', 'Grad-CAM', 'NIH ChestX-ray14', 'Model Pruning', 'Quantization'],
    tensorShape: 'shape: [batch, 224, 224, 3] · 121-layer DenseNet + CNN',
    description:
      'Automated multi-label diagnostic system classifying 14 pulmonary diseases across 112,120 NIH chest X-rays. Combines DenseNet-121 for global contextual feature extraction with a custom CNN head for subtle local lesions. Incorporates Grad-CAM visual heatmaps and a novel 0–100% severity scoring mechanism correlating with radiologist evaluations (r = 0.82). Model pruning and 8-bit quantization achieved a 63% reduction in GFLOPS (down to 7.4) and 47ms edge inference latency.',
    metrics: [
      { label: 'accuracy', value: 87.9, symbol: '', suffix: '%' },
      { label: 'precision', value: 62.5, symbol: '', suffix: '%' },
      { label: 'GFLOPS cut', value: 63, symbol: '↓', suffix: '%' },
      { label: 'latency', value: 47, symbol: '', suffix: 'ms' },
    ],
    githubUrl: '/docs/lung-disease-diagnosis-paper.html',
    documentUrl: '/docs/lung-disease-diagnosis-paper.html',
    driveUrl: 'https://drive.google.com/file/d/1ShLDPvq5hUOfKW4OTevkutXAbGSxTZlo/view?usp=sharing',
    documentType: 'paper',
  },
  {
    id: 'proj-smoke-detection',
    title: 'Automated Smoke Detection in Laparoscopic & Endoscopic Surgery',
    subtitle: 'Research Project (Guide: Dr. Suganya G) · VIT Chennai',
    publicationBadge: 'Surgical CV Research',
    date: 'Jan 2024 – Jun 2024',
    category: 'Computer Vision',
    tags: ['Python', 'Custom 3-Layer CNN', 'HSV Thresholding', 'SPA Analyzer', 'OpenCV', 'Endoscopy'],
    tensorShape: 'shape: [frames, 128, 128, 3] · 3-Layer Pixel CNN + SPA',
    description:
      'Hybrid smoke detection and segmentation framework for minimally invasive surgery video feeds. Blends a custom 3-layer pixel-based CNN with a Saturation Peak Analyzer (SPA) in HSV space using an adaptive weighted ensemble (prioritizing CNN on smoke and HSV on non-smoke). Features black border removal and Gaussian noise filtering, achieving 86.83% accuracy and 0.986 ROC-AUC, outperforming ALEX RGB and GLN RGB baselines.',
    metrics: [
      { label: 'accuracy', value: 86.8, symbol: '', suffix: '%' },
      { label: 'sensitivity', value: 83.2, symbol: '', suffix: '%' },
      { label: 'ROC-AUC', value: 98.6, symbol: '', suffix: '%' },
    ],
    githubUrl: '/docs/surgical-smoke-detection-presentation.html',
    documentUrl: '/docs/surgical-smoke-detection-presentation.html',
    driveUrl: 'https://drive.google.com/file/d/1llYwLOBkQyEsYSTOk1Yq52TTL8dSH9o-/view?usp=sharing',
    documentType: 'presentation',
  },
  {
    id: 'proj-adaptive-traffic',
    title: 'Adaptive Edge-Based Traffic Management System',
    subtitle: 'Original Research Article · Frontiers in AI (Manuscript ID: 1840005, In Review)',
    publicationBadge: 'Frontiers in AI (In Review, MS #1840005)',
    date: 'Jun 2024 – Present',
    category: 'Reinforcement Learning',
    tags: ['Deep Q-Learning', 'SUMO Simulation', 'Edge Computing', 'Python', 'Rule-Based System', 'Neural Networks'],
    tensorShape: 'shape: [80] → [400] → [4] · Q-learning Policy Net',
    description:
      'Decentralized edge-computing traffic signal controller combining a 3-layer neural Q-learning agent with a rule-based safety layer (enforcing minimum 5s green times and pedestrian crossing safety). Evaluated in SUMO across 50 epochs and 500 simulation steps, cutting maximum waiting time by 14.65% vs. occupancy algorithms and 9.84% vs. pre-calibrated fixed-time systems with 1.8 ms inference latency on Intel Core i7 CPU (zero GPU requirement).',
    metrics: [
      { label: 'max wait cut', value: 14.7, symbol: '↓', suffix: '%' },
      { label: 'edge latency', value: 1.8, symbol: '', suffix: 'ms' },
      { label: 'avg wait (s)', value: 149.9, symbol: '', suffix: 's' },
    ],
    githubUrl: '/docs/adaptive-traffic-management-paper.html',
    documentUrl: '/docs/adaptive-traffic-management-paper.html',
    driveUrl: 'https://drive.google.com/file/d/1kmbSRKMf65HasCIHGdlzK8Gw0eLCMMGI/view?usp=sharing',
    documentType: 'paper',
  },
  {
    id: 'proj-image-encryption',
    title: 'Image Encryption Web App',
    date: 'Feb 2024',
    category: 'Web',
    tags: ['Python', 'Streamlit', 'Logistic Chaos Maps', 'Cryptography'],
    tensorShape: 'shape: [h, w, 3] · chaos_permute',
    description:
      'Streamlit application implementing 1-D and 2-D Logistic Chaos Map encryption for digital image security, with 95% reliability in cryptographic speed, pixel scrambling, and permutation integrity benchmarks.',
    metrics: [
      { label: 'reliability', value: 95, symbol: '', suffix: '%' },
    ],
    githubUrl: 'https://github.com/Qasim1507/ImageEncryption',
    driveUrl: 'https://drive.google.com/file/d/1ncF2vmplh-Ly_TAx30mzhRpon-RwyIfi/view?usp=sharing',
    documentType: 'code',
  },
  {
    id: 'proj-hate-speech',
    title: 'Hate Speech Detection',
    date: 'Mar 2024',
    category: 'NLP',
    tags: ['Python', 'NLP', 'LSTM', 'DNN', 'Naive Bayes'],
    tensorShape: 'shape: [batch, seq_len, 300] · lstm_hidden',
    description:
      'Benchmarked Naive Bayes, LSTM and DNN architectures for multi-class toxic speech classification; optimized the feature extraction and embedding pipeline to reach 80% precision on noisy social datasets.',
    metrics: [
      { label: 'precision', value: 80, symbol: '', suffix: '%' },
    ],
    githubUrl: 'https://github.com/Qasim1507/HateSpeech',
    documentType: 'code',
  },
  {
    id: 'proj-resume-engineering',
    title: 'Resume Engineering & Generator System',
    date: '2023',
    category: 'Web',
    tags: ['React', 'TypeScript', 'Node.js', 'Document Automation'],
    tensorShape: 'shape: [dom_tree] → [pdf_stream]',
    description:
      'Automated document processing and dynamic profile generation system adopted by 500+ students, improving placement application efficiency by 30% through modular templates and ATS optimization.',
    metrics: [
      { label: 'students used', value: 500, symbol: '', suffix: '+' },
      { label: 'efficiency uplift', value: 30, symbol: '↑', suffix: '%' },
    ],
    githubUrl: 'https://github.com/Qasim1507',
    driveUrl: 'https://drive.google.com/file/d/1PKX3shkclTqB7Xxqw_ynthDKUg5REPc-/view?usp=sharing',
    documentType: 'code',
  },
];

export const SKILL_NODES: SkillNode[] = [
  // Languages Cluster (Top-Left quadrant: center around x:25, y:28)
  { name: 'Python', category: 'Languages', x: 20, y: 22 },
  { name: 'C', category: 'Languages', x: 14, y: 35 },
  { name: 'C++', category: 'Languages', x: 26, y: 38 },
  { name: 'Java', category: 'Languages', x: 33, y: 24 },
  { name: 'JavaScript', category: 'Languages', x: 34, y: 36 },
  { name: 'HTML', category: 'Languages', x: 18, y: 46 },
  { name: 'CSS', category: 'Languages', x: 28, y: 48 },

  // ML / DL Cluster (Top-Right quadrant: center around x:74, y:28)
  { name: 'TensorFlow', category: 'ML / DL', x: 68, y: 20 },
  { name: 'PyTorch', category: 'ML / DL', x: 80, y: 22 },
  { name: 'OpenCV', category: 'ML / DL', x: 62, y: 34 },
  { name: 'CNNs', category: 'ML / DL', x: 74, y: 32 },
  { name: 'LSTMs', category: 'ML / DL', x: 86, y: 34 },
  { name: 'Computer Vision', category: 'ML / DL', x: 65, y: 46 },
  { name: 'NLP', category: 'ML / DL', x: 84, y: 46 },
  { name: 'Reinforcement Learning', category: 'ML / DL', x: 75, y: 56 },

  // Web Cluster (Bottom-Left quadrant: center around x:26, y:75)
  { name: 'ReactJS', category: 'Web', x: 22, y: 68 },
  { name: 'Next.js', category: 'Web', x: 34, y: 68 },
  { name: 'Tailwind CSS', category: 'Web', x: 16, y: 80 },
  { name: 'Streamlit', category: 'Web', x: 28, y: 82 },
  { name: 'REST APIs', category: 'Web', x: 38, y: 80 },
  { name: 'WordPress', category: 'Web', x: 24, y: 92 },

  // Tools & Cloud Cluster (Bottom-Right quadrant: center around x:74, y:75)
  { name: 'Git', category: 'Tools & Cloud', x: 65, y: 72 },
  { name: 'Pandas', category: 'Tools & Cloud', x: 76, y: 70 },
  { name: 'SUMO', category: 'Tools & Cloud', x: 86, y: 75 },
  { name: 'AWS', category: 'Tools & Cloud', x: 68, y: 86 },
  { name: 'Google Cloud', category: 'Tools & Cloud', x: 82, y: 86 },
];

export const SKILL_CATEGORIES = [
  { name: 'Languages', color: '#22D3EE', label: 'cluster_01: syntax_representations' },
  { name: 'ML / DL', color: '#8B5CF6', label: 'cluster_02: latent_model_architectures' },
  { name: 'Web', color: '#38BDF8', label: 'cluster_03: client_serving_interfaces' },
  { name: 'Tools & Cloud', color: '#34D399', label: 'cluster_04: runtime_infrastructure' },
] as const;

export const CERTIFICATIONS = [
  {
    title: 'AWS Academy Graduate',
    issuer: 'Amazon Web Services',
    iconName: 'Cloud',
    badge: 'aws_certified_grad.pt',
  },
  {
    title: 'Google Cloud Digital Leader',
    issuer: 'Google Cloud',
    iconName: 'Server',
    badge: 'gcp_digital_leader.pt',
  },
  {
    title: 'HackerRank Python (5★)',
    issuer: 'HackerRank',
    iconName: 'Code',
    badge: 'python_5star_gold.pt',
  },
  {
    title: 'HackerRank Software Engineering',
    issuer: 'HackerRank',
    iconName: 'CheckCircle',
    badge: 'swe_proficient.pt',
  },
];
