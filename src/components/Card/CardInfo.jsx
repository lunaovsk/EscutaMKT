import { LuChartColumn, LuTarget, LuUsers, LuTrendingUp, LuHeart, LuEye, LuEar, LuLightbulb, LuRocket, 
    LuChartLine, LuInstagram, LuCompass, LuAward, LuChartNoAxesColumn    } from "react-icons/lu";
 
 
export const servicesData = [
    {
        icon: <LuChartColumn/>,
        title: "Estratégia baseada em dados",
        description: "Decisões fundamentadas em análise e métricas reais"
    },
    {
        icon: <LuTarget/>,
        title: "Planejamento personalizado",
        description: "Soluções customizadas para cada negócio"
    },
    {   
        icon: <LuUsers/>,
        title: "Gestão completa de marketing",
        description: "Do planejamento à execução e análise"
    },
    {
        icon: <LuTrendingUp/>,
        title: "Acompanhamento por KPIs",
        description: "Monitoramento contínuo de performance"
    }
]

export const aboutInfo = [
   
    {
        icon: <LuTarget/>,
        title: "Missão",
        description:"Transformar a presença digital de empresas e profissionais em reputação sólida e crescimento sustentável.",
        variant: "circle"
    },

    {
        icon: <LuEye/>,
        title: "Visão",
        description:"Ser referência em gestão estratégica de marketing orientada a dados e performance.",
        variant: "circle"
    },

    {
        icon: <LuHeart/>,
        title: "Valores",
        items: ["Transparência", "Estratégia antes de execução", "Foco em resultado real", "Relacionamento com cliente", "Evolução contínua"],
        variant: "circle"
    }
]


export const stepsData = [
    {
        number: "01",
        icon: <LuEar/>,
        title: "Escuta Estratégica",
        description: "Entendemos negócio, público, mercado e objetivos."
    },
    {
        number: "02",
        icon: <LuLightbulb/>,
        title: "Planejamento Inteligente",
        description: "Criamos estratégia baseada em dados e posicionamento."
    },
    {
        number: "03",
        icon: <LuRocket/>,
        title: "Execução Profissional",
        description: "Aplicamos a estratégia com consistência e qualidade."
    },
    {
        number: "04",
        icon: <LuChartLine/>,
        title: "Análise e Otimização",
        description: "Monitoramos KPIs e ajustamos continuamente."
    }
]

export const serviceData = [
    {
        icon: <LuInstagram/>,
        title: "Gestão Estratégica de Redes Sociais",
        description: "Planejamento + conteúdo + análise de performance.",
        items: ["Calendário editorial","Criação de conteúdo","Gestão de comunidade","Análise de métricas"],
        variant: "services"
    },
    {
        icon: <LuCompass/>,
        title: "Planejamento de Marketing Digital",
        description: "Estratégia completa de presença digital.",
        items: ["Diagnóstico de marca","Estratégia multicanal","Funil de conversão","Alocação de orçamento"],
        variant: "services"
    },
    {
        icon: <LuAward />,
        title: "Posicionamento e Autoridade de Marca",
        description: "Construção de percepção e valor de marca.",
        items: ["Estratégia de branding", "Storytelling", "Conteúdo de autoridade", "Gestão de reputação"],
        variant: "services"
    },
    {
        icon: <LuChartNoAxesColumn/>,
        title: "Análise de Dados e KPIs",
        description: "Relatórios claros sobre performance e ROI.",
        items: ["Dashboards personalizados", "Relatórios mensais", "Análise de ROI", "Insights estratégicos"],
        variant: "services"
    },
    {
        icon: <LuUsers/>,
        title: "Consultoria Estratégica",
        description: "Direcionamento profissional para crescimento digital.",
        items: ["Diagnóstico completo", "Plano de ação", "Mentoria", "Suporte contínuo"],
        variant: "services"
    }
]



