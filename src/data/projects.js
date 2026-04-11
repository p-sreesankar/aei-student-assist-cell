// ============================================================================
//  PROJECTS — AEI Department Showcase
// ============================================================================
//
//  Each project should include:
//  - id: unique slug
//  - title: project name
//  - creators: array of student/faculty names
//  - github: repository URL
//  - image: banner image path (public/images/...)
//  - description: short summary
//  - tags: tech/domain badges
//
// ============================================================================

/** @type {Array<{id: string, title: string, creators: string[], github: string, image: string, description: string, tags: string[]}>} */
const PROJECTS = [
  {
    id: 'edge-ai-motor-fault-detector',
    title: 'Edge AI Motor Fault Detector',
    creators: ['Anagha S', 'Rohit K', 'Nived P R'],
    github: 'https://github.com/aei-cet/edge-ai-motor-fault-detector',
    image: '/images/events/candela-26.png',
    description:
      'A compact TinyML pipeline that detects early motor bearing faults directly on an embedded node using vibration signatures and lightweight inference.',
    tags: ['Edge AI', 'TinyML', 'Condition Monitoring'],
  },
  {
    id: 'smart-irrigation-control-network',
    title: 'Smart Irrigation Control Network',
    creators: ['Aparna V', 'Muhammed Ihsan', 'Athira V'],
    github: 'https://github.com/aei-cet/smart-irrigation-control-network',
    image: '/images/events/iftar-26.png',
    description:
      'A sensor-driven irrigation controller with remote dashboards, soil-moisture based scheduling, and predictive watering to reduce wastage in campus test plots.',
    tags: ['IoT', 'Embedded Systems', 'Automation'],
  },
  {
    id: 'vlsi-fft-accelerator',
    title: 'VLSI FFT Accelerator',
    creators: ['Navaneeth A', 'Gokul R S'],
    github: 'https://github.com/aei-cet/vlsi-fft-accelerator',
    image: '/images/events/farewell-26.png',
    description:
      'A hardware-optimized FFT accelerator architecture targeting low-latency DSP workloads with synthesis reports for power, timing, and area trade-offs.',
    tags: ['VLSI', 'Digital Design', 'Signal Processing'],
  },
  {
    id: 'campus-energy-digital-twin',
    title: 'Campus Energy Digital Twin',
    creators: ['Gayathri M', 'Rishi N', 'Sreelakshmi P'],
    github: 'https://github.com/aei-cet/campus-energy-digital-twin',
    image: '/images/events/cracking-analytics-and-consulting-industry.png',
    description:
      'A data fusion platform that models live electrical loads across labs and classrooms, enabling anomaly alerts and actionable energy optimization insights.',
    tags: ['Digital Twin', 'Analytics', 'Power Systems'],
  },
  {
    id: 'biomedical-ecg-anomaly-screener',
    title: 'Biomedical ECG Anomaly Screener',
    creators: ['Divya S', 'Alan Joseph'],
    github: 'https://github.com/aei-cet/biomedical-ecg-anomaly-screener',
    image: '/images/events/candela-26.png',
    description:
      'A signal-preprocessing and classification workflow to assist screening of arrhythmia patterns from ECG traces, with explainable plots for clinical review.',
    tags: ['Biomedical', 'ML', 'Instrumentation'],
  },
  {
    id: 'industrial-safety-vision-node',
    title: 'Industrial Safety Vision Node',
    creators: ['Sahad M', 'Nandana P', 'Arjun D'],
    github: 'https://github.com/aei-cet/industrial-safety-vision-node',
    image: '/images/events/iftar-26.png',
    description:
      'A low-power vision node for PPE compliance and restricted-zone alerts in workshop environments, designed for real-time edge deployment.',
    tags: ['Computer Vision', 'Edge AI', 'Safety'],
  },
];

export { PROJECTS };