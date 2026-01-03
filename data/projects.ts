
export interface Project {
    title: string;
    category: string;
    tech: string[];
    desc: string;
    liveUrl?: string;
    repoUrl?: string;
}

export const projects: Project[] = [
    {
        title: "Smart Retail Forecasting",
        category: "AI/ML Pipeline",
        tech: ["Python", "XGBoost", "FastAPI"],
        desc: "End-to-end ML pipeline forecasting SKU-level product demand using historical sales data.",
        liveUrl: "#",
        repoUrl: "https://github.com/sunny-arya-codes"
    },
    {
        title: "Academic AI Agent",
        category: "GenAI / RAG",
        tech: ["LangChain", "pgvector", "Vue.js"],
        desc: "Intelligent Q&A assistant for academic documents with RAG and vector search.",
        liveUrl: "#",
        repoUrl: "https://github.com/sunny-arya-codes"
    },
    {
        title: "FreshCart V2",
        category: "Full Stack",
        tech: ["Flask", "Redis", "Celery"],
        desc: "Scalable grocery app with async background tasks for smooth user operations.",
        liveUrl: "#",
        repoUrl: "https://github.com/sunny-arya-codes"
    },
    {
        title: "CrimeCast",
        category: "Data Science",
        tech: ["XGBoost", "Pandas", "Scikit-learn"],
        desc: "Spatio-temporal crime category classification leveraging advanced feature engineering.",
        liveUrl: "#",
        repoUrl: "https://github.com/sunny-arya-codes"
    },
    {
        title: "EcoTrack Dashboard",
        category: "Data Visualization",
        tech: ["D3.js", "React", "Node.js"],
        desc: "Real-time environmental monitoring dashboard with interactive charts and geospatial data.",
        liveUrl: "#",
        repoUrl: "https://github.com/sunny-arya-codes"
    },
    {
        title: "NeuraChat SDK",
        category: "Open Source",
        tech: ["TypeScript", "WebSockets"],
        desc: "A lightweight, drop-in SDK for adding AI-powered chat capabilities to any web application.",
        liveUrl: "#",
        repoUrl: "https://github.com/sunny-arya-codes"
    }
];
